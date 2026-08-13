import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/profile");
      } else {
        setMessage(data.detail || "Email sau parolă greșită");
      }
    } catch (error) {
      setMessage("Nu se poate realiza conexiunea cu backend-ul.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>
        <p className="subtitle">Autentifică-te pentru a continua.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Introdu parola"
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        {message && <div className="message">{message}</div>}

        <p className="bottom-text">
          Nu ai cont? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;