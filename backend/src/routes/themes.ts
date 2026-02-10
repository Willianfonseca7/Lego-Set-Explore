import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';
import { logger } from '../lib/logger.js';

const router = Router();

// GET /api/themes - Get all themes with hierarchy
router.get('/', async (req: Request, res: Response) => {
  try {
    const themesQuery = `
      SELECT 
        t.id,
        t.name,
        t.parent_id,
        pt.name as parent_name,
        COUNT(s.id) as set_count
      FROM themes t
      LEFT JOIN themes pt ON t.parent_id = pt.id
      LEFT JOIN sets s ON t.id = s.theme_id
      GROUP BY t.id, t.name, t.parent_id, pt.name
      ORDER BY set_count DESC, t.name
    `;
    
    const result = await query(themesQuery);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error('Error fetching themes:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch themes' });
  }
});

// GET /api/themes/:id - Get specific theme with sets
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get theme details
    const themeQuery = `
      SELECT 
        t.id,
        t.name,
        t.parent_id,
        pt.name as parent_name
      FROM themes t
      LEFT JOIN themes pt ON t.parent_id = pt.id
      WHERE t.id = $1
    `;
    const themeResult = await query(themeQuery, [parseInt(id)]);

    if (themeResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Theme not found' });
    }

    // Get sets for this theme
    const setsQuery = `
      SELECT 
        s.id,
        s.set_num,
        s.name,
        s.year,
        s.num_parts,
        s.img_url
      FROM sets s
      WHERE s.theme_id = $1
      ORDER BY s.year DESC, s.name
    `;
    const setsResult = await query(setsQuery, [parseInt(id)]);

    res.json({
      success: true,
      data: {
        ...themeResult.rows[0],
        sets: setsResult.rows,
        set_count: setsResult.rows.length,
      },
    });
  } catch (error) {
    logger.error('Error fetching theme details:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch theme details' });
  }
});

export default router;
