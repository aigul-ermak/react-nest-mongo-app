
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getUser, login, logout} from "../api/api.ts";

interface User {
    userId: string;
    login: string;
    email: string;
}
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    loginUser: (loginOrEmail: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                console.error("User not logged in", error);
            }
            setIsLoading(false);
        };
        checkUser();
    }, []);

    const loginUser = async (loginOrEmail: string, password: string) => {
        try {
            const {accessToken} =
                await login(loginOrEmail, password);
            localStorage.setItem("token", accessToken);
            const userData = await getUser();
            setUser(userData);
        } catch (error) {
            throw new Error("Invalid credentials");
        }
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, isLoading, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

//export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
