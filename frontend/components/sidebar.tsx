"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Users,
  Library,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const userData =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
      : null;

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    user = null;
  }

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#172554] text-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Library className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-sm font-semibold">
            Library Management
          </h1>

          <p className="text-xs text-blue-200">
            {isAdmin ? "Admin Panel" : "User Panel"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-blue-200">
          Menu
        </p>

        <div className="space-y-1">
          {isAdmin ? (
            <>
              <Link
                href="/dashboard"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  pathname === "/dashboard"
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/books"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  pathname === "/books"
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <BookOpen className="h-5 w-5" />
                Books
              </Link>

              <Link
                href="/users"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  pathname === "/users"
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
            </>
          ) : (
            <Link
              href="/user-dashboard"
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                pathname === "/user-dashboard"
                  ? "bg-white/10 text-white"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Available Books
            </Link>
          )}
        </div>
      </nav>

      {/* User Info */}
      {user && (
        <div className="border-t border-white/10 px-4 py-4">
          <p className="truncate text-sm font-medium">
            {user.name}
          </p>

          <p className="truncate text-xs text-blue-200">
            {user.email}
          </p>
        </div>
      )}

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}