import * as React from 'react';
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
        // <AuthProvider>
        //     <Router>
        //         <Box display="flex" flexDirection="column" minHeight="100vh">
        //             <Header1/>
        //             <Box flexGrow={1}>
        //                 <Routes> {}
        //                     <Route path="/" element={<Home/>}/>
        //                     <Route path="/login" element={<Login/>}/>
        //                     <Route path="/register" element={<RegisterPage/>}/>
        //                     <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        //                 </Routes>
        //             </Box>
        //             <Footer/>
        //         </Box>
        //     </Router>
        // </AuthProvider>
    );
};

export default App
