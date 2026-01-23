const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5003";

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}/commands${path}`, {
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
    console.log("données de l'api: ",data);
    return data;
}

export const CookiesAPI = {
    list: () => request("/cookies"),
    create: (payload) => request("/cookies", { method: "POST", body: JSON.stringify(payload) }),
    update: (id, payload) => request(`/cookies/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    remove: (id) => request(`/cookies/${id}`, { method: "DELETE" }),
};

export const BoxesAPI = {
    list: () => request("/boxes"),
};

export const OrdersAPI = {
    create: (payload) => request("/orders", { method: "POST", body: JSON.stringify(payload) }),
};
