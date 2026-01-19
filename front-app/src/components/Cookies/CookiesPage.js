import "./CookiesPage.css";
import { useEffect, useState } from "react";
import { CookiesAPI, BoxesAPI, OrdersAPI } from "../../api/api";

export default function CookiesPage() {
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

                // Auto-select (optionnel)
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

            setInfo("Commande créée ✅");
            setMessage("");
            setQuantity(1);
        } catch (e) {
            setError(e.message);
        }
    }


    if (loading) return <div className="cookies-page">Chargement...</div>;

    return (
        <div className="cookies-page">
            <button className="back-btn" onClick={() => window.history.back()}>
                ← Retour
            </button>

            <h1 className="cookies-title">Nos cookies 🍪</h1>
            <p className="cookies-subtitle">Choisis ton cookie et la couleur de ta boîte.</p>

            {error && <div className="alert alert-error">{error}</div>}
            {info && <div className="alert alert-info">{info}</div>}

            <div className="grid">
                <div className="panel">
                    <h2>1) Cookies disponibles</h2>

                    <div className="list">
                        {cookies.map((c) => (
                            <button
                                key={c.id}
                                className={`item ${c.id === selectedCookieId ? "active" : ""}`}
                                onClick={() => setSelectedCookieId(c.id)}
                            >
                                <div className="item-main">
                                    <div className="item-name">{c.name}</div>
                                    <div className="item-desc">{c.description}</div>
                                </div>
                                <div className="item-price">{Number(c.price).toFixed(2)} €</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <h2>2) Personnalisation</h2>

                    <div className="summary">
                        <div><strong>Cookie :</strong> {selectedCookie ? selectedCookie.name : "—"}</div>
                        <div><strong>Boîte :</strong> {selectedBox ? selectedBox.colorName : "—"}</div>
                    </div>

                    <h3>Choisir une boîte</h3>
                    <div className="boxes">
                        {boxes.map((b) => (
                            <button
                                key={b.id}
                                className={`box ${b.id === selectedBoxId ? "active" : ""}`}
                                onClick={() => setSelectedBoxId(b.id)}
                                type="button"
                            >
                                <span className="swatch" style={{backgroundColor: b.colorHex || "#ddd"}}/>
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
                                placeholder="Ex : Pour Pauline 💚"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </label>

                        <button className="cta" onClick={handleCreateOrder}>
                            Commander
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
