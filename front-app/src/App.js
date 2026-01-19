import './App.css';
import Notification from "./Notification";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import CookiesPage from "./components/Cookies/CookiesPage";
import AdminCookies from "./components/Admin/AdminCookies";
import Concept from "./components/Concept/Concept";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const internalApi = process.env.REACT_APP_API_URL;
    const browserApi = "http://localhost:5000";

    console.log("Front → API Gateway (Docker internal):", internalApi);
    console.log("Front → API Gateway (local browser):", browserApi);

    setMessage(`Connecté à l'API Gateway : ${browserApi}`);
  }, []);

  return (
      <BrowserRouter>
        <Notification message={message} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/admin/cookies" element={<AdminCookies />} />
          <Route path="/concept" element={<Concept />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
