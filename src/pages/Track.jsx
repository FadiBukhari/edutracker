import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CSS/Track.css";

// Sample tasks array with end dates
const sampleTasks = [
  { id: 1, name: "Project Proposal", endDate: new Date(2025, 4, 15) },
  { id: 2, name: "Client Meeting", endDate: new Date(2025, 4, 18) },
  { id: 3, name: "Code Review", endDate: new Date(2025, 4, 20) },
  { id: 4, name: "Deployment", endDate: new Date(2025, 4, 25) },
  { id: 5, name: "Team Retrospective", endDate: new Date(2025, 4, 30) },
];

const Track = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);

  // Get first day of current month
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  // Check if a date has any tasks ending on it
  const hasTaskEnding = (date) => {
    return sampleTasks.some(
      (task) => task.endDate.toDateString() === date.toDateString()
    );
  };

  // Get all tasks ending on a specific date
  const getTasksForDate = (date) => {
    return sampleTasks.filter(
      (task) => task.endDate.toDateString() === date.toDateString()
    );
  };

  // Custom tile content for the calendar
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

  // Highlight dates with task endings
  const tileClassName = ({ date, view }) => {
    if (view === "month" && hasTaskEnding(date)) {
      return "has-task";
    }
    return null;
  };

  // Disable navigation to previous months
  const onActiveStartDateChange = ({ activeStartDate, action }) => {
    if (action === "prev" && activeStartDate < currentMonthStart) {
      return; // Block navigation to past months
    }
    setDate(activeStartDate);
  };

  return (
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
          <h3>Task Ending on {selectedTask.endDate.toLocaleDateString()}</h3>
          <p>
            <strong>Task:</strong> {selectedTask.name}
          </p>
        </div>
      )}

      <div className="task-list">
        <h3>All Tasks</h3>
        <ul>
          {sampleTasks.map((task) => (
            <li key={task.id} onClick={() => setSelectedTask(task)}>
              {task.name} - Ends: {task.endDate.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Track;
