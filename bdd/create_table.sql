    CREATE TABLE box (
        id_box INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        pieces INT NOT NULL CHECK (pieces > 0),
        prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
        image VARCHAR(255) NOT NULL,
        saveur VARCHAR(255) NOT NULL
    );

    CREATE TABLE aliment (
        id_aliment INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        quantite INT NOT NULL CHECK (quantite >= 0)
    );

    CREATE TABLE client (
        id_client INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        mot_de_passe VARCHAR(255) NOT NULL, -- stocke toujours un hash, jamais le mot de passe en clair
        api_token VARCHAR(100) NULL,
        status VARCHAR(100) NULL
    );

    CREATE TABLE Saveur(
        id_saveur INT AUTO_INCREMENT,
        nom VARCHAR(255) NOT NULL,
        PRIMARY KEY(id_saveur)
    );

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

    CREATE TABLE box_aliment (
        id_box INT NOT NULL,
        id_aliment INT NOT NULL,
        PRIMARY KEY (id_box, id_aliment),
        CONSTRAINT fk_box_aliment_box
            FOREIGN KEY (id_box) REFERENCES box (id_box)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT fk_box_aliment_aliment
            FOREIGN KEY (id_aliment) REFERENCES aliment (id_aliment)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
    );

    CREATE TABLE commande_box (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_commande INT NOT NULL,
        id_box INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (id_commande) REFERENCES commande(id_commande),
        FOREIGN KEY (id_box) REFERENCES box(id_box)
    );