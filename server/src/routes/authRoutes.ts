import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'logsapp_royal_secret_jwt_key_2026_super_secure_token';

// Generate 7-digit numerical Royal ID
function generateRoyalId(): string {
  const min = 1000000;
  const max = 9999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Register
router.post('/register', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, display_name, password, email, avatar_url } = req.body;

    if (!username || !display_name || !password) {
      res.status(400).json({ error: 'Username, display name, and password are required' });
      return;
    }

    if (username.length < 3) {
      res.status(400).json({ error: 'Username must be at least 3 characters' });
      return;
    }

    // Generate unique 7-digit Royal ID
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

    const defaultAvatar = avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;
    const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';

    const insertRes = await query(
      `INSERT INTO users (username, royal_id, display_name, email, password_hash, avatar_url, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, username, royal_id, display_name, email, avatar_url, role, bio, storage_limit_bytes, storage_used_bytes, created_at`,
      [username, royal_id, display_name.trim(), email || null, password_hash, defaultAvatar, role]
    );

    const user = insertRes.rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, royal_id: user.royal_id, display_name: user.display_name, role: user.role },
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
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({ error: 'Identifier (username or RoyalID) and password are required' });
      return;
    }

    const rawIdentifier = identifier.trim();
    const cleanIdentifier = rawIdentifier.replace(/^[@#]+/, '').trim();

    const userRes = await query(
      `SELECT id, username, royal_id, display_name, email, password_hash, avatar_url, bio, role, is_blocked,
              storage_limit_bytes, storage_used_bytes, is_online, last_seen, created_at 
       FROM users 
       WHERE LOWER(username) = LOWER($1) 
          OR LOWER(username) = LOWER($2) 
          OR royal_id = $1 
          OR royal_id = $2 
          OR (email IS NOT NULL AND LOWER(email) = LOWER($1))`,
      [rawIdentifier, cleanIdentifier]
    );

    if (userRes.rows.length === 0) {
      res.status(401).json({ error: 'Account not found. Please check your username / RoyalID or Sign Up first.' });
      return;
    }

    const user = userRes.rows[0];

    if (user.is_blocked) {
      res.status(403).json({ error: 'Your account has been suspended by an administrator.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username, RoyalID, or password' });
      return;
    }

    delete user.password_hash;

    // Update last_active_at
    await query('UPDATE users SET last_active_at = NOW() WHERE id = $1', [user.id]);

    const token = jwt.sign(
      { id: user.id, username: user.username, royal_id: user.royal_id, display_name: user.display_name, role: user.role || 'user' },
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
      `SELECT id, username, royal_id, display_name, email, avatar_url, bio, role, is_blocked,
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
       RETURNING id, username, royal_id, display_name, email, avatar_url, bio, role, storage_limit_bytes, storage_used_bytes`,
      [display_name, bio, avatar_url, userId]
    );

    res.json({ user: updateRes.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Search Users
router.get('/search', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const q = ((req.query.q as string) || '').trim();
    const currentUserId = req.user?.id;

    if (!q) {
      res.json({ users: [] });
      return;
    }

    const cleanQ = q.replace(/^[@#]+/, '').trim();

    const usersRes = await query(
      `SELECT id, username, royal_id, display_name, avatar_url, is_online, last_seen 
       FROM users 
       WHERE id != $1
         AND (
           LOWER(username) LIKE LOWER($2) 
           OR LOWER(display_name) LIKE LOWER($2) 
           OR royal_id = $3
           OR LOWER(username) LIKE LOWER($4)
         )
       LIMIT 15`,
      [currentUserId, `%${cleanQ}%`, cleanQ, `%${q}%`]
    );

    res.json({ users: usersRes.rows });
  } catch (error: any) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
