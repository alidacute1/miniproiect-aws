import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
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
        setMessage("Cont creat cu succes!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.detail || "Eroare la înregistrare");
      }
    } catch (error) {
      setMessage("Nu se poate realiza conexiunea cu backend-ul.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Register</h1>
        <p className="subtitle">Creează un cont nou.</p>

        <form onSubmit={handleRegister}>
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
              placeholder="Alege o parolă"
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Register
          </button>
        </form>

        {message && <div className="message">{message}</div>}

        <p className="bottom-text">
          Ai deja cont? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
