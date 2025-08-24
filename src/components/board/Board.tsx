"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Column from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { moveTask } from "@/redux/slices/taskSlice";

export default function Board() {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.tasks.columns);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const targetColumn = over.data?.current?.column as string | undefined;
    if (!targetColumn) return;

    const taskId = String(active.id);
    dispatch(moveTask({ taskId, column: targetColumn }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6">
        <div className="flex gap-4 mt-6">
          {columns.map((col) => (
            <Column key={col} title={col} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
