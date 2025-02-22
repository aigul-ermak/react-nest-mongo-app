import axios from "axios";

//const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://react-nest-mongo-app.onrender.com";

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
    console.log(loginOrEmail, password);
    const response = await api.post("/auth/login", {loginOrEmail, password});
    console.log("login",response.data)
    return response.data;
};

// RegisterPage new user
export const register = async (userData: { login: string; email: string; password: string }) => {
    const response = await api.post("/auth/registration", userData);
    return response.status;
};

// Get current user
export const getUser = async () => {
    //const token = localStorage.getItem("token");
    //console.log(localStorage.getItem("token"));

    const response = await api.get("/auth/me", {
            withCredentials: true, // ✅ Sends cookies automatically
            headers: {
                "Accept": "application/json",
            },
        });
    console.log("getUser", response.data)
        return response.data;

    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         Accept: "application/json",
    //     },
    // });
    // return response.data;
};

// Logout user and clear session
export const logout = async () => {
    await api.post("/auth/logout");
};

export const getBlogs = async (page: number = 1, limit: number = 5) => {
    const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
    return response.data;
};

export const createBlog = async (title: string, description: string) => {
    const response = await api.post("/blogs", {title, description});
    return response.data;
};

export const updateBlog = async (blogId: string |undefined, title: string, description: string) => {
    try {
        const response = await api.put(`/blogs/${blogId}`, {title, description});

        return response.data;
    } catch (error) {

        throw error;
    }
};

export const getBlogById = async (blogId: string |undefined) => {
    try {
        const response = await api.get(`/blogs/${blogId}`);

        return response.data; // Ensure correct structure
    } catch (error) {

        throw error;
    }
};

export const deleteBlog = async (blogId: string) => {
    try {
        const response = await api.delete(`/blogs/${blogId}`);

        return response.data;
    } catch (error) {

        throw error;
    }
};

export const getPostsByBlogId = async (blogId: string, page: number = 1, pageSize: number = 5) => {
    try {
        const response = await api.get(`/blogs/${blogId}/posts?page=${page}&pageSize=${pageSize}`);

        return response.data; // The posts are inside "items"
    } catch (error) {

        throw error;
    }
};

export const createPost = async (blogId: string, postData: any) => {
    try {
        const response = await api.post(`/blogs/${blogId}/posts`, postData, {
            headers: {"Content-Type": "application/json"},
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
        const response = await api.put(`/posts/${id}`, updatedPost, {
            headers: {"Content-Type": "application/json"},
        });
        return response.data;
    } catch (error) {

        throw error;
    }
};

export const deletePostById = async (postId: string) => {
    try {
        const response = await api.delete(`/posts/${postId}`);

        return response.data;
    } catch (error) {

        throw error;
    }
};









