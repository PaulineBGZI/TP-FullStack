import "./AdminCookies.css";
import { useEffect, useState } from "react";
import { CookiesAPI } from "../../api/api";

export default function AdminCookies() {
    const [cookies, setCookies] = useState([]);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const [form, setForm] = useState({ name: "", description: "", price: "" });
    const [editingId, setEditingId] = useState(null);

    async function load() {
        try {
            setError("");
            const data = await CookiesAPI.list();
            setCookies(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => { load(); }, []);

    function onChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setInfo("");

            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
            };

            if (editingId) {
                await CookiesAPI.update(editingId, payload);
                setInfo("Cookie modifié ✅");
            } else {
                await CookiesAPI.create(payload);
                setInfo("Cookie créé ✅");
            }

            setForm({ name: "", description: "", price: "" });
            setEditingId(null);
            await load();
        } catch (e2) {
            setError(e2.message);
        }
    }

    function startEdit(c) {
        setEditingId(c.id);
        setForm({ name: c.name || "", description: c.description || "", price: String(c.price ?? "") });
    }

    async function remove(id) {
        try {
            setError("");
            setInfo("");
            await CookiesAPI.remove(id);
            setInfo("Cookie supprimé ✅");
            await load();
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Admin — Cookies</h1>

            {error && <div className="alert alert-error">{error}</div>}
            {info && <div className="alert alert-info">{info}</div>}

            <div className="admin-grid">
                <div className="panel">
                    <h2>{editingId ? "Modifier un cookie" : "Créer un cookie"}</h2>

                    <form onSubmit={onSubmit} className="form">
                        <label>
                            Nom
                            <input name="name" value={form.name} onChange={onChange} required />
                        </label>

                        <label>
                            Description
                            <input name="description" value={form.description} onChange={onChange} required />
                        </label>

                        <label>
                            Prix (€)
                            <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} required />
                        </label>

                        <button className="cta" type="submit">
                            {editingId ? "Enregistrer" : "Créer"}
                        </button>

                        {editingId && (
                            <button
                                className="secondary"
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setForm({ name: "", description: "", price: "" });
                                }}
                            >
                                Annuler
                            </button>
                        )}
                    </form>
                </div>

                <div className="panel">
                    <h2>Liste</h2>

                    <div className="list">
                        {cookies.map((c) => (
                            <div key={c.id} className="row">
                                <div className="row-main">
                                    <div className="row-title">{c.name}</div>
                                    <div className="row-desc">{c.description}</div>
                                </div>

                                <div className="row-actions">
                                    <div className="row-price">{Number(c.price).toFixed(2)} €</div>
                                    <button className="btn" onClick={() => startEdit(c)}>Modifier</button>
                                    <button className="btn danger" onClick={() => remove(c.id)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
