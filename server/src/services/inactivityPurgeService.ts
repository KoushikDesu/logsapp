import { query } from '../config/db.js';
import fs from 'fs';

// Purge accounts inactive for more than 30 days (1 month)
export async function runInactivityPurge(): Promise<number> {
  try {
    console.log('[InactivityPurge] Checking for users inactive > 30 days...');

    // Find inactive non-admin users
    const inactiveUsersRes = await query(`
      SELECT id, username, royal_id 
      FROM users 
      WHERE (last_active_at < NOW() - INTERVAL '30 days' OR (last_active_at IS NULL AND created_at < NOW() - INTERVAL '30 days'))
        AND role != 'admin'
    `);

    const inactiveUsers = inactiveUsersRes.rows;
    if (inactiveUsers.length === 0) {
      console.log('[InactivityPurge] No inactive accounts found.');
      return 0;
    }

    console.log(`[InactivityPurge] Found ${inactiveUsers.length} inactive account(s) to purge.`);

    for (const u of inactiveUsers) {
      // Find all files uploaded by this user and unlink from disk
      const filesRes = await query(`
        SELECT file_path FROM messages WHERE sender_id = $1 AND file_path IS NOT NULL
      `, [u.id]);

      for (const f of filesRes.rows) {
        if (f.file_path && fs.existsSync(f.file_path)) {
          try {
            fs.unlinkSync(f.file_path);
          } catch (err) {
            console.warn(`[InactivityPurge] Could not delete file ${f.file_path}:`, err);
          }
        }
      }

      // Delete user (cascades to messages, participants, reports, etc.)
      await query('DELETE FROM users WHERE id = $1', [u.id]);
      console.log(`[InactivityPurge] Purged inactive user: @${u.username} (#${u.royal_id})`);
    }

    return inactiveUsers.length;
  } catch (error) {
    console.error('[InactivityPurge] Error during purge:', error);
    return 0;
  }
}
