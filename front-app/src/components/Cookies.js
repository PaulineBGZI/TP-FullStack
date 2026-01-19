import { useEffect, useState } from "react";

function Cookies() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5003/commands/cookies")
      .then(res => {
      if (!res.ok) throw new Error("Erreur API");
      return res.json();
    })
    .then(data => setCookies(data))
    .catch(err => console.error(err));
    console.log(cookies);
}, []);

  return (
    <div>
      <h1>🍪 Nos Cookies</h1>

      {cookies.map(cookie => (
        <div key={cookie.id}>
          <h3>{cookie.cookie_name}</h3>
          <p>Quantité : {cookie.quantity}</p> 
          <p>Créé le : {new Date(cookie.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Cookies;
