"use client";

import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Users,
  Library,
} from "lucide-react";

export default function Sidebar() {
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
            System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-blue-200">
          Menu
        </p>

        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg bg-white/10 px-3 py-3 text-sm font-medium transition hover:bg-white/15">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white">
            <BookOpen className="h-5 w-5" />
            Books
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white">
            <Users className="h-5 w-5" />
            Users
          </button>
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}