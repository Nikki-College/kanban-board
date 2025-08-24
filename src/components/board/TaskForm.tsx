"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "@/redux/slices/taskSlice";
import { v4 as uuid } from "uuid";
import { Task } from "@/redux/slices/taskTypes";

interface TaskFormProps {
  taskToEdit?: Task;
  onClose: () => void;
}

const severityOptions = ["Low", "Medium", "High", "Critical"];
const labelOptions = ["Bug", "UI", "Docs", "Feature"];

export default function TaskForm({ taskToEdit, onClose }: TaskFormProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [severity, setSeverity] = useState(taskToEdit?.severity || "Low");
  const [label, setLabel] = useState(taskToEdit?.label || "");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");

  const handleSubmit = () => {
    if (!title) return;

    if (taskToEdit) {
      dispatch(
        editTask({
          id: taskToEdit.id,
          updates: {
            title,
            severity,
            label,
            dueDate,
          },
        })
      );
    } else {
      dispatch(
        addTask({
          id: uuid(),
          title,
          label,
          category: "",
          severity,
          dueDate,
        })
      );
    }

    onClose();
  };

  return (
    <div className="flex flex-col gap-3 p-3 border rounded-lg bg-white shadow">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={severity}
        onChange={(e) =>
          setSeverity(e.target.value as "Low" | "Medium" | "High" | "Critical")
        }
        className="border p-2 rounded"
      >
        {severityOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Label</option>
        {labelOptions.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {taskToEdit ? "Save Changes" : "Add Task"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
