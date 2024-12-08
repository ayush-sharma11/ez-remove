import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import ScrollToTopOnMount from "./ScrollToTopOnMount";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Policy from "./Pages/Policy";

function App() {
    return (
        <>
            <Router>
                <ScrollToTopOnMount />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/policy" element={<Policy />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
