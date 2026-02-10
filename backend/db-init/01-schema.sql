-- LEGO Set Explorer Database Schema

-- Themes table
CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    parent_id INTEGER REFERENCES themes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sets table
CREATE TABLE sets (
    id SERIAL PRIMARY KEY,
    set_num VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(500) NOT NULL,
    year INTEGER NOT NULL,
    theme_id INTEGER REFERENCES themes(id),
    num_parts INTEGER NOT NULL DEFAULT 0,
    img_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parts table
CREATE TABLE parts (
    id SERIAL PRIMARY KEY,
    part_num VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(500) NOT NULL,
    part_cat_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Colors table
CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    rgb VARCHAR(6),
    is_trans BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table (links sets to their parts)
CREATE TABLE inventories (
    id SERIAL PRIMARY KEY,
    set_num VARCHAR(50) NOT NULL REFERENCES sets(set_num),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(set_num, version)
);

-- Inventory parts (junction table with quantities)
CREATE TABLE inventory_parts (
    inventory_id INTEGER REFERENCES inventories(id) ON DELETE CASCADE,
    part_num VARCHAR(50) REFERENCES parts(part_num),
    color_id INTEGER REFERENCES colors(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    is_spare BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (inventory_id, part_num, color_id)
);

-- Create indexes for performance
CREATE INDEX idx_sets_year ON sets(year);
CREATE INDEX idx_sets_theme_id ON sets(theme_id);
CREATE INDEX idx_sets_name ON sets USING gin(to_tsvector('english', name));
CREATE INDEX idx_themes_name ON themes(name);
CREATE INDEX idx_inventory_parts_part_num ON inventory_parts(part_num);
CREATE INDEX idx_inventory_parts_color_id ON inventory_parts(color_id);
CREATE INDEX idx_inventories_set_num ON inventories(set_num);
