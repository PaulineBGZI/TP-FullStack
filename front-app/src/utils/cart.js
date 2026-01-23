export function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
        return [];
    }
}

function notifyCartChanged() {
    window.dispatchEvent(new Event("cart_changed"));
}

export function setCart(payload) {
    localStorage.setItem("cart", JSON.stringify(payload));
    notifyCartChanged();
}

export function clearCart() {
    localStorage.removeItem("cart");
    notifyCartChanged();
}
