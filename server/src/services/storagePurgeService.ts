import fs from 'fs';
import path from 'path';
import { query } from '../config/db.js';

export async function checkAndPurgeChatStorage(chatId: string): Promise<{ purged: boolean; freedBytes: number; purgedCount: number }> {
  try {
    // 1. Get chat storage status and limit
    const chatRes = await query(
      'SELECT id, max_storage_bytes, current_storage_bytes FROM chats WHERE id = $1',
      [chatId]
    );

    if (chatRes.rows.length === 0) return { purged: false, freedBytes: 0, purgedCount: 0 };
    const chat = chatRes.rows[0];
    const maxLimit = BigInt(chat.max_storage_bytes || 1073741824); // default 1GB
    let currentBytes = BigInt(chat.current_storage_bytes || 0);

    if (currentBytes <= maxLimit) {
      return { purged: false, freedBytes: 0, purgedCount: 0 };
    }

    console.log(`[Auto-Purge] Chat ${chatId} exceeded limit: ${currentBytes} > ${maxLimit} bytes. Triggering purge...`);

    let freedBytes = BigInt(0);
    let purgedCount = 0;

    // 2. Fetch oldest non-purged messages to delete until under limit (or target 80% capacity)
    const targetBytes = (maxLimit * BigInt(80)) / BigInt(100);

    const oldMessages = await query(
      `SELECT id, file_path, file_size_bytes, message_type, content, created_at 
       FROM messages 
       WHERE chat_id = $1 AND is_purged = FALSE 
       ORDER BY created_at ASC 
       LIMIT 100`,
      [chatId]
    );

    for (const msg of oldMessages.rows) {
      if (currentBytes <= targetBytes) break;

      const msgFileSize = BigInt(msg.file_size_bytes || 0);

      // Remove physical file if exists
      if (msg.file_path) {
        try {
          if (fs.existsSync(msg.file_path)) {
            fs.unlinkSync(msg.file_path);
          }
        } catch (e) {
          console.warn(`[Auto-Purge] Failed to delete file ${msg.file_path}:`, e);
        }
      }

      // Mark message as purged
      await query(
        `UPDATE messages 
         SET is_purged = TRUE, content = '[Attachment/Message auto-purged to stay within storage limit]', file_path = NULL 
         WHERE id = $1`,
        [msg.id]
      );

      currentBytes -= msgFileSize;
      freedBytes += msgFileSize;
      purgedCount++;
    }

    // 3. Update chat current storage bytes
    const finalBytes = currentBytes < BigInt(0) ? BigInt(0) : currentBytes;
    await query(
      'UPDATE chats SET current_storage_bytes = $1, updated_at = NOW() WHERE id = $2',
      [finalBytes.toString(), chatId]
    );

    // 4. Log purge event
    if (purgedCount > 0) {
      await query(
        `INSERT INTO storage_purge_logs (chat_id, purged_message_count, freed_bytes, reason) 
         VALUES ($1, $2, $3, $4)`,
        [chatId, purgedCount, freedBytes.toString(), 'Storage limit auto-enforcement']
      );
      console.log(`[Auto-Purge] Freed ${freedBytes.toString()} bytes (${purgedCount} items) in chat ${chatId}.`);
    }

    return { purged: true, freedBytes: Number(freedBytes), purgedCount };
  } catch (error) {
    console.error('[Auto-Purge Error]:', error);
    return { purged: false, freedBytes: 0, purgedCount: 0 };
  }
}

export async function recalculateChatStorage(chatId: string): Promise<bigint> {
  const sumRes = await query(
    `SELECT COALESCE(SUM(file_size_bytes), 0) as total 
     FROM messages 
     WHERE chat_id = $1 AND is_purged = FALSE`,
    [chatId]
  );
  const total = BigInt(sumRes.rows[0]?.total || 0);
  await query('UPDATE chats SET current_storage_bytes = $1 WHERE id = $2', [total.toString(), chatId]);
  return total;
}
