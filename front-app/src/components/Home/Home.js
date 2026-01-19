import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="page page--pastel">
            {/* Décor emojis cookies flottants */}
            <div className="floaties" aria-hidden="true">
                <span className="floaty f1">🍪</span>
                <span className="floaty f2">🍪</span>
                <span className="floaty f3">🧁</span>
                <span className="floaty f4">🍪</span>
                <span className="floaty f5">🍫</span>
                <span className="floaty f6">🍪</span>
                <span className="floaty f7">🥛</span>
                <span className="floaty f8">🍪</span>
            </div>

            {/* Header */}
            <header className="site-header">
                <div className="header-inner">
                    <button className="brand" onClick={() => navigate("/")}>
                        <span className="brand-dot" aria-hidden="true">🍪</span>
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
                        <button
                            className="btn btn--primary"
                            onClick={() => navigate("/login")}
                        >
                            Se connecter
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenu */}
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
                            <button
                                className="btn btn--primary btn--lg"
                                onClick={() => navigate("/cookies")}
                            >
                                Découvrir nos cookies
                            </button>

                            <button
                                className="btn btn--ghost btn--lg"
                                onClick={() => navigate("/concept")}
                            >
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

            <footer className="site-footer">
                <div className="footer-inner">
                    <span>© {new Date().getFullYear()} Le Paradis des Cookies</span>
                    <span className="footer-sep">•</span>
                    <span>Fait avec amour et un peu de chocolat 🍫</span>
                </div>
            </footer>
        </div>
    );
}

export default Home;
