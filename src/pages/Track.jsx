import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CSS/Track.css";
import { useStore, useStoreCategories } from "../useStore";
import CompletedPendingChart from "./components/CompletedPendingChart";

const Track = () => {
  const { currentuser, users } = useStore();
  console.log(users[1]);
  const { categories } = useStoreCategories();
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const Tasks = categories
    .flatMap((category) => category.tasks)
    .filter((task) => task.status === "pending");
  const stressReliefTips = [
    "Take deep breaths for 1-2 minutes",
    "Go for a short walk outside",
    "Practice 5 minutes of meditation",
    "Listen to calming music",
    "Do some light stretching",
    "Write down your thoughts in a journal",
    "Drink a warm cup of tea",
    "Try progressive muscle relaxation",
    "Laugh - watch a funny video",
    "Spend time with a pet",
    "Visualize a peaceful place",
    "Declutter your workspace",
    "Chew gum (reduces cortisol)",
    "Squeeze a stress ball",
    "Take a short power nap",
  ];
  const badDayTips = [
    "Remember this is temporary - it will pass",
    "Be kind to yourself - you're doing your best",
    "Reach out to someone you trust",
    "Do one small thing you can control",
    "Allow yourself to feel your emotions",
    "Take a break from social media",
    "Treat yourself to something nice",
    "Focus on basic self-care: eat, hydrate, rest",
    "Write down 3 things you're grateful for",
    "Change your environment if possible",
    "Listen to uplifting music or podcasts",
    "Watch comforting nostalgic movies/shows",
    "Help someone else to shift perspective",
    "Create a cozy space for yourself",
    "Plan something to look forward to",
  ];
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
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const hasTaskEnding = (date) => {
    return Tasks.some((task) => isSameDate(task.endDate, date));
  };

  const getTasksForDate = (date) => {
    return Tasks.filter((task) => isSameDate(task.endDate, date));
  };

  const tileContent = ({ date, view }) => {
    if (view === "month" && hasTaskEnding(date)) {
      return (
        <div
          className="task-pin"
          onClick={() => setSelectedTask(getTasksForDate(date)[0])}
        >
          📌
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && hasTaskEnding(date)) {
      return "has-task";
    }
    return null;
  };

  const onActiveStartDateChange = ({ activeStartDate, action }) => {
    if (action === "prev" && activeStartDate < currentMonthStart) {
      return;
    }
    setDate(activeStartDate);
  };

  return (
    <div className="track-container">
      <div className="task-calendar-container">
        <h2>Task End Dates Calendar</h2>

        <div className="calendar-wrapper">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            tileClassName={tileClassName}
            onClickDay={(date) => {
              const tasks = getTasksForDate(date);
              if (tasks.length > 0) {
                setSelectedTask(tasks[0]);
              }
            }}
            minDate={currentMonthStart}
            onActiveStartDateChange={onActiveStartDateChange}
            prevLabel={date <= currentMonthStart ? null : "‹"}
            prev2Label={null}
          />
        </div>
        {selectedTask && (
          <div className="task-details">
            <h3>
              Task Ending on{" "}
              {new Date(selectedTask.endDate).toLocaleDateString()}
            </h3>
            <p>
              <strong>Task:</strong> {selectedTask.name}
            </p>
          </div>
        )}

        <div className="task-list">
          <h3>All Tasks</h3>

          {Tasks.length === 0 ? (
            <div>No Tasks Found</div>
          ) : (
            <ul>
              {Tasks.map((task) => (
                <li key={task.id} onClick={() => setSelectedTask(task)}>
                  {task.name} - Ends:{" "}
                  {new Date(task.endDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="info-container">
        <div className="tips-container">
          {currentuser?.role == "user" && (
            <div className="tip-container">
              <span className="tip-title">Stress tip</span>
              <p className="tip-description">
                {
                  stressReliefTips[
                    Math.floor(Math.random() * stressReliefTips.length)
                  ]
                }
              </p>
            </div>
          )}
          {currentuser?.role == "parent" && (
            <div className="tip-container">
              <span className="tip-title">Ahmad Mood's today</span>
              <p className="tip-description">
                {users[1]?.currentMood
                  ? displayEmoji(users[1].currentMood)
                  : "Not submitted yet"}
              </p>
            </div>
          )}
          <div className="tip-container">
            <span className="tip-title">Random Tips</span>
            <p className="tip-description">
              {badDayTips[Math.floor(Math.random() * badDayTips.length)]}
            </p>
          </div>
        </div>
        <CompletedPendingChart />
      </div>
    </div>
  );
};

export default Track;
