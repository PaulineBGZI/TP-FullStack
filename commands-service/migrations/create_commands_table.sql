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
