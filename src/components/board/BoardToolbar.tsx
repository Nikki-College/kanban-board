"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearch, setFilterLabel, setSortBy } from "@/redux/slices/taskSlice";
import { selectVisibleTasks } from "@/redux/slices/taskSlice";

const labelOptions = ["Bug", "Security", "UI", "Performance", "Docs"];

export default function BoardToolbar() {
  const tasks = useSelector(selectVisibleTasks);
  const dispatch = useDispatch();
  const { search, label, sortBy } = useSelector((s: RootState) => s.tasks);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <input
        type="text"
        placeholder="Search tasks by title…"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full md:w-1/2 border border-gray-300 rounded-lg p-2"
      />

      <div className="flex items-center gap-3">
        <select
          value={label ?? ""}
          onChange={(e) => dispatch(setFilterLabel(e.target.value || null))}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All labels</option>
          {labelOptions.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={sortBy ?? ""}
          onChange={(e) =>
            dispatch(setSortBy(e.target.value === "date" ? "date" : null))
          }
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">No sort</option>
          <option value="date">Newest first</option>
        </select>
      </div>
    </div>
  );
}
