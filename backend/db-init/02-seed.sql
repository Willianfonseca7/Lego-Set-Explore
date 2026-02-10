-- Seed data for LEGO Set Explorer

-- Insert Themes
INSERT INTO themes (id, name, parent_id) VALUES
(1, 'City', NULL),
(2, 'Technic', NULL),
(3, 'Star Wars', NULL),
(4, 'Creator', NULL),
(5, 'Friends', NULL),
(6, 'Ninjago', NULL),
(7, 'Marvel Super Heroes', NULL),
(8, 'Harry Potter', NULL),
(9, 'Architecture', NULL),
(10, 'Ideas', NULL),
(11, 'Police', 1),
(12, 'Fire', 1),
(13, 'Space', 1),
(14, 'Construction', 1),
(15, 'The Skywalker Saga', 3),
(16, 'The Mandalorian', 3),
(17, 'Avengers', 7),
(18, 'Spider-Man', 7);

-- Insert Colors
INSERT INTO colors (id, name, rgb, is_trans) VALUES
(0, 'Black', '05131D', FALSE),
(1, 'Blue', '0055BF', FALSE),
(2, 'Green', '237841', FALSE),
(3, 'Dark Turquoise', '008F9B', FALSE),
(4, 'Red', 'C91A09', FALSE),
(5, 'Dark Pink', 'C870A0', FALSE),
(6, 'Brown', '583927', FALSE),
(7, 'Light Gray', '9BA19D', FALSE),
(8, 'Dark Gray', '6D6E5C', FALSE),
(9, 'Light Blue', 'B4D2E3', FALSE),
(10, 'Bright Green', '4B9F4A', FALSE),
(14, 'Yellow', 'F2CD37', FALSE),
(15, 'White', 'FFFFFF', FALSE),
(17, 'Light Green', 'C2DAB8', FALSE),
(18, 'Light Yellow', 'FBE696', FALSE),
(19, 'Tan', 'E4CD9E', FALSE),
(20, 'Light Violet', 'C9CAE2', FALSE),
(21, 'Trans-Clear', 'FCFCFC', TRUE),
(22, 'Trans-Red', 'C91A09', TRUE),
(23, 'Trans-Blue', '0055BF', TRUE);

-- Insert sample LEGO Sets
INSERT INTO sets (set_num, name, year, theme_id, num_parts, img_url) VALUES
('60367-1', 'Passenger Airplane', 2023, 1, 913, 'https://images.brickset.com/sets/images/60367-1.jpg'),
('42151-1', 'Bugatti Bolide', 2023, 2, 905, 'https://images.brickset.com/sets/images/42151-1.jpg'),
('75341-1', 'Luke Skywalker''s Landspeeder', 2023, 15, 1890, 'https://images.brickset.com/sets/images/75341-1.jpg'),
('75331-1', 'The Razor Crest', 2022, 16, 6187, 'https://images.brickset.com/sets/images/75331-1.jpg'),
('10497-1', 'Galaxy Explorer', 2023, 10, 1254, 'https://images.brickset.com/sets/images/10497-1.jpg'),
('21058-1', 'Great Pyramid of Giza', 2022, 9, 1476, 'https://images.brickset.com/sets/images/21058-1.jpg'),
('76908-1', 'Lamborghini Countach', 2023, 2, 262, 'https://images.brickset.com/sets/images/76908-1.jpg'),
('76210-1', 'Hulkbuster', 2022, 17, 4049, 'https://images.brickset.com/sets/images/76210-1.jpg'),
('76178-1', 'Daily Bugle', 2021, 18, 3772, 'https://images.brickset.com/sets/images/76178-1.jpg'),
('76389-1', 'Hogwarts Chamber of Secrets', 2021, 8, 1176, 'https://images.brickset.com/sets/images/76389-1.jpg'),
('60321-1', 'Fire Brigade', 2022, 12, 845, 'https://images.brickset.com/sets/images/60321-1.jpg'),
('60316-1', 'Police Station', 2022, 11, 906, 'https://images.brickset.com/sets/images/60316-1.jpg'),
('31058-1', 'Mighty Dinosaurs', 2017, 4, 174, 'https://images.brickset.com/sets/images/31058-1.jpg'),
('31120-1', 'Medieval Castle', 2021, 4, 1426, 'https://images.brickset.com/sets/images/31120-1.jpg'),
('42100-1', 'Liebherr R 9800 Excavator', 2019, 2, 4108, 'https://images.brickset.com/sets/images/42100-1.jpg'),
('42115-1', 'Lamborghini Sián FKP 37', 2020, 2, 3696, 'https://images.brickset.com/sets/images/42115-1.jpg'),
('75192-1', 'Millennium Falcon', 2017, 3, 7541, 'https://images.brickset.com/sets/images/75192-1.jpg'),
('75313-1', 'AT-AT', 2021, 3, 6785, 'https://images.brickset.com/sets/images/75313-1.jpg'),
('10276-1', 'Colosseum', 2020, 9, 9036, 'https://images.brickset.com/sets/images/10276-1.jpg'),
('10294-1', 'Titanic', 2021, 10, 9090, 'https://images.brickset.com/sets/images/10294-1.jpg'),
('71040-1', 'The Disney Castle', 2016, 10, 4080, 'https://images.brickset.com/sets/images/71040-1.jpg'),
('10307-1', 'Eiffel Tower', 2022, 10, 10001, 'https://images.brickset.com/sets/images/10307-1.jpg'),
('42143-1', 'Ferrari Daytona SP3', 2022, 2, 3778, 'https://images.brickset.com/sets/images/42143-1.jpg'),
('76391-1', 'Hogwarts Icons', 2021, 8, 3010, 'https://images.brickset.com/sets/images/76391-1.jpg'),
('60350-1', 'Lunar Research Base', 2022, 13, 786, 'https://images.brickset.com/sets/images/60350-1.jpg'),
('60349-1', 'Lunar Space Station', 2022, 13, 500, 'https://images.brickset.com/sets/images/60349-1.jpg'),
('42131-1', 'App-Controlled Cat D11 Bulldozer', 2021, 2, 3854, 'https://images.brickset.com/sets/images/42131-1.jpg'),
('42139-1', 'All-Terrain Vehicle', 2021, 2, 764, 'https://images.brickset.com/sets/images/42139-1.jpg'),
('71741-1', 'Ninjago City Gardens', 2021, 6, 5685, 'https://images.brickset.com/sets/images/71741-1.jpg'),
('41704-1', 'Main Street Building', 2023, 5, 1682, 'https://images.brickset.com/sets/images/41704-1.jpg');

-- Insert sample Parts
INSERT INTO parts (part_num, name, part_cat_id) VALUES
('3001', 'Brick 2 x 4', 1),
('3003', 'Brick 2 x 2', 1),
('3004', 'Brick 1 x 2', 1),
('3005', 'Brick 1 x 1', 1),
('3010', 'Brick 1 x 4', 1),
('3020', 'Plate 2 x 4', 2),
('3021', 'Plate 2 x 3', 2),
('3022', 'Plate 2 x 2', 2),
('3023', 'Plate 1 x 2', 2),
('3024', 'Plate 1 x 1', 2),
('3040', 'Slope 45 2 x 1', 3),
('3665', 'Slope 45 2 x 1 Inverted', 3),
('3070b', 'Tile 1 x 1', 4),
('3069b', 'Tile 1 x 2', 4),
('2412b', 'Tile 1 x 2 Grille', 4),
('4073', 'Plate 1 x 1 Round', 2),
('4081b', 'Plate 1 x 1 with Clip', 2),
('2555', 'Tile 1 x 1 with Clip', 4),
('15573', 'Plate 1 x 2 with Handle', 2),
('32000', 'Technic Brick 1 x 2 with Hole', 5);

-- Insert sample Inventories and Parts for a few sets
-- For Set 60367-1 (Passenger Airplane)
INSERT INTO inventories (set_num, version) VALUES ('60367-1', 1);
INSERT INTO inventory_parts (inventory_id, part_num, color_id, quantity, is_spare) VALUES
(1, '3001', 15, 45, FALSE),
(1, '3001', 1, 30, FALSE),
(1, '3003', 15, 50, FALSE),
(1, '3004', 0, 25, FALSE),
(1, '3010', 4, 20, FALSE),
(1, '3020', 15, 60, FALSE),
(1, '3022', 7, 35, FALSE),
(1, '3023', 15, 80, FALSE),
(1, '3024', 14, 40, FALSE),
(1, '3040', 1, 30, FALSE),
(1, '3070b', 15, 25, FALSE),
(1, '4073', 21, 15, FALSE);

-- For Set 42151-1 (Bugatti Bolide)
INSERT INTO inventories (set_num, version) VALUES ('42151-1', 1);
INSERT INTO inventory_parts (inventory_id, part_num, color_id, quantity, is_spare) VALUES
(2, '3001', 0, 40, FALSE),
(2, '3003', 14, 35, FALSE),
(2, '3004', 0, 55, FALSE),
(2, '3010', 14, 30, FALSE),
(2, '32000', 0, 120, FALSE),
(2, '3020', 0, 45, FALSE),
(2, '3022', 14, 28, FALSE),
(2, '3040', 0, 35, FALSE),
(2, '3665', 14, 22, FALSE);

-- For Set 75341-1 (Luke Skywalker's Landspeeder)
INSERT INTO inventories (set_num, version) VALUES ('75341-1', 1);
INSERT INTO inventory_parts (inventory_id, part_num, color_id, quantity, is_spare) VALUES
(3, '3001', 19, 65, FALSE),
(3, '3003', 15, 80, FALSE),
(3, '3004', 7, 90, FALSE),
(3, '3005', 19, 45, FALSE),
(3, '3010', 15, 55, FALSE),
(3, '3020', 7, 70, FALSE),
(3, '3022', 19, 85, FALSE),
(3, '3023', 15, 120, FALSE),
(3, '3024', 0, 95, FALSE),
(3, '3040', 19, 40, FALSE),
(3, '3665', 7, 35, FALSE),
(3, '3070b', 15, 60, FALSE),
(3, '3069b', 7, 45, FALSE);
