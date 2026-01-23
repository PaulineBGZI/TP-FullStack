-- SQL migration: create commands table for PostgreSQL

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE IF NOT EXISTS pepites (
    id BIGSERIAL PRIMARY KEY,
    pepite_name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now())
);

CREATE TABLE IF NOT EXISTS panier (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status TEXT NOT NULL DEFAULT 'pending', -- pending / paid / shipped / delivered / cancelled
    payment_status TEXT NOT NULL DEFAULT 'unpaid', -- unpaid / paid / refunded
    payment_method TEXT,                          -- card / paypal / ...
    created_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now())
);

CREATE TABLE IF NOT EXISTS panier_items (
    id BIGSERIAL PRIMARY KEY,
    panier_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_each NUMERIC(10,2) NOT NULL CHECK (price_each >= 0),

    CONSTRAINT fk_panier
        FOREIGN KEY (panier_id)
        REFERENCES panier(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS livraisons (
    id BIGSERIAL PRIMARY KEY,
    command_id BIGINT NOT NULL,
    adresse TEXT NOT NULL,
    ville TEXT NOT NULL,
    code_postal TEXT NOT NULL,
    pays TEXT NOT NULL DEFAULT 'France',
    statut TEXT NOT NULL DEFAULT 'en_attente',  -- en_attente | en_route | livree
    date_expedition TIMESTAMPTZ,
    date_livraison TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now()),

    CONSTRAINT fk_livraison_panier
        FOREIGN KEY (command_id)
        REFERENCES panier(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cookies (
    id BIGSERIAL PRIMARY KEY,
    pepite_id BIGINT NOT NULL,
    cookie_name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('second', now()),

    CONSTRAINT fk_cookie_pepite
        FOREIGN KEY (pepite_id)
        REFERENCES pepites(id)
        ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_panier_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE panier
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * price_each), 0)
        FROM panier_items
        WHERE panier_id = NEW.panier_id
    ),
    updated_at = now()
    WHERE id = NEW.panier_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Insertion de données pour la table pepites
INSERT INTO pepites (pepite_name, quantity, created_at)
VALUES
('Pépites de Chocolat Noir', 1000, NOW()),
('Pépites de Chocolat Blanc', 1000, NOW()),
('Pépites de Caramel', 1000, NOW()),
('Pépites de Noisette', 1000, NOW()),
('Pépites de Fruits Rouges', 1000, NOW());

-- Insertion de données pour la table cookies
INSERT INTO cookies (pepite_id, cookie_name, quantity, price, created_at)
VALUES
(1, 'Cookie Chocolat Noir', 50, 2.50, NOW()),
(2, 'Cookie Chocolat Blanc', 50, 2.50, NOW()),
(3, 'Cookie Caramel', 50, 2.75, NOW()),
(4, 'Cookie Noisette', 50, 2.75, NOW()),
(5, 'Cookie Fruits Rouges', 50, 2.90, NOW()),
(1, 'Cookie Double Chocolat', 50, 3.00, NOW()),
(2, 'Cookie Chocolat Blanc et Noisette', 50, 3.25, NOW()),
(3, 'Cookie Caramel et Fruits Rouges', 50, 3.25, NOW()),
(4, 'Cookie Noisette et Caramel', 50, 3.50, NOW()),
(5, 'Cookie Mix Fruits Rouges et Chocolat Noir', 50, 3.50, NOW());

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = date_trunc('second', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON panier;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON panier
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
