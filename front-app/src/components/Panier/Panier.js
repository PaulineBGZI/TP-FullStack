import "./Panier.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Panier() {
    const navigate = useNavigate();

    // Données temporaires
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Cookie Chocolat Noisette",
            desc: "Moelleux, pépites chocolat",
            price: 3.5,
            qty: 2,
        },
        {
            id: 2,
            name: "Cookie Vanille Cactus 🌵",
            desc: "Décoration personnalisée",
            price: 4.2,
            qty: 1,
        },
    ]);

    const subtotal = useMemo(
        () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
        [items]
    );

    const shipping = items.length === 0 ? 0 : subtotal >= 25 ? 0 : 3.9;
    const total = subtotal + shipping;

    const inc = (id) =>
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
        );

    const dec = (id) =>
        setItems((prev) =>
            prev
                .map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it))
                .filter((it) => it.qty > 0)
        );

    const remove = (id) =>
        setItems((prev) => prev.filter((it) => it.id !== id));

    const clear = () => setItems([]);

    const format = (n) =>
        new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(n);

    return (
        <div className="panier-container">
            <button className="back-button" onClick={() => navigate("/")}>
                ← Retour
            </button>

            <div className="background-cookies">
                <span className="bg-cookie c1"></span>
                <span className="bg-cookie c2"></span>
                <span className="bg-cookie c3"></span>
                <span className="bg-cookie c4"></span>
            </div>

            <div className="panier-card">
                <h1 className="panier-title">Votre panier 🧺</h1>

                {items.length === 0 ? (
                    <div className="empty">
                        <p>Votre panier est vide 🍪</p>
                        <button className="primary-btn" onClick={() => navigate("/cookies")}>
                            Découvrir nos cookies
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="panier-items">
                            {items.map((it) => (
                                <div className="panier-item" key={it.id}>
                                    <div className="item-info">
                                        <h3>{it.name}</h3>
                                        <p>{it.desc}</p>
                                    </div>

                                    <div className="item-actions">
                                        <div className="qty">
                                            <button onClick={() => dec(it.id)}>−</button>
                                            <span>{it.qty}</span>
                                            <button onClick={() => inc(it.id)}>+</button>
                                        </div>

                                        <div className="price">
                                            {format(it.price * it.qty)}
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => remove(it.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary">
                            <div className="row">
                                <span>Sous-total</span>
                                <span>{format(subtotal)}</span>
                            </div>
                            <div className="row">
                                <span>Livraison</span>
                                <span>{shipping === 0 ? "Offerte 🎉" : format(shipping)}</span>
                            </div>
                            <div className="row total">
                                <span>Total</span>
                                <span>{format(total)}</span>
                            </div>

                            <button className="primary-btn full">
                                Commander
                            </button>
                            <button className="secondary-btn full" onClick={clear}>
                                Vider le panier
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Panier;
