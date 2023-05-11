import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch("https://reqres.in/api/users?page=1");
    const data = await response.json();
    console.log(data);
    setUsers(data.data);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (showUsers) {
      getUsers();
    }
  }, [showUsers]);

  return (
    <>
      <div>
        <nav className="navbar">
          <h1>Brand Name</h1>
          <button onClick={() => setShowUsers(true)}>Get Users</button>
        </nav>
      </div>

      <div className="user-card-container">
        {showUsers &&
          (loading ? (
            <p className="loader"><PulseLoader/></p>
          ) : (
            <ul className="user-card-list">
              {users.map((user) => (
                <li className="user-card" key={user.id}>
                  <img
                    className="user-card-image"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="user-card-details">
                    <h2 className="user-card-name">{user.name}</h2>
                    <p className="user-card-email">{user.email}</p>
                    <Link to={`/users/${user.id}`} className="user-card-link">
                      View Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </>
  );
}

export default App;
