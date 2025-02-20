import React, {createContext, useContext, useEffect, useState} from "react";
import {authService} from "../api/api.ts";


interface User {
    login: string;
    email: string;
    userId: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const initializeAuth = async () => {
            if (token) {
                try {
                    const userData = await authService.getAuthUser();
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, [token]);

    const refreshUser = async () => {
        try {
            const userData = await authService.getAuthUser();
            setUser(userData);
        } catch (error) {
            console.error("Error refreshing user:", error);
            setUser(null);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, refreshUser, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
