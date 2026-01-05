SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE box_foods MODIFY quantity DECIMAL(10,1) NOT NULL DEFAULT 1;

INSERT INTO client (id_client, nom, prenom, adresse, email, mot_de_passe, api_token) VALUES
(1, 'Dupont', 'Jean', '10 Rue de la Paix, Paris', 'jean.dupont@email.com', '$2y$10$dummyHashPassword123', 'token_12345'),
(2, 'Martin', 'Sophie', '25 Avenue des Champs, Lyon', 'sophie.martin@email.com', '$2y$10$dummyHashPassword123', NULL),
(3, 'Bernard', 'Lucas', '5 Boulevard Gambetta, Nice', 'lucas.bernard@email.com', '$2y$10$dummyHashPassword123', 'token_67890'),
(4, 'Petit', 'Marie', '8 Rue du Port, Marseille', 'marie.petit@email.com', '$2y$10$dummyHashPassword123', NULL),
(5, 'Leroy', 'Thomas', '12 Place de la République, Lille', 'thomas.leroy@email.com', '$2y$10$dummyHashPassword123', NULL);

INSERT INTO flavors (name) VALUES 
('Saumon'), ('Avocat'), ('Cheese'), ('Coriandre'), ('Thon'), 
('Viande'), ('Spicy'), ('Crevette'), ('Seriole Lalandi');

INSERT INTO foods (name, quantity) VALUES 
('California Saumon Avocat', 100), ('Sushi Saumon', 100), ('Spring Avocat Cheese', 100),
('California Pacific', 100), ('Edamame / Salade de chou', 200), ('Maki Salmon Roll', 100),
('Spring Saumon Avocat', 100), ('Maki Cheese Avocat', 100), ('Sushi Thon', 100),
('California Thon Avocat', 100), ('California Thon Cuit Avocat', 100), ('Sando Chicken Katsu', 50),
('Maki Salmon', 100), ('Sando Salmon Aburi', 50), ('California Crevette', 100),
('California Chicken Katsu', 100), ('Spring tataki Saumon', 100), ('Signature Dragon Roll', 100),
('California French Touch', 100), ('California French salmon', 100), ('California Yellowtail Ponzu', 100),
('Signature Rock\'n Roll', 100), ('Sushi Saumon Tsukudani', 100), ('Sushi Salmon', 100);

INSERT INTO box (id_box, nom, pieces, prix, image, saveur) VALUES
(1, 'Tasty Blend', 12, 12.50, 'tasty-blend', 'Saumon'),
(2, 'Amateur Mix', 18, 15.90, 'amateur-mix', 'Coriandre'),
(3, 'Saumon Original', 11, 12.50, 'saumon-original', 'Saumon'),
(4, 'Salmon Lovers', 18, 15.90, 'salmon-lovers', 'Coriandre'),
(5, 'Salmon Classic', 10, 15.90, 'salmon-classic', 'Saumon'),
(6, 'Master Mix', 12, 15.90, 'master-mix', 'Saumon'),
(7, 'Sunrise', 18, 15.90, 'sunrise', 'Saumon'),
(8, 'Sando Box Chicken Katsu', 13, 15.90, 'sando-box-chicken-katsu', 'Saumon'),
(9, 'Sando Box Salmon Aburi', 13, 15.90, 'sando-box-salmon-aburi', 'Saumon'),
(10, 'Super Salmon', 24, 19.90, 'super-salmon', 'Coriandre'),
(11, 'California Dream', 24, 19.90, 'california-dream', 'Spicy'),
(12, 'Gourmet Mix', 22, 24.50, 'gourmet-mix', 'Coriandre'),
(13, 'Fresh Mix', 22, 24.50, 'fresh-mix', 'Spicy');

INSERT INTO box_flavors (box_id, flavor_id) SELECT 1, id FROM flavors WHERE name IN ('Saumon', 'Avocat', 'Cheese');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 2, id FROM flavors WHERE name IN ('Coriandre', 'Saumon', 'Avocat', 'Cheese');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 3, id FROM flavors WHERE name IN ('Saumon', 'Avocat');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 4, id FROM flavors WHERE name IN ('Coriandre', 'Saumon', 'Avocat');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 5, id FROM flavors WHERE name IN ('Saumon');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 6, id FROM flavors WHERE name IN ('Saumon', 'Thon', 'Avocat');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 7, id FROM flavors WHERE name IN ('Saumon', 'Thon', 'Avocat', 'Cheese');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 8, id FROM flavors WHERE name IN ('Saumon', 'Viande', 'Avocat', 'Cheese');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 9, id FROM flavors WHERE name IN ('Saumon', 'Thon', 'Avocat');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 10, id FROM flavors WHERE name IN ('Coriandre', 'Saumon', 'Avocat', 'Cheese');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 11, id FROM flavors WHERE name IN ('Spicy', 'Saumon', 'Thon', 'Crevette', 'Viande', 'Avocat');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 12, id FROM flavors WHERE name IN ('Coriandre', 'Spicy', 'Saumon', 'Viande', 'Avocat', 'Seriole Lalandi');
INSERT INTO box_flavors (box_id, flavor_id) SELECT 13, id FROM flavors WHERE name IN ('Spicy', 'Saumon', 'Thon', 'Avocat', 'Cheese');

INSERT INTO box_foods (box_id, food_id, quantity) SELECT 1, id, 3 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 1, id, 3 FROM foods WHERE name = 'Sushi Saumon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 1, id, 3 FROM foods WHERE name = 'Spring Avocat Cheese';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 1, id, 3 FROM foods WHERE name = 'California Pacific';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 1, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 2, id, 3 FROM foods WHERE name = 'Maki Salmon Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 2, id, 3 FROM foods WHERE name = 'Spring Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 2, id, 6 FROM foods WHERE name = 'Maki Cheese Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 2, id, 3 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 2, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 3, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 3, id, 5 FROM foods WHERE name = 'Sushi Saumon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 3, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 4, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 4, id, 6 FROM foods WHERE name = 'Spring Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 4, id, 6 FROM foods WHERE name = 'Sushi Saumon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 4, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 5, id, 10 FROM foods WHERE name = 'Sushi Saumon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 5, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 6, id, 4 FROM foods WHERE name = 'Sushi Saumon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 6, id, 2 FROM foods WHERE name = 'Sushi Thon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 6, id, 3 FROM foods WHERE name = 'California Thon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 6, id, 3 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 6, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 7, id, 6 FROM foods WHERE name = 'Maki Salmon Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 7, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 7, id, 6 FROM foods WHERE name = 'California Thon Cuit Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 7, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 8, id, 0.5 FROM foods WHERE name = 'Sando Chicken Katsu';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 8, id, 6 FROM foods WHERE name = 'Maki Salmon Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 8, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 8, id, 6 FROM foods WHERE name = 'California Thon Cuit Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 8, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 9, id, 0.5 FROM foods WHERE name = 'Sando Salmon Aburi';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 9, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 9, id, 6 FROM foods WHERE name = 'California Thon Cuit Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 9, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 10, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 10, id, 6 FROM foods WHERE name = 'Maki Salmon Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 10, id, 6 FROM foods WHERE name = 'Maki Salmon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 10, id, 6 FROM foods WHERE name = 'Spring Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 10, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 11, id, 6 FROM foods WHERE name = 'California Saumon Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 11, id, 6 FROM foods WHERE name = 'California Crevette';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 11, id, 6 FROM foods WHERE name = 'California Thon Cuit Avocat';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 11, id, 6 FROM foods WHERE name = 'California Chicken Katsu';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 11, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 12, id, 6 FROM foods WHERE name = 'Spring tataki Saumon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 12, id, 4 FROM foods WHERE name = 'Signature Dragon Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 12, id, 3 FROM foods WHERE name = 'California French Touch';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 12, id, 6 FROM foods WHERE name = 'California French salmon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 12, id, 3 FROM foods WHERE name = 'California Yellowtail Ponzu';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 12, id, 1 FROM foods WHERE name LIKE 'Edamame%';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 13, id, 4 FROM foods WHERE name = 'Signature Rock\'n Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 13, id, 6 FROM foods WHERE name = 'Maki Salmon Roll';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 13, id, 6 FROM foods WHERE name = 'California Pacific';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 13, id, 4 FROM foods WHERE name = 'Sushi Salmon';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 13, id, 2 FROM foods WHERE name = 'Sushi Saumon Tsukudani';
INSERT INTO box_foods (box_id, food_id, quantity) SELECT 13, id, 1 FROM foods WHERE name LIKE 'Edamame%';

INSERT INTO commande (id_commande, date_commande, prix_total, adresse, status, canal_commande, id_client) VALUES
(1, NOW() - INTERVAL 5 DAY, 25.00, '10 Rue de la Paix, Paris', 'paid', 'web', 1),
(2, NOW() - INTERVAL 2 DAY, 45.00, '25 Avenue des Champs, Lyon', 'paid', 'app', 2),
(3, NOW() - INTERVAL 1 DAY, 12.50, '10 Rue de la Paix, Paris', 'shipping', 'web', 1),
(4, NOW(), 19.90, '5 Boulevard Gambetta, Nice', 'preparation', 'phone', 3),
(5, NOW(), 55.90, '8 Rue du Port, Marseille', 'cancelled', 'web', 4);

INSERT INTO commande_box (id_commande, id_box, quantity, unit_price) VALUES
(1, 1, 2, 12.50),
(2, 12, 1, 24.50),
(2, 10, 1, 19.90),
(3, 1, 1, 12.50),
(4, 11, 1, 19.90),
(5, 13, 1, 24.50),
(5, 8, 1, 15.90);

SET FOREIGN_KEY_CHECKS = 1;