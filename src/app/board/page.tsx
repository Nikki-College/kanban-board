"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout, hydrateAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Board from "@/components/board/Board";
import BoardToolbar from "@/components/board/BoardToolbar";
import TaskModal from "@/components/board/TaskModal";

export default function BoardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  if (!isAuthenticated) {
    router.push("/login");
    return <div className="p-8 text-red-500">Redirecting…</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.email || "User"} 👋
        </h1>
        <div className="flex items-center gap-2">
          <TaskModal />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              dispatch(logout());
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <BoardToolbar />

      <Board />
    </div>
  );
}
