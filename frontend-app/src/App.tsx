import './App.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import Header from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";


const App = () => {
    return (
        <AuthProvider>
            <Header/>
            <AppRoutes/>
            <Footer />
        </AuthProvider>

    );
};

export default App
