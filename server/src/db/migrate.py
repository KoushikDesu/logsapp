import psycopg2
import sys

DATABASE_URL = "postgresql://postgres.oqtexpxdxueitsghwloj:Kingofstates1119@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

SCHEMA_SQL = """
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    royal_id VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT DEFAULT 'Hey there! I am using LogsApp.',
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    storage_limit_bytes BIGINT DEFAULT 1073741824, -- 1 GB
    storage_used_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for live user search typeahead
CREATE INDEX IF NOT EXISTS idx_users_username_trgm ON users USING gin (username gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_users_royal_id_trgm ON users USING gin (royal_id gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_users_display_name_trgm ON users USING gin (display_name gin_trgm_ops);

-- Chats Table (1-on-1 or Group)
CREATE TABLE IF NOT EXISTS chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_group BOOLEAN DEFAULT FALSE,
    name VARCHAR(100),
    description TEXT,
    avatar_url TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    max_storage_bytes BIGINT DEFAULT 1073741824, -- 1 GB per chat auto-purge limit
    current_storage_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Participants Table
CREATE TABLE IF NOT EXISTS chat_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- 'admin' or 'member'
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(chat_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_participants_user ON chat_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_participants_chat ON chat_participants(chat_id);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT,
    message_type VARCHAR(30) DEFAULT 'text', -- 'text', 'image', 'video', 'audio', 'file'
    file_id UUID,
    file_name VARCHAR(255),
    file_path TEXT,
    file_size_bytes BIGINT DEFAULT 0,
    file_mime_type VARCHAR(100),
    quick_code VARCHAR(30) UNIQUE,
    is_purged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_quick_code ON messages(quick_code);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);

-- Message Reactions Table
CREATE TABLE IF NOT EXISTS message_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    emoji VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(message_id, user_id, emoji)
);

-- Storage Purge Logs Table (Audit trail of automatically purged items)
CREATE TABLE IF NOT EXISTS storage_purge_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    purged_message_count INT DEFAULT 0,
    freed_bytes BIGINT DEFAULT 0,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
"""

def migrate():
    print("Connecting to Supabase PostgreSQL...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = True
        cur = conn.cursor()
        print("Executing schema migration...")
        cur.execute(SCHEMA_SQL)
        print("Schema migration completed successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print("Migration error:", e, file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    migrate()
