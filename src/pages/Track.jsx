import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CSS/Track.css";
import { useStoreCategories } from "../useStore";

const Track = () => {
  const { categories } = useStoreCategories();
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const Tasks = categories
    .flatMap((category) => category.tasks)
    .filter((task) => task.status === "pending");

  // Get first day of current month
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  // Improved date comparison function
  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Check if a date has any tasks ending on it
  const hasTaskEnding = (date) => {
    return Tasks.some((task) => isSameDate(task.endDate, date));
  };

  // Get all tasks ending on a specific date
  const getTasksForDate = (date) => {
    return Tasks.filter((task) => isSameDate(task.endDate, date));
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
          <h3>
            Task Ending on {new Date(selectedTask.endDate).toLocaleDateString()}
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
  );
};

export default Track;
