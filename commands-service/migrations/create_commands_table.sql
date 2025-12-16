-- SQL migration: create commands table for PostgreSQL

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE IF NOT EXISTS pepites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pepite_name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS panier (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status TEXT NOT NULL DEFAULT 'pending', -- pending / paid / shipped / delivered / cancelled
    payment_status TEXT NOT NULL DEFAULT 'unpaid', -- unpaid / paid / refunded
    payment_method TEXT,                          -- card / paypal / ...
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS panier_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    panier_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_each NUMERIC(10,2) NOT NULL CHECK (price_each >= 0),

    CONSTRAINT fk_panier
        FOREIGN KEY (panier_id)
        REFERENCES panier(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS livraisons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    command_id UUID NOT NULL,
    adresse TEXT NOT NULL,
    ville TEXT NOT NULL,
    code_postal TEXT NOT NULL,
    pays TEXT NOT NULL DEFAULT 'France',
    statut TEXT NOT NULL DEFAULT 'en_attente',  -- en_attente | en_route | livree
    date_expedition TIMESTAMPTZ,
    date_livraison TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_livraison_panier
        FOREIGN KEY (command_id)
        REFERENCES panier(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cookies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pepite_id UUID NOT NULL,
    cookie_name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_cookie_pepite
        FOREIGN KEY (pepite_id)
        REFERENCES pepites(id)
        ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON panier;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON panier
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
