export function getAuth() {
    try {
        return JSON.parse(localStorage.getItem("auth") || "null");
    } catch {
        return null;
    }
}

function notifyAuthChanged() {
    // Pour mettre à jour le header dans le même onglet
    window.dispatchEvent(new Event("auth_changed"));
}

export function setAuth(payload) {
    localStorage.setItem("auth", JSON.stringify(payload));
    notifyAuthChanged();
}

export function clearAuth() {
    localStorage.removeItem("auth");
    notifyAuthChanged();
}
