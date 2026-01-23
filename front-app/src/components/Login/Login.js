import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../auth/auth";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const login = email.trim();
        const pwd = password;

        if (!login || !pwd) {
            setError("Renseigne un identifiant et un mot de passe.");
            return;
        }

        const isAdmin = login === "admin" && pwd === "admin";

        setAuth({ username: login, isAdmin });
        navigate(isAdmin ? "/admin/cookies" : "/cookies");
    }

    return (
        <div className="page page--pastel login-page">
            <Floaties items={["🍪", "🍪", "🥛", "🍫", "🍪", "🧁"]} />

            <SiteHeader />

            <main className="login-main">
                <div className="login-card card-glass">
                    <div className="login-head">
                        <div className="login-emoji" aria-hidden="true">🍪</div>
                        <h1 className="login-title">Connexion</h1>
                        <p className="login-subtitle">Content de te revoir au Paradis ✨</p>
                    </div>

                    {error && (
                        <div className="fetch-error" style={{ marginBottom: 12 }}>
                            <span className="fetch-icon">⚠️</span>
                            <div className="fetch-text">
                                <strong>Connexion impossible</strong>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>
                            Adresse email (ou admin)
                            <input
                                type="text"
                                placeholder="ex: cookie@paradis.fr ou admin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label>
                            Mot de passe
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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

            <SiteFooter right="Fait avec amour et un peu de chocolat 🍫" />
        </div>
    );
}

export default Login;
