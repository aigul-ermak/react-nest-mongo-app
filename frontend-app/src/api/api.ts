import axios from "axios";

//const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://react-nest-mongo-app.onrender.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (config.url?.includes("/auth/me") && refreshToken) {
        // Use refreshToken for /auth/me endpoint
        config.headers.Authorization = `Bearer ${refreshToken}`;
    } else if (accessToken) {
        // Use accessToken for all other endpoints
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export const getUsersById = async (id: string) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {

        throw error;
    }
};


// RegisterPage new user
export const register = async (userData: { login: string; email: string; password: string }) => {
    const response = await api.post("/auth/registration", userData);
    return response.status;
};

export const login = async (loginOrEmail: string, password: string) => {
    const response = await api.post("/auth/login", {loginOrEmail, password});
    return response.data;
};

// Get current user
export const getUser = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await api.get("/auth/me", {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
                Accept: "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }

};

// Logout user and clear session
export const logout = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
            await api.post("/auth/logout", {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
        }
    } catch (error) {
        console.error("Failed to logout:", error);
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
};

export const getBlogs = async (page: number = 1, limit: number = 5) => {
    const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
    return response.data;
};

export const createBlog = async (title: string, description: string) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await api.post("/blogs", {title, description}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Failed to create blog blog:", error);
        throw error;
    }
};

export const updateBlog = async (blogId: string | undefined, title: string, description: string) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await api.put(`/blogs/${blogId}`, {title, description}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        return response.data;

    } catch (error) {
        console.error("Failed to update blog:", error);
        throw error;
    }
};

export const getBlogById = async (blogId: string | undefined) => {
    try {
        const response = await api.get(`/blogs/${blogId}`);

        return response.data; // Ensure correct structure
    } catch (error) {

        throw error;
    }
};

export const deleteBlog = async (blogId: string) => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await api.delete(`/blogs/${blogId}`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        return response.data;

    } catch (error) {

        throw error;
    }
};

export const getPostsByBlogId = async (blogId: string, page: number = 1, pageSize: number = 5) => {
    try {
        const response = await api.get(`/blogs/${blogId}/posts?page=${page}&pageSize=${pageSize}`);

        return response.data;
    } catch (error) {

        throw error;
    }
};

export const createPost = async (blogId: string, postData: any) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }
        const response = await api.post(`/blogs/${blogId}/posts`, postData, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        return response.data;

    } catch (error) {

        throw error;
    }
};


export const getPostById = async (postId: string | undefined) => {
    try {
        const response = await api.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {

        throw error;
    }
};


export const updatePostById = async (id: string | undefined, updatedPost: any) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await api.put(`/posts/${id}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        return response.data;
    } catch (error) {

        throw error;
    }
};

export const deletePostById = async (postId: string) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const response = await api.delete(`/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        return response.data;

    } catch (error) {

        throw error;
    }
};









