import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    return (
        <div className="page page--pastel register-page">
            {/* Floaties */}
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
            <main className="register-main">
                <div className="register-card card-glass">
                    <div className="register-head">
                        <div className="register-emoji" aria-hidden="true">🍪</div>
                        <h1 className="register-title">Créer un compte</h1>
                        <p className="register-subtitle">Rejoins le Paradis et débloque tes pépites ✨</p>
                    </div>

                    <form className="register-form">
                        <div className="register-row">
                            <label>
                                Prénom
                                <input type="text" placeholder="Ex : Léa" />
                            </label>

                            <label>
                                Nom
                                <input type="text" placeholder="Ex : Martin" />
                            </label>
                        </div>

                        <label>
                            Adresse email
                            <input type="email" placeholder="ex: cookie@paradis.fr" />
                        </label>

                        <label>
                            Mot de passe
                            <input type="password" placeholder="••••••••" />
                        </label>

                        <label>
                            Confirmer le mot de passe
                            <input type="password" placeholder="••••••••" />
                        </label>

                        <button type="submit" className="btn btn--primary btn--lg full">
                            Créer mon compte
                        </button>
                    </form>

                    <div className="register-footer">
                        <span>Déjà un compte ?</span>
                        <button type="button" onClick={() => navigate("/login")}>
                            Se connecter
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

export default Register;
