import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const getJobs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/job-status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      } else {
        setMessage("Nu s-au putut încărca rulările job-ului.");
      }
    } catch (error) {
      setMessage("Nu se poate realiza conexiunea cu backend-ul.");
    }
  };


  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
          getJobs();
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

             <div className="job-section">
              <div className="job-header">
                <h2>Job Status</h2>

                <button
                  className="refresh-button"
                  onClick={getJobs}
                >
                  Refresh
                </button>
              </div>

              {jobs.length === 0 ? (
                <p className="subtitle">
                  Nu există rulări disponibile.
                </p>
              ) : (
                <div className="job-list">
                  {jobs.slice(0, 5).map((job) => (
                    <div className="job-item" key={job.id}>
                      <div>
                        <strong>Job #{job.id}</strong>
                        <p>{job.message}</p>
                      </div>

                      <div className="job-info">
                        <span className={`job-status ${job.status}`}>
                          {job.status}
                        </span>

                        <span>
                          {new Date(`${job.started_at}Z`).toLocaleString("ro-RO")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
