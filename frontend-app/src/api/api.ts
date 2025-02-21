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


// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// api.interceptors.response.use(
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//localStorage.removeItem("token");
//window.location.href = "/login"; // Redirect on logout
//         }
//         return Promise.reject(error);
//     }
// );


//
//
// // RegisterPage User
// export const registerUser = async (data: { login: string; email: string; password: string }) => {
//     return api.post("/auth/registration", data);
// };
//
// // Login User
// export const loginUser = async (data: { loginOrEmail: string; password: string }) => {
//     try {
//         const response = await api.post("/auth/login", data);
//         if (response.data.accessToken) {
//             localStorage.setItem("token", response.data.accessToken);
//         }
//         return response.data;
//     } catch (error: any) {
//         if (error.response?.data?.message) {
//             throw new Error(error.response.data.message);
//         }
//         throw new Error("Login failed. Please try again.");
//     }
// };
//
// // Logout User
// export const logoutUser = async () => {
//     try {
//         await api.post("/auth/logout");
//     } catch (error) {
//         console.error("Logout failed:", error);
//     } finally {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//     }
// };
//
//
// // Auth Me
// export const getAuthenticatedUser = async () => {
//     try {
//         const token = localStorage.getItem("token");
//
//         if (!token) {
//             throw new Error("No authentication token found.");
//         }
//
//         const response = await api.get("/auth/me", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         return response.data;
//     } catch (error: any) {
//         console.error("Failed to fetch user data:", error);
//
//
//         if (error.response?.status === 401) {
//             localStorage.removeItem("token");
//             window.location.href = "/login";
//         }
//
//         throw error.response?.data || "Failed to fetch user data.";
//     }
// };
//
//
//
