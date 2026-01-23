import "./Home.css";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="page page--pastel">
            <Floaties
                items={["🍪", "🍪", "🧁", "🍪", "🍫", "🍪"]}
                extra={[
                    { className: "f7", emoji: "🥛" },
                    { className: "f8", emoji: "🍪" },
                ]}
            />

            <SiteHeader />

            <main className="home">
                <section className="hero">
                    <div className="hero-card">
                        <div className="hero-badge">Cookies moelleux • Personnalisés • Surprise inside ✨</div>

                        <h1 className="hero-title">
                            Des cookies tout doux,
                            <br />
                            une surprise à chaque bouchée 🍪
                        </h1>

                        <p className="hero-subtitle">
                            Choisis tes recettes, ta boîte, ton petit message…
                            <br />
                            et tente de tomber sur une pépite colorée 🎁
                        </p>

                        <div className="hero-cta">
                            <button className="btn btn--primary btn--lg" onClick={() => navigate("/cookies")}>
                                Découvrir nos cookies
                            </button>

                            <button className="btn btn--ghost btn--lg" onClick={() => navigate("/concept")}>
                                En savoir plus
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-label">🍯 Ultra moelleux</div>
                            </div>
                            <div className="stat">
                                <div className="stat-label">🎨 Personnalisables</div>
                            </div>
                            <div className="stat">
                                <div className="stat-label">🎁 Coupons surprises</div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-side">
                        <div className="side-card">
                            <h2 className="side-title">Le coin des pépites ✨</h2>
                            <p className="side-text">
                                Une boîte = un code coupon.
                                <br />
                                Et parfois… une pépite colorée te fait gagner encore plus 😄
                            </p>

                            <button className="btn btn--soft" onClick={() => navigate("/panier")}>
                                Aller au panier
                            </button>
                        </div>

                        <div className="side-card side-card--light">
                            <h3 className="side-title">Avis clients</h3>
                            <p className="side-text">
                                “J’ai pris une boîte personnalisée avec message,
                                c’était trop mims. Et les cookies… dinguerie.” 🍪
                            </p>
                            <button className="btn btn--ghost" onClick={() => navigate("/concept")}>
                                Voir le concept
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter right="Fait avec amour et un peu de chocolat 🍫" />
        </div>
    );
}

export default Home;
