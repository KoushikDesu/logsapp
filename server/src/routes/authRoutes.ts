import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'logsapp_royal_secret_jwt_key_2026_super_secure_token';

// Helper to generate unique 7-digit numeric RoyalID
function generateRoyalId(): string {
  // Pure 7-digit numerical ID (e.g. 7482910)
  const num = Math.floor(1000000 + Math.random() * 9000000);
  return String(num);
}

// Register
router.post('/register', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let { username, password, display_name, email, avatar_url } = req.body;

    if (!username || !password || !display_name) {
      res.status(400).json({ error: 'Display Name, Username, and Password are required' });
      return;
    }

    username = username.trim().toLowerCase().replace(/^@+/, '');
    
    // Auto-generate 7-digit numerical RoyalID
    let royal_id = generateRoyalId();
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      const checkId = await query('SELECT id FROM users WHERE royal_id = $1', [royal_id]);
      if (checkId.rows.length === 0) {
        isUnique = true;
      } else {
        royal_id = generateRoyalId();
        attempts++;
      }
    }

    // Check if username already exists
    const existing = await query(
      'SELECT id, username FROM users WHERE username = $1',
      [username]
    );

    if (existing.rows.length > 0) {
      res.status(409).json({ error: 'Username already taken. Please pick another.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const defaultAvatar = avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`;

    const insertRes = await query(
      `INSERT INTO users (username, royal_id, display_name, email, password_hash, avatar_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, royal_id, display_name, email, avatar_url, bio, storage_limit_bytes, storage_used_bytes, created_at`,
      [username, royal_id, display_name.trim(), email || null, password_hash, defaultAvatar]
    );

    const user = insertRes.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, royal_id: user.royal_id, display_name: user.display_name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login
router.post('/login', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body; // identifier can be username OR royal_id OR email

    if (!identifier || !password) {
      res.status(400).json({ error: 'Identifier (username or RoyalID) and password are required' });
      return;
    }

    const cleanedIdentifier = identifier.trim();

    const userRes = await query(
      `SELECT id, username, royal_id, display_name, email, password_hash, avatar_url, bio, 
              storage_limit_bytes, storage_used_bytes, is_online, last_seen, created_at 
       FROM users 
       WHERE LOWER(username) = LOWER($1) OR UPPER(royal_id) = UPPER($1) OR LOWER(email) = LOWER($1)`,
      [cleanedIdentifier]
    );

    if (userRes.rows.length === 0) {
      res.status(401).json({ error: 'Invalid username, RoyalID, or password' });
      return;
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username, RoyalID, or password' });
      return;
    }

    delete user.password_hash;

    const token = jwt.sign(
      { id: user.id, username: user.username, royal_id: user.royal_id, display_name: user.display_name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// Current User Profile
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const userRes = await query(
      `SELECT id, username, royal_id, display_name, email, avatar_url, bio, 
              storage_limit_bytes, storage_used_bytes, is_online, last_seen, created_at 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (userRes.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user: userRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update Profile
router.put('/me', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { display_name, bio, avatar_url } = req.body;

    const updateRes = await query(
      `UPDATE users 
       SET display_name = COALESCE($1, display_name),
           bio = COALESCE($2, bio),
           avatar_url = COALESCE($3, avatar_url),
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, username, royal_id, display_name, email, avatar_url, bio, storage_limit_bytes, storage_used_bytes`,
      [display_name, bio, avatar_url, userId]
    );

    res.json({ user: updateRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Live Typeahead Search Users (Search by username, royal_id, or display_name as you type)
router.get('/search', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const q = (req.query.q as string || '').trim();
    const currentUserId = req.user?.id;

    if (!q || q.length === 0) {
      res.json({ users: [] });
      return;
    }

    const searchPattern = `%${q}%`;
    const searchRes = await query(
      `SELECT id, username, royal_id, display_name, avatar_url, bio, is_online, last_seen
       FROM users 
       WHERE id != $1 AND (
         LOWER(username) LIKE LOWER($2) OR 
         UPPER(royal_id) LIKE UPPER($2) OR 
         LOWER(display_name) LIKE LOWER($2)
       )
       ORDER BY 
         CASE 
           WHEN LOWER(username) = LOWER($3) THEN 1
           WHEN UPPER(royal_id) = UPPER($3) THEN 2
           WHEN LOWER(username) LIKE LOWER($4) THEN 3
           WHEN UPPER(royal_id) LIKE UPPER($4) THEN 4
           ELSE 5 
         END,
         username ASC
       LIMIT 20`,
      [currentUserId, searchPattern, q, `${q}%`]
    );

    res.json({ users: searchRes.rows });
  } catch (error: any) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'User search failed' });
  }
});

export default router;
