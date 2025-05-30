import React, { useState, useEffect, useRef } from "react";
import "./CSS/PomodoroTimer.css"; // Assuming you have some styles for the timer
const PomodoroTimer = () => {
  const WORK_DURATION = 25 * 60; // 25 minutes
  const BREAK_DURATION = 5 * 60; // 5 minutes

  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);

            setIsWorkSession(!isWorkSession);
            setSecondsLeft(isWorkSession ? BREAK_DURATION : WORK_DURATION);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, isWorkSession]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const secsStr = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${secsStr}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSecondsLeft(isWorkSession ? WORK_DURATION : BREAK_DURATION);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
      className="pomodoro-timer"
    >
      <h1>Pomodoro Timer</h1>
      <h2>{isWorkSession ? "Work Time" : "Break Time"}</h2>
      <h1 style={{ fontSize: "4rem" }}>{formatTime(secondsLeft)}</h1>
      <div style={{ marginTop: "1rem" }}>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={pauseTimer}>Pause</button>
        )}
        <button onClick={resetTimer} style={{ marginLeft: "1rem" }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
