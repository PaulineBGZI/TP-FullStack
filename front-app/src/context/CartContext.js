// CartContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCart, setCart } from "../utils/cart";

const CartContext = createContext(null);

function makeId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normMessage(v) {
    // On normalise pour éviter les doublons bêtes ("coucou " vs "coucou")
    return String(v ?? "").trim();
}

function normColor(v) {
    return String(v ?? "classic").trim() || "classic";
}

function normCustomColor(v) {
    return String(v ?? "").trim();
}

export function CartProvider({ children }) {
    const [items, setItemsState] = useState(() => getCart());

    const setItems = (next) => {
        const current = getCart();
        const value = typeof next === "function" ? next(current) : next;
        setItemsState(value);
        setCart(value);
    };

    useEffect(() => {
        const onChanged = () => setItemsState(getCart());
        window.addEventListener("cart_changed", onChanged);
        return () => window.removeEventListener("cart_changed", onChanged);
    }, []);

    const api = useMemo(() => {
        return {
            items,

            addItem(payload) {
                const cookieId = String(payload.cookieId ?? "");
                const name = payload.name ?? "";
                const price = Number(payload.price ?? 0);
                const qtyToAdd = Math.max(1, Math.floor(Number(payload.qty ?? 1) || 1));
                const message = normMessage(payload.message);

                // ✅ Couleur
                const color = normColor(payload.color);
                const customColor = color === "custom" ? normCustomColor(payload.customColor) : "";

                // ✅ Fusion: même cookieId + même message + même couleur (+ customColor si custom)
                setItems((prev) => {
                    const idx = prev.findIndex((it) => {
                        const itColor = normColor(it.color);
                        const itCustom = itColor === "custom" ? normCustomColor(it.customColor) : "";

                        return (
                            String(it.cookieId) === cookieId &&
                            normMessage(it.message) === message &&
                            itColor === color &&
                            itCustom === customColor
                        );
                    });

                    if (idx !== -1) {
                        const copy = prev.slice();
                        const current = copy[idx];

                        copy[idx] = {
                            ...current,
                            // on garde le prix existant (ou on peut le remplacer, mais ici on garde)
                            qty: Number(current.qty || 0) + qtyToAdd,
                            name: current.name || name,
                            price: Number.isFinite(current.price) ? current.price : price,
                            message: normMessage(current.message),

                            // ✅ on conserve couleur/custom
                            color,
                            customColor,
                        };
                        return copy;
                    }

                    const item = {
                        id: makeId(),
                        cookieId,
                        name,
                        price,
                        qty: qtyToAdd,
                        message,

                        // ✅ stocke couleur/custom
                        color,
                        customColor,
                    };

                    return [...prev, item];
                });
            },

            updateItem(id, patch) {
                setItems((prev) =>
                    prev.map((it) =>
                        it.id === id
                            ? {
                                ...it,
                                ...patch,
                                qty: patch.qty !== undefined ? Number(patch.qty) : it.qty,
                                price: patch.price !== undefined ? Number(patch.price) : it.price,
                                message: patch.message !== undefined ? String(patch.message) : it.message,

                                // ✅ normalisation si on update couleur
                                color: patch.color !== undefined ? normColor(patch.color) : it.color,
                                customColor:
                                    patch.customColor !== undefined
                                        ? normCustomColor(patch.customColor)
                                        : it.customColor,
                            }
                            : it
                    )
                );
            },

            removeItem(id) {
                setItems((prev) => prev.filter((it) => it.id !== id));
            },

            clear() {
                setItems([]);
            },
        };
    }, [items]);

    return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within <CartProvider>");
    return ctx;
}
