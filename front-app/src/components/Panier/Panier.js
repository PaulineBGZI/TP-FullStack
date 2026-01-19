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

    const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
    const clear = () => setItems([]);

    const format = (n) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

    return (
        <div className="page page--pastel panier-page">
            {/* Floaties */}
            <div className="floaties" aria-hidden="true">
                <span className="floaty f1">🧺</span>
                <span className="floaty f2">🍪</span>
                <span className="floaty f3">🍪</span>
                <span className="floaty f4">🍫</span>
                <span className="floaty f5">🥛</span>
                <span className="floaty f6">🍪</span>
            </div>

            {/* Header */}
            <header className="site-header">
                <div className="header-inner">
                    <button className="brand" onClick={() => navigate("/")}>
            <span className="brand-dot" aria-hidden="true">
              🍪
            </span>
                        <span className="brand-text">Le Paradis des Cookies</span>
                    </button>

                    <nav className="nav">
                        <button className="nav-link" onClick={() => navigate("/concept")}>
                            Concept
                        </button>
                        <button className="nav-link" onClick={() => navigate("/cookies")}>
                            Nos cookies
                        </button>
                        <button className="nav-link" onClick={() => navigate("/panier")}>
                            Panier
                        </button>
                    </nav>

                    <div className="header-actions">
                        <button className="btn btn--primary" onClick={() => navigate("/login")}>
                            Se connecter
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="panier-main">
                <div className="card-glass panier-card">
                    <div className="panier-head">
                        <h1 className="panier-title">Votre panier 🧺</h1>
                        {items.length > 0 && (
                            <button className="btn btn--ghost" onClick={clear} type="button">
                                Vider
                            </button>
                        )}
                    </div>

                    {items.length === 0 ? (
                        <div className="empty">
                            <p>Votre panier est vide 🍪</p>
                            <button className="btn btn--primary btn--lg" onClick={() => navigate("/cookies")}>
                                Découvrir nos cookies
                            </button>
                        </div>
                    ) : (
                        <div className="panier-grid">
                            {/* Items */}
                            <div className="panier-items">
                                {items.map((it) => (
                                    <div className="panier-item" key={it.id}>
                                        <div className="item-info">
                                            <h3>{it.name}</h3>
                                            <p>{it.desc}</p>
                                        </div>

                                        <div className="item-actions">
                                            <div className="qty">
                                                <button className="qty-btn" onClick={() => dec(it.id)} type="button">
                                                    −
                                                </button>
                                                <span className="qty-val">{it.qty}</span>
                                                <button className="qty-btn" onClick={() => inc(it.id)} type="button">
                                                    +
                                                </button>
                                            </div>

                                            <div className="price">{format(it.price * it.qty)}</div>

                                            <button className="remove-btn" onClick={() => remove(it.id)} type="button">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
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

                                <button className="btn btn--primary btn--lg full" type="button">
                                    Commander
                                </button>

                                <button className="btn btn--ghost btn--lg full" onClick={clear} type="button">
                                    Vider le panier
                                </button>

                                <div className="fineprint">
                                    Livraison offerte dès 25€ ✨
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="site-footer">
                <div className="footer-inner">
                    <span>© {new Date().getFullYear()} Le Paradis des Cookies</span>
                    <span className="footer-sep">•</span>
                    <span>Bon shopping 🍪</span>
                </div>
            </footer>
        </div>
    );
}

export default Panier;
