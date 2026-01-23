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

                const [c, b] = await Promise.all([CookiesAPI.list(), BoxesAPI.list()]);
                setCookies(Array.isArray(c) ? c : []);
                setBoxes(Array.isArray(b) ? b : []);

                if (Array.isArray(c) && c.length) setSelectedCookieId(c[0].id);
                if (Array.isArray(b) && b.length) setSelectedBoxId(b[0].id);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const selectedCookie = cookies.find((c) => c.id === selectedCookieId);
    const selectedBox = boxes.find((b) => b.id === selectedBoxId);

    async function handleCreateOrder() {
        try {
            setError("");
            setInfo("");

            if (!selectedCookieId || !selectedBoxId) {
                setError("Choisis un cookie et une boîte.");
                return;
            }

            await OrdersAPI.create({
                cookieId: selectedCookieId,
                boxId: selectedBoxId,
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
                                            className={`item ${c.id === selectedCookieId ? "active" : ""}`}
                                            onClick={() => setSelectedCookieId(c.id)}
                                            type="button"
                                        >
                                            <div className="item-main">
                                                <div className="item-name">{c.cookie_name}</div>
                                                {/* <div className="item-desc">{c.description}</div> */}
                                            </div>
                                            {/* <div className="item-price">{Number(c.price).toFixed(2)} €</div> */}
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

                                <h3 className="section-title">Choisir une boîte</h3>
                                <div className="boxes">
                                    {boxes.map((b) => (
                                        <button
                                            key={b.id}
                                            className={`box ${b.id === selectedBoxId ? "active" : ""}`}
                                            onClick={() => setSelectedBoxId(b.id)}
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
