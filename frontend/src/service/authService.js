const BASE_URL = "http://localhost:8080";

export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log("RESPONSE:", data);

    if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
    }

    return data;
};

export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
    }

    return response.text();
};