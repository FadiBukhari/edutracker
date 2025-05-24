import "./CSS/Home.css";
import { Link } from "react-router";
import { useStore } from "../useStore";

const Home = () => {
  const { currentuser, setMood, updateUser } = useStore();
  const handleMoodChange = (mood) => {
    setMood(mood);
    updateUser(currentuser);
  };

  console.log(currentuser);
  const displayEmoji = (mood) => {
    switch (mood) {
      case "very_sad":
        return "😞";
      case "neutral":
        return "😟";
      case "okay":
        return "😑";
      case "happy":
        return "🙂";
      case "excited":
        return "😁";
      default:
        return "";
    }
  };
  return (
    <section className="home-container">
      <div className="home-content">
        <h1 className="home-header">
          {currentuser?.role == "user" || currentuser?.role == "parent" ? (
            <span>
              Welcome {currentuser?.role == "user" ? "Student" : "Parent"}
            </span>
          ) : (
            <span className="header-highlight">EduTracker</span>
          )}
        </h1>
        <p className="home-description">
          We build performant, accessible, and beautiful web applications
          tailored to your business needs. Our solutions help you stand out in
          the digital landscape.
        </p>

        <div className="button-group">
          <Link className="cta-button primary" to="/signin">
            Get Started
          </Link>
        </div>
        {currentuser?.role == "user" && (
          <div className="mood-selector">
            <span className="mood-label">How are you feeling today?</span>

            <div className="emoji-selection">
              {currentuser?.currentMood ? (
                displayEmoji(currentuser.currentMood)
              ) : (
                <>
                  <button
                    className="mood-button"
                    onClick={() => handleMoodChange("very_sad")}
                  >
                    😞
                  </button>
                  <button
                    className="mood-button"
                    onClick={() => handleMoodChange("neutral")}
                  >
                    😟
                  </button>
                  <button
                    className="mood-button"
                    onClick={() => handleMoodChange("okay")}
                  >
                    😑
                  </button>
                  <button
                    className="mood-button"
                    onClick={() => handleMoodChange("happy")}
                  >
                    🙂
                  </button>
                  <button
                    className="mood-button"
                    onClick={() => handleMoodChange("excited")}
                  >
                    😁
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="home-image-container">
        <img
          src="small1.avif"
          alt="Modern web application interface"
          className="home-image"
          loading="lazy"
        />
        <div className="image-overlay"></div>
      </div>
    </section>
  );
};

export default Home;
