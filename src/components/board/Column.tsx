"use client";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { selectVisibleTasks } from "@/redux/slices/taskSlice";
import { Task } from "@/redux/slices/taskTypes";

export default function Column({ title }: { title: string }) {
  const allTasks = useSelector(selectVisibleTasks);
  const tasks = allTasks.filter((t) => t.column === title);

  console.log("Here 3:", allTasks, tasks);

  const { setNodeRef, isOver } = useDroppable({
    id: `column-${title}`,
    data: { column: title },
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded p-4 w-64 transition border ${
        isOver
          ? "bg-blue-100 border-blue-300"
          : "bg-gray-100 border-transparent"
      }`}
    >
      <h2 className="font-bold mb-2">{title}</h2>

      <div className="flex flex-col gap-2 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task as Task} />
        ))}
      </div>
    </div>
  );
}
