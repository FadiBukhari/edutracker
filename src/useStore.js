import { create } from "zustand";

// Create a store for tasks
const useStore = create((set) => ({
  currentuser: {},
  tasks: [],
  updateUser: (user) =>
    set(() => ({
      currentUser: user,
    })),
  // Add a new task
  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, id: state.tasks.length + 1 }],
    })),

  // Remove a task by ID
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),

  // Update a task

  // Clear all tasks
  clearTasks: () => set({ tasks: [] }),
}));

export default useStore;
