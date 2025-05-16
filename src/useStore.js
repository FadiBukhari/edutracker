import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";

// Create a store for tasks
export const useStoreCategories = create()(
  persist(
    (set) => ({
      categories: [
        {
          id: 1,
          name: "Academic Tasks",
          tasks: [
            {
              id: 1,
              name: "Task1",
              type: "assignment",
              endDate: format(new Date(), "yyyy-MM-dd"),
              status: "pending",
            },
          ],
        },
      ],
      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, newCategory],
        })),
      addTask: (categoryId, newTask) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  tasks: [...(category.tasks || []), newTask],
                }
              : category
          ),
        })),
      toggleTaskCompletion: (categoryId, taskId) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  tasks: category.tasks?.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          status:
                            task.status === "completed"
                              ? "pending"
                              : "completed",
                        }
                      : task
                  ),
                }
              : category
          ),
        })),
      deleteTask: (categoryId, taskId) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  tasks: category.tasks?.filter((task) => task.id !== taskId),
                }
              : category
          ),
        })),
      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.id !== categoryId
          ),
        })),
    }),
    {
      name: "categories-storage", // unique key for localStorage
      // Optional: only persist certain fields
      partialize: (state) => ({ categories: state.categories }),
    }
  )
);

export const useStore = create()(
  persist(
    (set) => ({
      currentuser: {
        name: "Fadi",
        email: "demo@demo.com",
        password: "1234",
        role: "parent",
      },
      users: [
        {
          name: "Fadi",
          email: "demo@demo.com",
          password: "1234",
          role: "parent",
        },
        {
          name: "Ahmad",
          email: "demoe@demo.com",
          password: "12345",
          role: "user",
        },
      ],
      addUser: (userData) =>
        set((state) => ({
          users: [...state.users, userData],
        })),
      setCurrentUser: (user) => set({ currentuser: user }),
      clearUser: () => set({ currentuser: null }),
    }),
    {
      name: "user-storage", // unique key for localStorage
      // Optional: only persist certain fields
      partialize: (state) => ({
        currentuser: state.currentuser,
        users: state.users,
      }),
    }
  )
);
