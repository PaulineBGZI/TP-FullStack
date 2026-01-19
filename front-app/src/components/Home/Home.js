import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Bouton connexion */}
      <button
        className="login-button"
        onClick={() => navigate("/login")}
      >
        Se connecter
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

      {/* Cookie principal */}
      <div className="cookie">
        <h1 className="cookie-title">
          Le Paradis<br />des Cookies
        </h1>

        <p className="cookie-subtitle">
          Des cookies moelleux, personnalisés<br />
          et des surprises à chaque bouchée 🍪
        </p>

        <div className="chips">
          <div className="chip chip-2">Vos avis</div>
          <div className="chip chip-3" onClick={() => navigate("/concept")}>Le<br />concept</div>
          <div className="chip chip-1" onClick={() => navigate("/cookies")}>Nos<br />cookies</div>
          <div className="chip chip-4">Panier</div>

        </div>
      </div>
    </div>
  );
}

export default Home;
