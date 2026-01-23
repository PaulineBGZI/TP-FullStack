import "./Register.css";
import { useNavigate } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Floaties from "../../components/Floaties";

function Register() {
    const navigate = useNavigate();

    return (
        <div className="page page--pastel register-page">
            <Floaties items={["🍪", "🍪", "🥛", "🍫", "🍪", "🧁"]} />

            <SiteHeader />

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

            <SiteFooter right="Fait avec amour et un peu de chocolat 🍫" />
        </div>
    );
}

export default Register;
