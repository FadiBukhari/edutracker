// MoodHistory.jsx
import "./CSS/MoodHistory.css";

const moodData = [
  { date: "2025-05-31", mood: "😊", label: "Happy" },
  { date: "2025-05-30", mood: "😐", label: "Neutral" },
  { date: "2025-05-29", mood: "😢", label: "Sad" },
  { date: "2025-05-28", mood: "😤", label: "Frustrated" },
  { date: "2025-05-27", mood: "😁", label: "Excited" },
  { date: "2025-05-26", mood: "😴", label: "Tired" },
  { date: "2025-05-25", mood: "🙂", label: "Content" },
];

const MoodHistory = () => {
  return (
    <div className="mood-history-container">
      <h1 className="title">Mood History (Last 7 Days)</h1>
      <div className="mood-list">
        {moodData.map((entry, index) => (
          <div className="mood-card" key={index}>
            <div className="mood-emoji">{entry.mood}</div>
            <div className="mood-details">
              <div className="mood-label">{entry.label}</div>
              <div className="mood-date">{entry.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory;
