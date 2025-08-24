"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/board");
    else router.push("/login");
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  );
}
