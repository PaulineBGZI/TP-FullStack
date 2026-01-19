import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="page page--pastel login-page">
            {/* Décor emojis flottants */}
            <div className="floaties" aria-hidden="true">
                <span className="floaty f1">🍪</span>
                <span className="floaty f2">🍪</span>
                <span className="floaty f3">🥛</span>
                <span className="floaty f4">🍫</span>
                <span className="floaty f5">🍪</span>
                <span className="floaty f6">🧁</span>
            </div>

            {/* Header (identique aux autres pages) */}
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
                        <button className="btn btn--primary" onClick={() => navigate("/login")}>
                            Se connecter
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="login-main">
                <div className="login-card card-glass">
                    <div className="login-head">
                        <div className="login-emoji" aria-hidden="true">🍪</div>
                        <h1 className="login-title">Connexion</h1>
                        <p className="login-subtitle">Content de te revoir au Paradis ✨</p>
                    </div>

                    <form className="login-form">
                        <label>
                            Adresse email
                            <input type="email" placeholder="ex: cookie@paradis.fr" />
                        </label>

                        <label>
                            Mot de passe
                            <input type="password" placeholder="••••••••" />
                        </label>

                        <button type="submit" className="btn btn--primary btn--lg full">
                            Se connecter
                        </button>
                    </form>

                    <div className="login-footer">
                        <span>Pas encore de compte ?</span>
                        <button type="button" onClick={() => navigate("/register")}>
                            Créer un compte
                        </button>
                    </div>
                </div>
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

export default Login;
