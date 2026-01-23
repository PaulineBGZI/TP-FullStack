// Cookies.js
import "./Cookies.css";
import { useEffect, useMemo, useState } from "react";
import { CookiesAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";
import { useCart } from "../../context/CartContext";

export default function Cookies() {
    const navigate = useNavigate();
    const cart = useCart();

    const [cookies, setCookies] = useState([]);

    // cookie sélectionné dans la liste (celui qu’on personnalise)
    const [selectedCookieId, setSelectedCookieId] = useState("");

    // personnalisation (local, pas le panier)
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");

    // couleur
    const [color, setColor] = useState("classic"); // classic | choco | pink | matcha | blue | caramel | custom
    const [customColor, setCustomColor] = useState(""); // couleur libre

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
                    description: `Stock: ${x.quantity ?? "—"}`,
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

    const selectedCookie = useMemo(
        () => cookies.find((c) => String(c.id) === String(selectedCookieId)),
        [cookies, selectedCookieId]
    );

    // Quand on change de cookie, on reset la personnalisation
    useEffect(() => {
        setQuantity(1);
        setMessage("");
        setColor("classic");
        setCustomColor("");
    }, [selectedCookieId]);

    const COLOR_OPTIONS = [
        { id: "classic", label: "Classique" },
        { id: "choco", label: "Choco" },
        { id: "pink", label: "Fraise" },
        { id: "matcha", label: "Matcha" },
        { id: "blue", label: "Myrtille" },
        { id: "caramel", label: "Caramel" },
        { id: "custom", label: "Personnalisée" },
    ];

    function handleAddToCart() {
        try {
            setError("");

            if (!selectedCookie) {
                setError("Choisis un cookie.");
                return;
            }

            const qty = Math.max(1, Math.floor(Number(quantity) || 1));
            const pickedColor = String(color || "classic");
            const pickedCustom = String(customColor || "").trim();

            cart.addItem({
                cookieId: selectedCookie.id,
                name: selectedCookie.name,
                price: selectedCookie.price,
                qty,
                message: String(message || ""),
                color: pickedColor,
                customColor: pickedColor === "custom" ? pickedCustom : "",
            });

            setInfo("Ajouté au panier ! 🧺");
            window.clearTimeout(handleAddToCart._t);
            handleAddToCart._t = window.setTimeout(() => setInfo(""), 2500);

            setQuantity(1);
            setMessage("");
            setColor("classic");
            setCustomColor("");
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
                        Choisis un cookie, personnalise-le… puis ajoute-le au panier ✨
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

                        {info && (
                            <div className="fetch-error">
                                <span className="fetch-icon">✅</span>
                                <div className="fetch-text">
                                    <strong>Panier mis à jour</strong>
                                    <span>{info}</span>
                                </div>
                            </div>
                        )}

                        <section className="cookies-grid">
                            {/* LISTE COOKIES */}
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

                            {/* PERSONNALISATION */}
                            <div className="card-glass panel">
                                <div className="panel-title">
                                    <h2>Personnalisation</h2>
                                </div>

                                {!selectedCookie ? (
                                    <div className="empty-state" style={{ marginTop: 14 }}>
                                        Aucun cookie sélectionné 🍪
                                    </div>
                                ) : (
                                    <>
                                        <div className="summary">
                                            <div>
                                                <strong>Cookie :</strong> {selectedCookie.name}
                                            </div>
                                        </div>

                                        <div className="form">
                                            {/* Label comme les autres */}
                                            <label className="field">
                                                Couleur du cookie

                                                <div className="color-picker" role="radiogroup" aria-label="Choisir une couleur">
                                                    {COLOR_OPTIONS.map((c) => (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            className={`swatch-btn ${color === c.id ? "active" : ""}`}
                                                            onClick={() => setColor(c.id)}
                                                            aria-pressed={color === c.id}
                                                            title={c.label}
                                                        >
                                                            {c.id !== "custom" ? (
                                                                <span className={`swatch swatch--${c.id}`} aria-hidden="true" />
                                                            ) : (
                                                                <span
                                                                    className="swatch swatch--custom"
                                                                    aria-hidden="true"
                                                                    style={customColor ? { background: customColor } : undefined}
                                                                />
                                                            )}

                                                            <span className="swatch-label">{c.label}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                {color === "custom" && (
                                                    <div className="custom-color">
                                                        <input
                                                            type="text"
                                                            placeholder="Ex : #ff00aa ou hotpink"
                                                            value={customColor}
                                                            onChange={(e) => setCustomColor(e.target.value)}
                                                        />
                                                        <div className="custom-hint">
                                                            Astuce : tu peux taper un nom CSS, un hex (#RRGGBB) ou rgb(...)
                                                        </div>
                                                    </div>
                                                )}
                                            </label>

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
                                                <button
                                                    className="btn btn--primary btn--lg"
                                                    type="button"
                                                    onClick={handleAddToCart}
                                                >
                                                    Ajouter au panier
                                                </button>

                                                <button
                                                    className="btn btn--ghost btn--lg"
                                                    type="button"
                                                    onClick={() => navigate("/panier")}
                                                >
                                                    Voir le panier ({cart.items.length})
                                                </button>
                                            </div>

                                            <div className="fineprint">
                                                Astuce : Une pépite colorée peut te donner un coupon 🎁
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>

            <SiteFooter right="Team moelleux 🍯" />
        </div>
    );
}
