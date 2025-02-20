import * as React from 'react';
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header.tsx";
import {Home} from "./components/Home.tsx";
import {Box} from "@mui/material";
import {Register} from "./context/Register.tsx";
import {Footer} from "./components/Footer.tsx";
import {Login} from "./components/Login.tsx";



const App = () => {
    return (
        <Router>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Header />
                <Box flexGrow={1}>
                    <Routes> {}
                        <Route path="/" element={<Home />} />
                        {/*<Route path="/login" element={<Login />} />*/}
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </Router>
    );
};

export default App
