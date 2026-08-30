import { query } from '../config/db.js';

export async function runMigrations() {
  console.log('Running Supabase Database Schema Migrations...');

  // 1. Add columns to users if not present
  await query(`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE users ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT false;
  `);

  // 2. Add columns to chats if not present
  await query(`
    ALTER TABLE chats ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
    ALTER TABLE chats ADD COLUMN IF NOT EXISTS group_royal_id VARCHAR(20);
  `);

  // 3. Add columns to messages if not present
  await query(`
    ALTER TABLE messages ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
    ALTER TABLE messages ADD COLUMN IF NOT EXISTS forwarded_from_id UUID REFERENCES users(id) ON DELETE SET NULL;
  `);

  // 4. Create reports table
  await query(`
    CREATE TABLE IF NOT EXISTS reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      reported_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      chat_id UUID REFERENCES chats(id) ON DELETE SET NULL,
      reason VARCHAR(100) NOT NULL,
      description TEXT,
      chat_snapshot JSONB,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // 5. Create user_blocks table
  await query(`
    CREATE TABLE IF NOT EXISTS user_blocks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(blocker_id, blocked_id)
    );
  `);

  // 6. Create contact_aliases table
  await query(`
    CREATE TABLE IF NOT EXISTS contact_aliases (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      contact_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      alias_name VARCHAR(100) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, contact_id)
    );
  `);

  // 7. Create calls table (WebRTC signaling)
  await query(`
    CREATE TABLE IF NOT EXISTS calls (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
      caller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'ringing', -- 'ringing', 'accepted', 'rejected', 'ended'
      sdp_offer JSONB,
      sdp_answer JSONB,
      ice_candidates JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      ended_at TIMESTAMPTZ
    );
  `);

  // 8. Create cleared_chats table (Track when a user clears a chat for themselves)
  await query(`
    CREATE TABLE IF NOT EXISTS cleared_chats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
      cleared_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, chat_id)
    );
  `);

  // 9. Create cli_transfers table (On-demand single message/file CLI transfers)
  await query(`
    CREATE TABLE IF NOT EXISTS cli_transfers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      transfer_code VARCHAR(32) UNIQUE NOT NULL,
      message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
      chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
      created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
    );
  `);

  // 10. Create Indexes
  await query(`
    CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
    CREATE INDEX IF NOT EXISTS idx_user_blocks_pair ON user_blocks(blocker_id, blocked_id);
    CREATE INDEX IF NOT EXISTS idx_contact_aliases ON contact_aliases(user_id, contact_id);
    CREATE INDEX IF NOT EXISTS idx_chats_group_royal_id ON chats(group_royal_id);
    CREATE INDEX IF NOT EXISTS idx_calls_chat_status ON calls(chat_id, status);
    CREATE INDEX IF NOT EXISTS idx_cli_transfers_code ON cli_transfers(transfer_code);
  `);

  console.log('Database Migrations completed successfully.');
}
