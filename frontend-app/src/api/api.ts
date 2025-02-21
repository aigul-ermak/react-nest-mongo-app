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

export const updateBlog = async (blogId, title, description) => {
    try {
        const response = await api.put(`/blogs/${blogId}`, { title, description });
        console.log("Blog updated successfully:", response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error.response?.data || error.message);
        throw error;
    }
};

export const getBlogById = async (blogId) => {
    try {
        const response = await api.get(`/blogs/${blogId}`);
        console.log("Fetched blog details:", response.data); // Debug log
        return response.data; // Ensure correct structure
    } catch (error) {
        console.error("Error fetching blog:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await api.delete(`/blogs/${blogId}`);
        console.log("Blog deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting blog:", error.response?.data || error.message);
        throw error;
    }
};

export const getPostsByBlogId = async (blogId, page = 1, pageSize = 5) => {
    try {
        const response = await api.get(`/blogs/${blogId}/posts?page=${page}&pageSize=${pageSize}`);
        console.log("Fetched posts for blog:", response.data);
        return response.data; // The posts are inside "items"
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        throw error;
    }
};







