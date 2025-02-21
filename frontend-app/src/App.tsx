import './App.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import Header from "./components/Header.tsx";


const App = () => {
    return (
        <AuthProvider>
            <Header/>
            <AppRoutes/>
        </AuthProvider>

    );
};

export default App
