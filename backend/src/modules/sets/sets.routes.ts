import { Router, Request, Response } from 'express';
import { query } from '../../db/pool.js';
import { logger } from '../../lib/logger.js';

const router = Router();

// GET /api/sets - Get all sets with pagination, filtering, and search
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    
    const searchTerm = req.query.search as string;
    const themeId = req.query.theme_id as string;
    const yearFrom = req.query.year_from as string;
    const yearTo = req.query.year_to as string;
    const minParts = req.query.min_parts as string;
    const maxParts = req.query.max_parts as string;
    const sortBy = (req.query.sort_by as string) || 'year';
    const sortOrder = (req.query.sort_order as string) || 'DESC';

    // Build dynamic query
    let whereConditions: string[] = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (searchTerm) {
      whereConditions.push(`s.name ILIKE $${paramIndex}`);
      params.push(`%${searchTerm}%`);
      paramIndex++;
    }

    if (themeId) {
      whereConditions.push(`s.theme_id = $${paramIndex}`);
      params.push(parseInt(themeId));
      paramIndex++;
    }

    if (yearFrom) {
      whereConditions.push(`s.year >= $${paramIndex}`);
      params.push(parseInt(yearFrom));
      paramIndex++;
    }

    if (yearTo) {
      whereConditions.push(`s.year <= $${paramIndex}`);
      params.push(parseInt(yearTo));
      paramIndex++;
    }

    if (minParts) {
      whereConditions.push(`s.num_parts >= $${paramIndex}`);
      params.push(parseInt(minParts));
      paramIndex++;
    }

    if (maxParts) {
      whereConditions.push(`s.num_parts <= $${paramIndex}`);
      params.push(parseInt(maxParts));
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    // Validate sort column to prevent SQL injection
    const validSortColumns = ['year', 'name', 'num_parts', 'set_num'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'year';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Count total results
    const countQuery = `
      SELECT COUNT(*) as total
      FROM sets s
      ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const dataQuery = `
      SELECT 
        s.id,
        s.set_num,
        s.name,
        s.year,
        s.theme_id,
        t.name as theme_name,
        s.num_parts,
        s.img_url
      FROM sets s
      LEFT JOIN themes t ON s.theme_id = t.id
      ${whereClause}
      ORDER BY s.${sortColumn} ${order}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    const dataResult = await query(dataQuery, [...params, limit, offset]);

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Error fetching sets:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch sets' });
  }
});

// GET /api/sets/:id - Get specific set with all details including parts
router.get('/:setNum', async (req: Request, res: Response) => {
  try {
    const { setNum } = req.params;

    // Get set details
    const setQuery = `
      SELECT 
        s.id,
        s.set_num,
        s.name,
        s.year,
        s.theme_id,
        t.name as theme_name,
        t.parent_id,
        pt.name as parent_theme_name,
        s.num_parts,
        s.img_url,
        s.created_at
      FROM sets s
      LEFT JOIN themes t ON s.theme_id = t.id
      LEFT JOIN themes pt ON t.parent_id = pt.id
      WHERE s.set_num = $1
    `;
    const setResult = await query(setQuery, [setNum]);

    if (setResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Set not found' });
    }

    const setData = setResult.rows[0];

    // Get parts for this set
    const partsQuery = `
      SELECT 
        p.part_num,
        p.name as part_name,
        c.id as color_id,
        c.name as color_name,
        c.rgb,
        c.is_trans,
        ip.quantity,
        ip.is_spare
      FROM inventories i
      JOIN inventory_parts ip ON i.id = ip.inventory_id
      JOIN parts p ON ip.part_num = p.part_num
      JOIN colors c ON ip.color_id = c.id
      WHERE i.set_num = $1
      ORDER BY ip.quantity DESC, p.name
    `;
    const partsResult = await query(partsQuery, [setNum]);

    res.json({
      success: true,
      data: {
        ...setData,
        parts: partsResult.rows,
        parts_count: partsResult.rows.length,
      },
    });
  } catch (error) {
    logger.error('Error fetching set details:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch set details' });
  }
});

export default router;
