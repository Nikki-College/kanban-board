import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/redux/slices/taskSlice";
import { useDraggable } from "@dnd-kit/core";
import { Trash2, Pencil } from "lucide-react";
import TaskForm from "./TaskForm";

export default function TaskCard({ task }: { task: any }) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white p-3 rounded shadow flex justify-between items-start"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div {...listeners} {...attributes} className="cursor-grab px-1">
              ☰
            </div>
            <h3 className="font-medium">{task.title}</h3>
          </div>

          <p className="text-sm">Severity: {task.severity}</p>
          <p className="text-sm">Label: {task.label}</p>
          <p className="text-sm">dueDate: {task.dueDate}</p>

          <p className="text-xs text-gray-500">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-blue-500 text-sm cursor-pointer"
          >
            <Pencil />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTask(task.id));
            }}
            className="text-red-500 text-sm cursor-pointer"
          >
            <Trash2 />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow w-96">
            <TaskForm taskToEdit={task} onClose={() => setIsEditing(false)} />
          </div>
        </div>
      )}
    </>
  );
}
