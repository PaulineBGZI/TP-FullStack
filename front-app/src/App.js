import "./App.css";
import Notification from "./Notification";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Cookies from "./components/Cookies/Cookies";
import Concept from "./components/Concept/Concept";
import Panier from "./components/Panier/Panier";
import AdminCookies from "./components/Admin/AdminCookies";
import { CartProvider } from "./context/CartContext";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const internalApi = process.env.REACT_APP_API_URL;
    const browserApi = "http://localhost:5003";

    console.log("Front → API Gateway (Docker internal):", internalApi);
    console.log("Front → API Gateway (local browser):", browserApi);

    setMessage(`Connecté à l'API Gateway : ${browserApi}`);
  }, []);

  return (
      <BrowserRouter>
        <CartProvider>
          <Notification message={message} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/concept" element={<Concept />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/admin/cookies" element={<AdminCookies />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
  );
}

export default App;
