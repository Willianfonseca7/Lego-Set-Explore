import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { logger } from '../lib/logger.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All collection routes require authentication
router.use(authMiddleware);

// GET /api/collections - Get user's collection
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT 
        uc.id,
        uc.set_num,
        uc.added_at,
        uc.notes,
        s.name,
        s.year,
        s.num_parts,
        s.img_url,
        t.name as theme_name
      FROM user_collections uc
      JOIN sets s ON uc.set_num = s.set_num
      LEFT JOIN themes t ON s.theme_id = t.id
      WHERE uc.user_id = $1
      ORDER BY uc.added_at DESC`,
      [req.userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    logger.error('Error fetching collection:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch collection' });
  }
});

// POST /api/collections - Add set to collection
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { setNum, notes } = req.body;

    if (!setNum) {
      return res.status(400).json({ 
        success: false, 
        error: 'Set number is required' 
      });
    }

    // Check if set exists
    const setResult = await query(
      'SELECT set_num FROM sets WHERE set_num = $1',
      [setNum]
    );

    if (setResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Set not found' 
      });
    }

    // Add to collection (or update if already exists)
    const result = await query(
      `INSERT INTO user_collections (user_id, set_num, notes)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, set_num) 
       DO UPDATE SET notes = $3, added_at = CURRENT_TIMESTAMP
       RETURNING id, set_num, added_at, notes`,
      [req.userId, setNum, notes || null]
    );

    logger.info(`User ${req.username} added set ${setNum} to collection`);

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Error adding to collection:', error);
    res.status(500).json({ success: false, error: 'Failed to add to collection' });
  }
});

// DELETE /api/collections/:setNum - Remove set from collection
router.delete('/:setNum', async (req: AuthRequest, res: Response) => {
  try {
    const { setNum } = req.params;

    const result = await query(
      'DELETE FROM user_collections WHERE user_id = $1 AND set_num = $2 RETURNING id',
      [req.userId, setNum]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Set not in collection' 
      });
    }

    logger.info(`User ${req.username} removed set ${setNum} from collection`);

    res.json({
      success: true,
      message: 'Set removed from collection'
    });
  } catch (error) {
    logger.error('Error removing from collection:', error);
    res.status(500).json({ success: false, error: 'Failed to remove from collection' });
  }
});

// GET /api/collections/:setNum - Check if set is in collection
router.get('/:setNum', async (req: AuthRequest, res: Response) => {
  try {
    const { setNum } = req.params;

    const result = await query(
      'SELECT id, set_num, added_at, notes FROM user_collections WHERE user_id = $1 AND set_num = $2',
      [req.userId, setNum]
    );

    res.json({
      success: true,
      data: {
        inCollection: result.rows.length > 0,
        item: result.rows[0] || null
      }
    });
  } catch (error) {
    logger.error('Error checking collection:', error);
    res.status(500).json({ success: false, error: 'Failed to check collection' });
  }
});

export default router;
