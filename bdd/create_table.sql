CREATE TABLE box (
    id_box VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    pieces INT NOT NULL CHECK (pieces > 0),
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    image VARCHAR(255) NOT NULL,
    saveur VARCHAR(255) NOT NULL
);

CREATE TABLE aliment (
    id_aliment VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    quantite INT NOT NULL CHECK (quantite >= 0)
);

CREATE TABLE client (
    id_client VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL -- stocke toujours un hash, jamais le mot de passe en clair
);

CREATE TABLE commande (
    id_commande VARCHAR(255) PRIMARY KEY,
    date_commande DATE NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    canal_commande VARCHAR(255) NOT NULL,
    id_client VARCHAR(255) NOT NULL,
    CONSTRAINT fk_commande_client
        FOREIGN KEY (id_client) REFERENCES client (id_client)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE box_aliment (
    id_box VARCHAR(255) NOT NULL,
    id_aliment VARCHAR(50) NOT NULL,
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
    id_commande VARCHAR(255) NOT NULL,
    id_box VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_commande, id_box),
    CONSTRAINT fk_commande_box_commande
        FOREIGN KEY (id_commande) REFERENCES commande (id_commande)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_commande_box_box
        FOREIGN KEY (id_box) REFERENCES box (id_box)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);