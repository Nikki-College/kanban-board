import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";

export type Task = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  label: string;
  dueDate?: string;
  createdAt: string;
  column: string;
  category: string;
};

export type Category = {
  id: string;
  name: string;
};

interface TaskState {
  tasks: Task[];
  categories: Category[];
  columns: string[];
  search: string;

  label: string | null;
  sortBy: string | null;
}

const initialState: TaskState = {
  tasks: [],
  categories: [
    { id: "work", name: "Work" },
    { id: "personal", name: "Personal" },
  ],
  columns: ["Draft", "In Progress", "Solved"],
  search: "",

  label: null,
  sortBy: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    moveTask: (
      state,
      action: PayloadAction<{ taskId: string; column: string }>
    ) => {
      const { taskId, column } = action.payload;
      const task = state.tasks.find((t) => String(t.id) === String(taskId));
      if (task) task.column = column;
    },

    addTask: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        category: string;
        label: string;
        dueDate?: string;
        severity: string;
      }>
    ) => {
      state.tasks.push({
        id: uuidv4(),
        title: action.payload.title,
        category: action.payload.category,
        label: action.payload.label,
        severity: "Low",
        dueDate: action.payload.dueDate || "",
        createdAt: new Date().toISOString(),
        column: "Draft",
      });
    },

    editTask: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>
    ) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    //
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilterLabel: (state, action: PayloadAction<string | null>) => {
      state.label = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string | null>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  moveTask,
  setSearch,
  setFilterLabel,
  setSortBy,
} = taskSlice.actions;
export default taskSlice.reducer;

export const selectVisibleTasks = (state: RootState) => {
  let tasks = [...state.tasks.tasks];

  if (state.tasks.search) {
    tasks = tasks.filter((t) =>
      t.title.toLowerCase().includes(state.tasks.search.toLowerCase())
    );
  }

  if (state.tasks.label) {
    tasks = tasks.filter((t) => t.label === state.tasks.label);
  }

  if (state.tasks.sortBy === "date") {
    tasks = tasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return tasks;
};
