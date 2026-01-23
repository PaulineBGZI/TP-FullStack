import "./AdminCookies.css";
import { useEffect, useState } from "react";
import { CookiesAPI } from "../../api/api";
import Floaties from "../../components/Floaties";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export default function AdminCookies() {
    const [cookies, setCookies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    
    // Form
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [cookieName, setCookieName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [pepiteId, setPepiteId] = useState("");
    const [price, setPrice] = useState("");

    async function load() {
        try {
            setLoading(true);
            setError("");
            setInfo("");

            const data = await CookiesAPI.list();
            setCookies(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    function resetForm() {
        setEditingId(null);
        setCookieName("");
        setQuantity(0);
        setPepiteId("");
        setPrice("");
    }

    function startEdit(c) {
        setEditingId(String(c.id));
        setCookieName(c.cookie_name ?? "");
        setQuantity(Number(c.quantity ?? 0));
        setPepiteId(c.pepite_id == null ? "" : String(c.pepite_id));
        setPrice(c.price == null ? "" : String(c.price));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setInfo("");

        if (!cookieName.trim()) {
            setError("Le nom du cookie est obligatoire.");
            return;
        }

        const payload = {
            cookie_name: cookieName.trim(),
            quantity: Number(quantity),
            pepite_id: pepiteId ? String(pepiteId) : null,
            price: price ? Number(price) : 0, 
        };

        try {
            if (editingId) {
                await CookiesAPI.update(editingId, payload);
                setInfo("Cookie modifié ✅");
            } else {
                await CookiesAPI.create(payload);
                setInfo("Cookie ajouté ✅");
            }

                resetForm();
            await load();
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id) {
        setError("");
        setInfo("");

        const ok = window.confirm("Supprimer ce cookie ?");
        if (!ok) return;

        try {
            await CookiesAPI.remove(id);
            setInfo("Cookie supprimé ✅");
            if (String(editingId) === String(id)) resetForm();
            await load();
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="page page--pastel admin-cookies-page">
            <Floaties items={["🍪", "⚙️", "🧁", "🍫", "📦", "🥛"]} />

            <SiteHeader />

            <main className="admin-cookies-main">
                <div className="admin-cookies-head">
                    <h1 className="admin-cookies-title">Gestion des cookies 🍪</h1>
                    <p className="admin-cookies-subtitle">
                        Ajoute, modifie ou supprime des cookies (stock + pépite). ✨
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
                    Le serveur ne répond pas pour le moment. Réessaie dans quelques instants 🍪
                  </span>
                                </div>
                            </div>
                        )}

                        {info && <div className="alert alert-info">{info}</div>}

                        <section className="admin-grid">
                            {/* Form */}
                            <div className="card-glass admin-panel">
                                <div className="admin-panel-title">
                                    <h2>{editingId ? "Modifier un cookie" : "Ajouter un cookie"}</h2>
                                    <span className="admin-panel-hint">{editingId ? `ID: ${editingId}` : "Nouveau"}</span>
                                </div>

                                <form className="admin-form" onSubmit={handleSubmit}>
                                    <label>
                                        Nom
                                        <input
                                            value={cookieName}
                                            onChange={(e) => setCookieName(e.target.value)}
                                            placeholder="Ex : Cookie 3 chocolats"
                                        />
                                    </label>

                                    <label>
                                        Quantité (stock)
                                        <input
                                            type="number"
                                            min="0"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </label>

                                    <label>
                                        Pépite ID
                                        <input
                                            value={pepiteId}
                                            onChange={(e) => setPepiteId(e.target.value)}
                                            placeholder="Ex : 1"
                                        />
                                    </label>

                                    <label>
                                        Prix 
                                        <input
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="Ex : 1"
                                        />
                                    </label>

                                    <div className="admin-form-actions">
                                        <button className="btn btn--primary btn--lg" type="submit" disabled={submitting}>
                                            {submitting ? (editingId ? "Modification..." : "Ajout...") : (editingId ? "Enregistrer" : "Ajouter")}                                        </button>
                                        <button className="btn btn--ghost btn--lg" type="button" onClick={resetForm}>
                                            Réinitialiser
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* List */}
                            <div className="card-glass admin-panel">
                                <div className="admin-panel-title">
                                    <h2>Liste des cookies</h2>
                                    <span className="admin-panel-hint">{cookies.length} élément(s)</span>
                                </div>

                                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                                    <button className="btn btn--ghost" onClick={load} disabled={loading}>
                                        Rafraîchir
                                    </button>
                                    {editingId && (
                                        <button className="btn btn--ghost" onClick={resetForm} type="button">
                                            Quitter l’édition
                                        </button>
                                    )}
                                </div>

                                {cookies.length === 0 ? (
                                    <div className="admin-muted">Aucun cookie.</div>
                                ) : (
                                    <div className="admin-list">
                                        {cookies.map((c) => (
                                            <div className="admin-item" key={c.id}>
                                                <div className="admin-item-main">
                                                    <div className="admin-item-title">{c.cookie_name}</div>
                                                    <div className="admin-item-sub">
                                                        Stock: <strong>{c.quantity}</strong> • Pépite:{" "}
                                                        <strong>{c.pepite_id ?? "—"}</strong> 
                                                        • ID: <strong>{c.id}</strong>
                                                        • Prix: <strong>{c.price ?? "0"}€</strong>
                                                    </div>
                                                </div>

                                                <div className="admin-item-actions">
                                                    <button className="btn btn--ghost" type="button" onClick={() => startEdit(c)}>
                                                        Modifier
                                                    </button>
                                                    <button className="btn btn--danger" type="button" onClick={() => handleDelete(c.id)}>
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>

            <SiteFooter right="Admin panel 🍪" />
        </div>
    );
}
