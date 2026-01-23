import "./Concept.css";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";

function Concept() {
    const navigate = useNavigate();

    return (
        <div className="page page--pastel concept-page">
            <Floaties items={["🍪", "🍪", "🧁", "🍫", "🥛", "🍪"]} />

            <SiteHeader />

            <main className="concept-main">
                <div className="card-glass concept-card">
                    <header className="concept-hero">
                        <div className="concept-badge">Surprises • Personnalisation • Moelleux 🍯</div>

                        <h1 className="concept-title">Le concept 🍪</h1>

                        <p className="concept-subtitle">
                            Des cookies moelleux faits maison, <strong>100% personnalisables</strong>, et une surprise
                            avec des <strong>pépites colorées</strong> qui peuvent débloquer des réductions.
                        </p>

                        <div className="hero-actions">
                            <button className="btn btn--primary btn--lg" onClick={() => navigate("/cookies")}>
                                Découvrir nos cookies
                            </button>
                            <button className="btn btn--ghost btn--lg" onClick={() => navigate("/panier")}>
                                Voir le panier
                            </button>
                        </div>
                    </header>

                    <section className="concept-grid">
                        <div className="concept-block">
                            <h2>🎨 Personnalisation complète</h2>
                            <p>
                                Tu choisis ton cookie artisanal, puis tu ajoutes des décorations, un motif et tu
                                personnalises même la boîte (message, style, design).
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
                                Certains cookies cachent une <strong>pépite colorée</strong> ! La couleur peut te donner
                                un <strong>coupon de réduction</strong>. Et en bonus, un <strong>code sur la boîte</strong>{" "}
                                permet de récupérer tes avantages facilement.
                            </p>

                            <div className="nuggets" aria-hidden="true">
                                <span className="nugget n1" />
                                <span className="nugget n2" />
                                <span className="nugget n3" />
                                <span className="nugget n4" />
                            </div>
                        </div>

                        <div className="concept-block">
                            <h2>🚚 Commande simple & rapide</h2>
                            <p>
                                Une expérience moderne : commande en ligne, panier clair et livraison rapide via des
                                partenaires locaux.
                            </p>

                            <div className="concept-cta">
                                <button className="btn btn--primary" onClick={() => navigate("/cookies")}>
                                    Choisir un cookie
                                </button>
                                <button className="btn btn--ghost" onClick={() => navigate("/panier")}>
                                    Voir le panier
                                </button>
                            </div>
                        </div>

                        <div className="concept-block">
                            <h2>✨ Pourquoi c’est différent ?</h2>
                            <p>
                                Là où des enseignes proposent souvent du “standard”, toi tu as : <strong>du moelleux</strong>,{" "}
                                <strong>du sur-mesure</strong> et <strong>une fidélisation fun</strong> grâce aux pépites surprises.
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
                        <p>Prêt(e) à croquer une pépite ? 🍪</p>
                        <button className="btn btn--primary" onClick={() => navigate("/cookies")}>
                            Découvrir
                        </button>
                    </footer>
                </div>
            </main>

            <SiteFooter right="Fait avec amour 🍫" />
        </div>
    );
}

export default Concept;
