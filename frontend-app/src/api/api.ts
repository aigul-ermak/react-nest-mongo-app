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

// registerUser
export const registerUser = async (data: { username: string; email: string; password: string }) => {
    return api.post("/auth/registration", data);
};

export const loginUser = async (data: { loginOrEmail: string; password: string }) => {
    try {
        const response = await api.post("/auth/login", data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};
