import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      {/* Bouton retour accueil */}
      <button
        className="back-home-button"
        onClick={() => navigate("/")}
      >
        Accueil
      </button>

      {/* Décor cookies flottants */}
      <div className="background-cookies">
        <span className="bg-cookie c1"></span>
        <span className="bg-cookie c2"></span>
        <span className="bg-cookie c3"></span>
        <span className="bg-cookie c4"></span>
      </div>

      {/* Cookie Login */}
      <div className="login-cookie">
        <h2 className="login-title">Connexion</h2>

        <form className="login-form">
          <input
            type="email"
            placeholder="Adresse email"
            className="login-input"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="login-input"
          />

          <button type="submit" className="login-submit">
            Se connecter
          </button>
        </form>

        <p className="login-footer">
          Pas encore de compte ?<br />
          <span onClick={() => navigate("/register")}>
            Créer un compte
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
