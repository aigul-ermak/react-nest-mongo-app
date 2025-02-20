import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Register User
export const registerUser = async (data: { login: string; email: string; password: string }) => {
    return api.post("/auth/registration", data);
};

// Login User
export const loginUser = async (data: { loginOrEmail: string; password: string }) => {
    try {
        const response = await api.post("/auth/login", data);
        if (response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
        }
        return response.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Login failed. Please try again.");
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
};
