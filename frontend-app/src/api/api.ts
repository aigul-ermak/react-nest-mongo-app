import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const login = async (loginOrEmail: string, password: string) => {
    const response = await api.post("/auth/login", {loginOrEmail, password});
    return response.data;
};

// RegisterPage new user
export const register = async (userData: { login: string; email: string; password: string }) => {
    const response = await api.post("/auth/registration", userData);
    return response.status;
};

// Get current user
export const getUser = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Logout user and clear session
export const logout = async () => {
    await api.post("/auth/logout");
};

export const getBlogs = async (page = 1, limit = 5) => {
    const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
    return response.data;
};

export const createBlog = async (title, description) => {
    const response = await api.post("/blogs", { title, description });
    return response.data;
};


