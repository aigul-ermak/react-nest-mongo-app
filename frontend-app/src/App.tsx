import './App.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import Header from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {Box} from "@mui/material";


const App = () => {
    return (
        <AuthProvider>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                {/* Footer at the Top */}
                <Footer />

                {/* Header */}
                <Header />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <AppRoutes />
                </Box>
            </Box>
        </AuthProvider>

    );
};

export default App
