-- Script de migration pour ajouter le champ 'status' à la table client
-- À exécuter dans phpMyAdmin si la base de données existe déjà

ALTER TABLE client ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'regular';

-- Pour tester le tarif étudiant (-10%), mettre un client en mode étudiant :
-- UPDATE client SET status = 'student' WHERE id_client = 1;
