import "./Cookies.css";
import { useEffect, useState } from "react";
import { CookiesAPI, BoxesAPI, OrdersAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Cookies() {
    const navigate = useNavigate();

    const [cookies, setCookies] = useState([]);
    const [boxes, setBoxes] = useState([]);

    const [selectedCookieId, setSelectedCookieId] = useState("");
    const [selectedBoxId, setSelectedBoxId] = useState("");
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

                // 1) Cookies : l'API renvoie des objets du style:
                // { id, pepite_id, cookie_name, quantity, created_at }
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

                // 2) Boxes : pas encore dispo -> on ignore si ça échoue
                try {
                    const bRaw = await BoxesAPI.list();
                    const normalizedBoxes = Array.isArray(bRaw) ? bRaw : [];
                    setBoxes(normalizedBoxes);

                    if (normalizedBoxes.length) {
                        setSelectedBoxId(String(normalizedBoxes[0].id));
                    } else {
                        setSelectedBoxId("");
                    }
                } catch (e) {
                    setBoxes([]);
                    setSelectedBoxId("");
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const selectedCookie = cookies.find((c) => String(c.id) === String(selectedCookieId));
    const selectedBox = boxes.find((b) => String(b.id) === String(selectedBoxId));

    async function handleCreateOrder() {
        try {
            setError("");
            setInfo("");

            // Tant que boxes n'existe pas, on n'oblige pas le choix de boîte
            if (!selectedCookieId) {
                setError("Choisis un cookie.");
                return;
            }

            await OrdersAPI.create({
                cookieId: selectedCookieId,
                boxId: selectedBoxId || null,
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
            {/* Floaties */}
            <div className="floaties" aria-hidden="true">
                <span className="floaty f1">🍪</span>
                <span className="floaty f2">🍪</span>
                <span className="floaty f3">🧁</span>
                <span className="floaty f4">🍪</span>
                <span className="floaty f5">🍫</span>
                <span className="floaty f6">🥛</span>
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
            <main className="cookies-main">
                <div className="cookies-head">
                    <h1 className="cookies-title">Nos cookies 🍪</h1>
                    <p className="cookies-subtitle">
                        Choisis ton cookie, la boîte, la quantité… et ajoute un petit message si tu veux ✨
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
                            {/* Left: cookies list */}
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

                            {/* Right: customization */}
                            <div className="card-glass panel">
                                <div className="panel-title">
                                    <h2>Personnalisation</h2>
                                    <span className="panel-hint">Boîte • Quantité • Message</span>
                                </div>

                                <div className="summary">
                                    <div>
                                        <strong>Cookie :</strong> {selectedCookie ? selectedCookie.name : "—"}
                                    </div>
                                    <div>
                                        <strong>Boîte :</strong> {selectedBox ? selectedBox.colorName : "—"}
                                    </div>
                                </div>

                                {/* Boxes : pas encore dispo -> petit message */}
                                {boxes.length === 0 ? (
                                    <div className="card-glass cookies-loading">
                                        Boîtes bientôt dispo ✨
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="section-title">Choisir une boîte</h3>
                                        <div className="boxes">
                                            {boxes.map((b) => (
                                                <button
                                                    key={b.id}
                                                    className={`box ${String(b.id) === String(selectedBoxId) ? "active" : ""}`}
                                                    onClick={() => setSelectedBoxId(String(b.id))}
                                                    type="button"
                                                >
                                                    <span
                                                        className="swatch"
                                                        style={{ backgroundColor: b.colorHex || "#ddd" }}
                                                    />
                                                    <span className="box-name">{b.colorName}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}

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
                                        <button
                                            className="btn btn--ghost btn--lg"
                                            type="button"
                                            onClick={() => navigate("/panier")}
                                        >
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

            <footer className="site-footer">
                <div className="footer-inner">
                    <span>© {new Date().getFullYear()} Le Paradis des Cookies</span>
                    <span className="footer-sep">•</span>
                    <span>Team moelleux 🍯</span>
                </div>
            </footer>
        </div>
    );
}
