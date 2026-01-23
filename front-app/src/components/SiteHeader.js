import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../auth/auth";

export default function SiteHeader({ showAdminLink = true }) {
    const navigate = useNavigate();
    const [auth, setAuthState] = useState(() => getAuth());

    useEffect(() => {
        const sync = () => setAuthState(getAuth());

        // Sync si localStorage change (autre onglet)
        window.addEventListener("storage", sync);
        // Sync dans le même onglet (setAuth/clearAuth déclenche auth_changed)
        window.addEventListener("auth_changed", sync);

        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("auth_changed", sync);
        };
    }, []);

    const isAdmin = !!auth?.isAdmin;

    function logout() {
        clearAuth();
        navigate("/login");
    }

    return (
        <header className="site-header">
            <div className="header-inner">
                <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-dot" aria-hidden="true">
            🍪
          </span>
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

                    {showAdminLink && isAdmin && (
                        <button className="nav-link" onClick={() => navigate("/admin/cookies")}>
                            Admin
                        </button>
                    )}
                </nav>

                <div className="header-actions">
                    {auth ? (
                        <>
                            {isAdmin && (
                                <span style={{ fontWeight: 850, color: "rgba(60, 43, 28, 0.78)" }}>
                  Admin : <strong>{auth.username}</strong>
                </span>
                            )}

                            <button className="btn btn--ghost" onClick={logout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <button className="btn btn--primary" onClick={() => navigate("/login")}>
                            Se connecter
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
