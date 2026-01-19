import "./Concept.css";
import { useNavigate } from "react-router-dom";

function Concept() {
    const navigate = useNavigate();

    return (
        <div className="concept-container">
            {/* Bouton retour */}
            <button className="back-button" onClick={() => navigate("/")}>
                ← Retour
            </button>

            {/* Décor cookies flottants */}
            <div className="background-cookies">
                <span className="bg-cookie c1"></span>
                <span className="bg-cookie c2"></span>
                <span className="bg-cookie c3"></span>
                <span className="bg-cookie c4"></span>
                <span className="bg-cookie c5"></span>
                <span className="bg-cookie c6"></span>
            </div>

            <div className="concept-card">
                <header className="concept-hero">
                    <h1 className="concept-title">
                        Le concept 🍪
                    </h1>
                    <p className="concept-subtitle">
                        Des cookies moelleux faits maison, <strong>100% personnalisables</strong>,
                        et une surprise avec des <strong>pépites colorées</strong> qui peuvent
                        débloquer des réductions.
                    </p>

                    <div className="hero-actions">
                        <button className="primary-btn" onClick={() => navigate("/cookies")}>
                            Découvrir nos cookies
                        </button>
                        <button className="secondary-btn" onClick={() => navigate("/login")}>
                            Se connecter
                        </button>
                    </div>
                </header>

                <section className="concept-grid">
                    <div className="concept-block">
                        <h2>🎨 Personnalisation complète</h2>
                        <p>
                            Tu choisis ton cookie artisanal, puis tu ajoutes des décorations,
                            un motif et tu personnalises même la boîte (message, style, design).
                        </p>

                        <ul className="concept-list">
                            <li>Choix du cookie</li>
                            <li>Décorations & motifs personnalisés</li>
                            <li>Boîte personnalisée</li>
                        </ul>
                    </div>

                    <div className="concept-block">
                        <h2>🟣 Les pépites surprises</h2>
                        <p>
                            Certains cookies cachent une <strong>pépite colorée</strong> !
                            La couleur peut te donner un <strong>coupon de réduction</strong>.
                            Et en bonus, un <strong>code sur la boîte</strong> permet de
                            récupérer tes avantages facilement.
                        </p>

                        <div className="nuggets">
                            <span className="nugget n1" title="Réduction surprise"></span>
                            <span className="nugget n2" title="Réduction surprise"></span>
                            <span className="nugget n3" title="Réduction surprise"></span>
                            <span className="nugget n4" title="Réduction surprise"></span>
                        </div>
                    </div>

                    <div className="concept-block">
                        <h2>🚚 Commande simple & rapide</h2>
                        <p>
                            Une expérience moderne : commande en ligne, panier clair et
                            livraison rapide via des partenaires locaux.
                        </p>

                        <div className="concept-cta">
                            <button className="primary-btn" onClick={() => navigate("/cookies")}>
                                Choisir un cookie
                            </button>
                            <button className="secondary-btn">
                                Voir le panier
                            </button>
                        </div>
                    </div>

                    <div className="concept-block">
                        <h2>✨ Pourquoi c’est différent ?</h2>
                        <p>
                            Là où des enseignes proposent souvent du “standard”, toi tu as :
                            <strong> du moelleux</strong>, <strong>du sur-mesure</strong> et
                            <strong> une fidélisation fun</strong> grâce aux pépites surprises.
                        </p>

                        <div className="badges">
                            <span className="badge">Moelleux maison</span>
                            <span className="badge">Personnalisable</span>
                            <span className="badge">Surprises</span>
                            <span className="badge">Coupons</span>
                        </div>
                    </div>
                </section>

                <footer className="concept-footer">
                    <p>
                        Prêt(e) à croquer une pépite ? 🍪
                    </p>
                    <button className="primary-btn" onClick={() => navigate("/cookies")}>
                        Découvrir
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default Concept;
