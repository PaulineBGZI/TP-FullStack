import "./Panier.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";
import { useCart } from "../../context/CartContext";

function Panier() {
    const navigate = useNavigate();
    const cart = useCart();

    const items = cart.items || [];

    const subtotal = useMemo(
        () => items.reduce((acc, it) => acc + Number(it.price || 0) * Number(it.qty || 0), 0),
        [items]
    );

    const shipping = items.length === 0 ? 0 : subtotal >= 25 ? 0 : 3.9;
    const total = subtotal + shipping;

    const inc = (id) => {
        const it = items.find((x) => x.id === id);
        if (!it) return;
        cart.updateItem(id, { qty: Number(it.qty || 0) + 1 });
    };

    const dec = (id) => {
        const it = items.find((x) => x.id === id);
        if (!it) return;
        const next = Number(it.qty || 0) - 1;
        if (next <= 0) cart.removeItem(id);
        else cart.updateItem(id, { qty: next });
    };

    const remove = (id) => cart.removeItem(id);
    const clear = () => cart.clear();

    const format = (n) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

    return (
        <div className="page page--pastel panier-page">
            <Floaties items={["🧺", "🍪", "🍪", "🍫", "🥛", "🍪"]} />

            <SiteHeader />

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

                                            {it.message ? (
                                                <p>
                                                    <strong>Message :</strong> {it.message}
                                                </p>
                                            ) : (
                                                <p style={{ opacity: 0.8 }}>Aucun message</p>
                                            )}
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

                                            <div className="price">{format(Number(it.price || 0) * Number(it.qty || 0))}</div>

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

                                <div className="fineprint">Livraison offerte dès 25€ ✨</div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <SiteFooter right="Bon shopping 🍪" />
        </div>
    );
}

export default Panier;
