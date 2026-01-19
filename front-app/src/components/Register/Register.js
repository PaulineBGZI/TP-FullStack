import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-container">
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

      {/* Cookie Register */}
      <div className="register-cookie">
        <h2 className="register-title">Créer un compte</h2>

        <form className="register-form">
          <input type="text" placeholder="Prénom" className="register-input" />
          <input type="text" placeholder="Nom" className="register-input" />
          <input type="email" placeholder="Adresse email" className="register-input" />
          <input type="password" placeholder="Mot de passe" className="register-input" />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="register-input"
          />

          <button type="submit" className="register-submit">
            Créer mon compte
          </button>
        </form>

        <p className="register-footer">
          Déjà un compte ?<br />
          <span onClick={() => navigate("/login")}>
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
