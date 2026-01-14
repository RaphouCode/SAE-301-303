    -- Table BOX
    CREATE TABLE box (
        id_box INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        pieces INT NOT NULL CHECK (pieces > 0),
        prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
        image VARCHAR(255) NOT NULL,
        saveur VARCHAR(255) NOT NULL -- Gardé car utilisé par certaines requêtes simplifiées
    );

    -- Table FOODS (Anciennement aliment)
    CREATE TABLE foods (
        id INT AUTO_INCREMENT PRIMARY KEY, -- id au lieu de id_aliment pour matcher index.php
        name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL CHECK (quantity >= 0) -- Optionnel selon usage
    );

    -- Table FLAVORS (Anciennement Saveur)
    CREATE TABLE flavors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    -- Table CLIENT (Inchangé car utilisé par users/login.php)
    CREATE TABLE client (
        id_client INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        mot_de_passe VARCHAR(255) NOT NULL,
        api_token VARCHAR(100) NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'regular' -- 'regular' ou 'student' pour remise -10%
    );

    -- Table COMMANDE (Inchangé)
    CREATE TABLE commande (
        id_commande INT AUTO_INCREMENT PRIMARY KEY,
        date_commande TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        prix_total DECIMAL(10,2) NOT NULL DEFAULT 0,
        adresse VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'paid',
        canal_commande VARCHAR(255) NOT NULL,
        id_client INT NOT NULL,
        CONSTRAINT fk_commande_client
            FOREIGN KEY (id_client) REFERENCES client (id_client)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
    );

    -- Table BOX_FOODS (Anciennement box_aliment)
    -- Liaison Box <-> Foods
    CREATE TABLE box_foods (
        box_id INT NOT NULL,
        food_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1, -- Ajouté pour matcher index.php (CAST(bf.quantity...))
        PRIMARY KEY (box_id, food_id),
        CONSTRAINT fk_box_foods_box
            FOREIGN KEY (box_id) REFERENCES box (id_box)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT fk_box_foods_food
            FOREIGN KEY (food_id) REFERENCES foods (id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
    );

    -- Table BOX_FLAVORS (Nouveau, pour matcher index.php)
    -- Liaison Box <-> Flavors
    CREATE TABLE box_flavors (
        box_id INT NOT NULL,
        flavor_id INT NOT NULL,
        PRIMARY KEY (box_id, flavor_id),
        CONSTRAINT fk_box_flavors_box
            FOREIGN KEY (box_id) REFERENCES box (id_box)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT fk_box_flavors_flavor
            FOREIGN KEY (flavor_id) REFERENCES flavors (id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
    );

    -- Table COMMANDE_BOX (Inchangé)
    CREATE TABLE commande_box (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_commande INT NOT NULL,
        id_box INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (id_commande) REFERENCES commande(id_commande),
        FOREIGN KEY (id_box) REFERENCES box(id_box)
    );