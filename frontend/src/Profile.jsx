import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        setMessage("Nu se poate realiza conexiunea cu backend-ul.");
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Profil</h1>
        <p className="subtitle">Datele utilizatorului autentificat.</p>

        {message && <div className="message">{message}</div>}

        {user && (
          <>
            <div className="profile-row">
              <span>ID</span>
              <span>{user.id}</span>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <span>{user.email}</span>
            </div>

            <div className="profile-row">
              <span>First name</span>
              <span>{user.first_name || "-"}</span>
            </div>

            <div className="profile-row">
              <span>Last name</span>
              <span>{user.last_name || "-"}</span>
            </div>

            <div className="profile-row">
              <span>Created at</span>
              <span>{user.created_at}</span>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;