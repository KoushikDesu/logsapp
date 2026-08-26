import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get all custom nicknames set by current user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const resAliases = await query(`
      SELECT contact_id, alias_name FROM contact_aliases WHERE user_id = $1
    `, [userId]);

    const aliasesMap: Record<string, string> = {};
    resAliases.rows.forEach(r => {
      aliasesMap[r.contact_id] = r.alias_name;
    });

    res.json({ aliases: aliasesMap });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch aliases' });
  }
});

// Set or remove custom nickname for a contact
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { contactId, aliasName } = req.body;

    if (!contactId) {
      res.status(400).json({ error: 'Contact ID is required' });
      return;
    }

    if (!aliasName || !aliasName.trim()) {
      // Remove alias if empty
      await query('DELETE FROM contact_aliases WHERE user_id = $1 AND contact_id = $2', [userId, contactId]);
      res.json({ message: 'Alias removed', contactId, aliasName: null });
      return;
    }

    await query(`
      INSERT INTO contact_aliases (user_id, contact_id, alias_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, contact_id)
      DO UPDATE SET alias_name = $3
    `, [userId, contactId, aliasName.trim()]);

    res.json({ message: 'Alias updated', contactId, aliasName: aliasName.trim() });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update alias' });
  }
});

export default router;
