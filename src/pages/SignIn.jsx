import { useNavigate } from "react-router-dom";
import "./CSS/SignIn.css";
import { useStore } from "../useStore";
import { useState } from "react";
const SignIn = () => {
  const { users, setCurrentUser } = useStore();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === Email);
    if (!user) {
      alert("User not found");
      return;
    }
    if (user.password !== Password) {
      alert("Incorrect password");
      return;
    }
    setCurrentUser(user);
    navigate("/");
  };
  return (
    <>
      <div className="signin-container">
        <img src="logo.png" width="80px" className="logo" />
        <form className="signin-form">
          <label>Email</label>
          <input
            type="email"
            className="input-form"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />

          <div className="password">
            <label>Password</label>
            {/* <p className="forgot-password">Forgot your password?</p> */}
          </div>
          <input
            type="password"
            className="input-form"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
          />
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
          {/* <div className="remember-me-container">
            <input type="checkbox" />
            <label className="remember-me">Remember me</label>
          </div> */}
          <div className="no-account">
            <p
              style={{
                textAlign: "center",
                opacity: 0.5,
                "margin-top": "15px",
                "margin-bottom": "15px",
              }}
            >
              Don't have an account yet?
            </p>
            <p
              style={{
                textAlign: "center",
                "font-size": "18px",
                cursor: "pointer",
              }}
              onClick={handleSignUp}
            >
              Create your new account
            </p>
          </div>
        </form>
        <div className="last">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#E4E4FA"
              fill-opacity="1"
              d="M0,0L80,10.7C160,21,320,43,480,85.3C640,128,800,192,960,192C1120,192,1280,128,1360,96L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};
export default SignIn;
