import './App.css';
import Notification from "./Notification";
import Home from "./components/Home";
import { useEffect, useState } from "react";

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
    <div className="App">
      <Notification message={message} />
      <Home />
    </div>
  );
}

export default App;
