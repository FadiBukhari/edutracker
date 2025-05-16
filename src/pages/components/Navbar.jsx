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
        {currentuser ? (
          <>
            <Link className="link" to="/track">
              Track
            </Link>
            <Link className="link" to="/academictasks">
              Academic Tasks
            </Link>
          </>
        ) : (
          <></>
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
