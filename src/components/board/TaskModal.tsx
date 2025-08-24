"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/slices/taskSlice";
import { v4 as uuid } from "uuid";

const labelOptions = ["Bug", "Security", "UI", "Performance", "Docs"];

export default function TaskModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<
    "Low" | "Medium" | "High" | "Critical"
  >("Low");

  const [label, setLabel] = useState("Bug");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title) return;
    dispatch(
      addTask({
        id: uuid(),
        title,
        severity,
        label,
        dueDate,
        category: "",
      })
    );
    setTitle("");
    setLabel("");
    setSeverity("Low");
    setDueDate("");
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col gap-3">
            <h2 className="font-bold text-lg">New Task</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="border p-2 rounded"
            />
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as any)}
              className="border p-2 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <select
              value={label}
              onChange={(e) => setLabel(e.target.value as any)}
              className="border p-2 rounded"
            >
              {labelOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
