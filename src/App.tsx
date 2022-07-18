import { Suspense, lazy } from "react";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Buildings from "./pages/Buildings";
import News from "./pages/News";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="news" element={<News />} />
                <Route path="buildings" element={<Buildings />} />
            </Route>
        </Routes>
    );
}

export default App;
