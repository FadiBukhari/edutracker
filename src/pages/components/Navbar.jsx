import { Link, useNavigate } from "react-router-dom";
import "../CSS/NavBar.css";
import { useStore } from "../../useStore";

const NavBar = () => {
  const { clearUser, currentuser } = useStore();
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate("/signin");
  };
  console.log(currentuser);
  const handleHome = () => {
    navigate("/");
  };
  const logout = () => {
    clearUser();
    navigate("/");
  };
  return (
    <div className="navbar">
      <img
        src="logo.png"
        width="100px"
        className="nav-logo"
        onClick={handleHome}
      />
      <div className="navbar-links">
        {currentuser?.role == "parent" || currentuser?.role == "user" ? (
          <>
            <Link className="link" to="/track">
              Track
            </Link>
            <Link className="link" to="/academictasks">
              Tasks
            </Link>
            <Link className="link" to="/mood">
              History
            </Link>
          </>
        ) : (
          <></>
        )}

        {currentuser?.role === "user" && (
          <Link className="link" to="/timer">
            Pomodoro Timer
          </Link>
        )}
        {currentuser?.role === "admin" && (
          <>
            <Link className="link" to="/admin">
              Manage Users
            </Link>

            <Link className="link" to="/managerequests">
              Manage Requests
            </Link>
          </>
        )}

        {currentuser ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={handleSignin}>SignIn</button>
        )}
      </div>
    </div>
  );
};
export default NavBar;
