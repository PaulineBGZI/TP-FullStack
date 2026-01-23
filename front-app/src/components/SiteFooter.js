export default function SiteFooter({ right = "Fait avec amour et un peu de chocolat 🍫" }) {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <span>© {new Date().getFullYear()} Le Paradis des Cookies</span>
                <span className="footer-sep">•</span>
                <span>{right}</span>
            </div>
        </footer>
    );
}
