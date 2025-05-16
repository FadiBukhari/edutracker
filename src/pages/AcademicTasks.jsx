import { useState } from "react";
import { format, parseISO } from "date-fns";
import "./CSS/AcademicTasks.css"; // Assuming you have a CSS file for styling
import { useStore, useStoreCategories } from "../useStore";
const AcademicTasks = () => {
  // State for categories and tasks
  const {
    categories,
    addCategory,
    addTask,
    deleteTask,
    deleteCategory,
    toggleTaskCompletion,
  } = useStoreCategories();
  const { currentuser } = useStore();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    type: "assignment",
    endDate: format(new Date(), "yyyy-MM-dd"),
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'pending'

  // Add new category
  const addCategoryTrim = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        tasks: [],
      };
      addCategory(newCategory);
      setNewCategoryName("");
    }
  };
  console.log(categories[0]?.tasks);
  // Add new task
  const addTaskTrim = () => {
    if (newTask.name.trim()) {
      const task = {
        id: Date.now().toString(),
        name: newTask.name.trim(),
        type: newTask.type,
        endDate: newTask.endDate,
        status: "pending",
      };
      addTask(activeCategory, task);
      setNewTask({
        ...newTask,
        name: "",
      });
    }
  };
  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    }
  };
  // Filter tasks based on completion status
  const filteredTasks = (tasks) => {
    if (!tasks) return [];
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.status === "completed");
      case "pending":
        return tasks.filter((task) => task.status === "pending");
      default:
        return tasks;
    }
  };
  const category = categories.find(
    (category) => activeCategory === category.id
  );
  return (
    <>
      {currentuser?.role === "parent" ? (
        <div className="academic-task-viewer">
          <h2>Academic Task Viewer</h2>

          {/* Category Management */}
          <div className="category-section">
            <h3>Categories</h3>

            <div className="category-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-item ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Management */}

          {activeCategory && (
            <div className="task-section">
              <h3>Tasks</h3>

              <div className="task-controls">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="task-list">
                <div key={category.id} className="category-tasks">
                  <h4>{category.name}</h4>
                  {filteredTasks(category.tasks)?.length > 0 ? (
                    <ul>
                      {filteredTasks(category.tasks).map((task) => (
                        <li
                          key={task.id}
                          className={
                            task.status === "completed"
                              ? "completed"
                              : "pending"
                          }
                        >
                          <div className="task-info">
                            <span className="task-name">{task.name}</span>
                            <span className="task-type">{task.type}</span>
                            <span className="task-endDate">
                              Due:{" "}
                              {format(parseISO(task.endDate), "MMM dd, yyyy")}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No tasks in this category</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="academic-task-manager">
          <h2>Academic Task Manager</h2>

          {/* Category Management */}
          <div className="category-section">
            <h3>Categories</h3>
            <div className="add-category">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
              />
              <button onClick={addCategoryTrim}>Add Category</button>
            </div>

            <div className="category-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-item ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Task Management */}

          {activeCategory && (
            <div className="task-section">
              <h3>Tasks</h3>

              <div className="task-controls">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>

                {categories.length > 0 && (
                  <div className="add-task">
                    <input
                      type="text"
                      value={newTask.name}
                      onChange={(e) =>
                        setNewTask({ ...newTask, name: e.target.value })
                      }
                      placeholder="Task name"
                    />

                    <select
                      value={newTask.type}
                      onChange={(e) =>
                        setNewTask({ ...newTask, type: e.target.value })
                      }
                    >
                      <option value="assignment">Assignment</option>
                      <option value="exam">Exam</option>
                      <option value="project">Project</option>
                      <option value="reading">Reading</option>
                    </select>

                    <input
                      type="date"
                      value={newTask.endDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, endDate: e.target.value })
                      }
                    />

                    <button onClick={addTaskTrim}>Add Task</button>
                  </div>
                )}
              </div>

              {/* Task List */}
              <div className="task-list">
                <div key={category.id} className="category-tasks">
                  <h4>{category.name}</h4>
                  {filteredTasks(category.tasks)?.length > 0 ? (
                    <ul>
                      {filteredTasks(category.tasks).map((task) => (
                        <li
                          key={task.id}
                          className={
                            task.status === "completed"
                              ? "completed"
                              : "pending"
                          }
                        >
                          <input
                            type="checkbox"
                            checked={task.status === "completed"}
                            onChange={() =>
                              toggleTaskCompletion(category.id, task.id)
                            }
                          />
                          <div className="task-info">
                            <span className="task-name">{task.name}</span>
                            <span className="task-type">{task.type}</span>
                            <span className="task-endDate">
                              Due:{" "}
                              {format(parseISO(task.endDate), "MMM dd, yyyy")}
                            </span>
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() => deleteTask(category.id, task.id)}
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No tasks in this category</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AcademicTasks;
