import "./Cookies.css";
import { useEffect, useState } from "react";
import { CookiesAPI, OrdersAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";

export default function Cookies() {
    const navigate = useNavigate();

    const [cookies, setCookies] = useState([]);

    const [selectedCookieId, setSelectedCookieId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");

    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError("");
                setInfo("");

                const cRaw = await CookiesAPI.list();
                const normalizedCookies = (Array.isArray(cRaw) ? cRaw : []).map((x) => ({
                    id: String(x.id),
                    name: x.cookie_name ?? "",
                    description: `Pépite #${x.pepite_id ?? "—"} • Stock: ${x.quantity ?? "—"}`,
                    // Pas de prix dans la réponse actuelle : on met 0 pour éviter NaN
                    price: x.price ?? 0,
                    _raw: x,
                }));

                setCookies(normalizedCookies);

                if (normalizedCookies.length) {
                    setSelectedCookieId(normalizedCookies[0].id);
                } else {
                    setSelectedCookieId("");
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const selectedCookie = cookies.find((c) => String(c.id) === String(selectedCookieId));

    async function handleCreateOrder() {
        try {
            setError("");
            setInfo("");

            if (!selectedCookieId) {
                setError("Choisis un cookie.");
                return;
            }

            await OrdersAPI.create({
                cookieId: selectedCookieId,
                quantity: Number(quantity),
                message,
            });

            setInfo("Commande créée avec succès ! 🎉");
            setMessage("");
            setQuantity(1);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="page page--pastel cookies-clean">
            <Floaties items={["🍪", "🍪", "🧁", "🍪", "🍫", "🥛"]} />

            <SiteHeader />

            <main className="cookies-main">
                <div className="cookies-head">
                    <h1 className="cookies-title">Nos cookies 🍪</h1>
                    <p className="cookies-subtitle">
                        Choisis ton cookie, la quantité… et ajoute un petit message si tu veux ✨
                    </p>
                </div>

                {loading ? (
                    <div className="card-glass cookies-loading">Chargement…</div>
                ) : (
                    <>
                        {error && (
                            <div className="fetch-error">
                                <span className="fetch-icon">⚠️</span>
                                <div className="fetch-text">
                                    <strong>Impossible de charger les cookies</strong>
                                    <span>
                    Le serveur ne répond pas pour le moment.
                    Réessaie dans quelques instants 🍪
                  </span>
                                </div>
                            </div>
                        )}
                        {info && <div className="alert alert-info">{info}</div>}

                        <section className="cookies-grid">
                            <div className="card-glass panel">
                                <div className="panel-title">
                                    <h2>Cookies disponibles</h2>
                                    <span className="panel-hint">{cookies.length} choix</span>
                                </div>

                                <div className="list">
                                    {cookies.map((c) => (
                                        <button
                                            key={c.id}
                                            className={`item ${String(c.id) === String(selectedCookieId) ? "active" : ""}`}
                                            onClick={() => setSelectedCookieId(String(c.id))}
                                            type="button"
                                        >
                                            <div className="item-main">
                                                <div className="item-name">{c.name}</div>
                                                <div className="item-desc">{c.description}</div>
                                            </div>
                                            <div className="item-price">{(Number(c.price) || 0).toFixed(2)} €</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="card-glass panel">
                                <div className="panel-title">
                                    <h2>Personnalisation</h2>
                                </div>

                                <div className="summary">
                                    <div>
                                        <strong>Cookie :</strong> {selectedCookie ? selectedCookie.name : ""}
                                    </div>
                                </div>

                                <div className="form">
                                    <label>
                                        Quantité
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </label>

                                    <label>
                                        Message sur la boîte (optionnel)
                                        <input
                                            type="text"
                                            placeholder="Ex : Joyeux anniversaire !"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </label>

                                    <div className="cta-row">
                                        <button className="btn btn--primary btn--lg" onClick={handleCreateOrder}>
                                            Commander
                                        </button>
                                        <button className="btn btn--ghost btn--lg" type="button" onClick={() => navigate("/panier")}>
                                            Voir le panier
                                        </button>
                                    </div>

                                    <div className="fineprint">
                                        Astuce : Une pépite colorée peut te donner un coupon 🎁
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <SiteFooter right="Team moelleux 🍯" />
        </div>
    );
}
