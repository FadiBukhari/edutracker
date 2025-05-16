import { useState } from "react";
import { format, parseISO } from "date-fns";
import "./CSS/AcademicTasks.css"; // Assuming you have a CSS file for styling
const AcademicTasks = () => {
  // State for categories and tasks
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTask, setNewTask] = useState({
    categoryId: "",
    name: "",
    type: "assignment",
    deadline: format(new Date(), "yyyy-MM-dd"),
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'pending'

  // Add new category
  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    }
  };

  // Add new task
  const addTask = () => {
    if (newTask.name.trim() && newTask.categoryId) {
      setCategories(
        categories.map((category) => {
          if (category.id === newTask.categoryId) {
            const task = {
              id: Date.now().toString(),
              name: newTask.name.trim(),
              type: newTask.type,
              deadline: newTask.deadline,
              completed: false,
            };
            return {
              ...category,
              tasks: [...(category.tasks || []), task],
            };
          }
          return category;
        })
      );
      setNewTask({
        ...newTask,
        name: "",
        categoryId: activeCategory || newTask.categoryId,
      });
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (categoryId, taskId) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks?.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          };
        }
        return category;
      })
    );
  };

  // Delete task
  const deleteTask = (categoryId, taskId) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks?.filter((task) => task.id !== taskId),
          };
        }
        return category;
      })
    );
  };

  // Delete category
  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  // Filter tasks based on completion status
  const filteredTasks = (tasks) => {
    if (!tasks) return [];
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
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
          <button onClick={addCategory}>Add Category</button>
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
                  deleteCategory(category.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Task Management */}
      <div className="task-section">
        <h3>Tasks</h3>
        <div className="task-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          {categories.length > 0 && (
            <div className="add-task">
              <select
                value={newTask.categoryId}
                onChange={(e) =>
                  setNewTask({ ...newTask, categoryId: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

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
                value={newTask.deadline}
                onChange={(e) =>
                  setNewTask({ ...newTask, deadline: e.target.value })
                }
              />

              <button onClick={addTask}>Add Task</button>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="task-list">
          {categories.map(
            (category) =>
              (activeCategory === null || activeCategory === category.id) && (
                <div key={category.id} className="category-tasks">
                  <h4>{category.name}</h4>
                  {filteredTasks(category.tasks)?.length > 0 ? (
                    <ul>
                      {filteredTasks(category.tasks).map((task) => (
                        <li
                          key={task.id}
                          className={task.completed ? "completed" : ""}
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() =>
                              toggleTaskCompletion(category.id, task.id)
                            }
                          />
                          <div className="task-info">
                            <span className="task-name">{task.name}</span>
                            <span className="task-type">{task.type}</span>
                            <span className="task-deadline">
                              Due:{" "}
                              {format(parseISO(task.deadline), "MMM dd, yyyy")}
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
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicTasks;
