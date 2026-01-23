import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { clearAuth, getAuth } from "../auth/auth";

export default function SiteHeader({ showAdminLink = true }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuthState] = useState(() => getAuth());
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const sync = () => setAuthState(getAuth());
        window.addEventListener("storage", sync);
        window.addEventListener("auth_changed", sync);
        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("auth_changed", sync);
        };
    }, []);

    // Ferme le menu quand on change de route
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const isAdmin = !!auth?.isAdmin;

    function logout() {
        clearAuth();
        navigate("/login");
    }

    function go(path) {
        navigate(path);
        setMobileOpen(false);
    }

    return (
        <header className="site-header">
            <div className="header-inner">
                <button className="brand" onClick={() => go("/")}>
                    <span className="brand-dot" aria-hidden="true">🍪</span>
                    <span className="brand-text">Le Paradis des Cookies</span>
                </button>

                {/* Desktop nav */}
                <nav className="nav">
                    <button className="nav-link" onClick={() => go("/concept")}>Concept</button>
                    <button className="nav-link" onClick={() => go("/cookies")}>Nos cookies</button>
                    <button className="nav-link" onClick={() => go("/panier")}>Panier</button>
                    {showAdminLink && isAdmin && (
                        <button className="nav-link" onClick={() => go("/admin/cookies")}>Admin</button>
                    )}
                </nav>

                <div className="header-actions">
                    {/* Bouton burger (visible en mobile via CSS) */}
                    <button
                        className="btn btn--ghost header-burger"
                        type="button"
                        aria-label="Ouvrir le menu"
                        aria-expanded={mobileOpen ? "true" : "false"}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        ☰
                    </button>

                    {auth ? (
                        <>
                            {isAdmin && (
                                <span className="header-admin-badge">
                  Admin : <strong>{auth.username}</strong>
                </span>
                            )}
                            <button className="btn btn--ghost header-auth-btn" onClick={logout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <button className="btn btn--primary header-auth-btn" onClick={() => go("/login")}>
                            Se connecter
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu overlay */}
            {mobileOpen && (
                <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
                    <button
                        className="mobile-menu-backdrop"
                        aria-label="Fermer le menu"
                        onClick={() => setMobileOpen(false)}
                        type="button"
                    />

                    <div className="mobile-menu card-glass">
                        <div className="mobile-menu-head">
                            <div className="mobile-menu-title">Menu</div>
                            <button
                                className="btn btn--ghost"
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Fermer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mobile-menu-links">
                            <button className="nav-link mobile-link" onClick={() => go("/concept")}>Concept</button>
                            <button className="nav-link mobile-link" onClick={() => go("/cookies")}>Nos cookies</button>
                            <button className="nav-link mobile-link" onClick={() => go("/panier")}>Panier</button>

                            {showAdminLink && isAdmin && (
                                <button className="nav-link mobile-link" onClick={() => go("/admin/cookies")}>
                                    Admin
                                </button>
                            )}
                        </div>

                        <div className="mobile-menu-actions">
                            {auth ? (
                                <button className="btn btn--ghost btn--lg full" onClick={logout} type="button">
                                    Déconnexion
                                </button>
                            ) : (
                                <button className="btn btn--primary btn--lg full" onClick={() => go("/login")} type="button">
                                    Se connecter
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
