const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5003";

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : await res.text().catch(() => null);

    if (!res.ok) {
        const msg =
            (data && data.message) ||
            (typeof data === "string" ? data : "Erreur API");
        throw new Error(msg);
    }

    return data;
}

export const CookiesAPI = {
    list: () => request("/commands/cookies"),
    create: (payload) =>
        request("/commands/cookies", { method: "POST", body: JSON.stringify(payload) }),
    update: (id, payload) =>
        request(`/commands/cookies/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    remove: (id) =>
        request(`/commands/cookies/${id}`, { method: "DELETE" }),
};

export const BoxesAPI = {
    list: () => request("/commands/boxes"),
};

export const OrdersAPI = {
    create: (payload) =>
        request("/commands/orders", { method: "POST", body: JSON.stringify(payload) }),
};
