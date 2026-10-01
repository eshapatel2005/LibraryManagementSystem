import { BookOpen, Users, BookMarked, Library, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172554]">
              <Library className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-[#172554]">
                Library Management System
              </h1>
              <p className="text-xs text-slate-500">
                Manage your library easily
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#0F766E]">Dashboard</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#172554]">
            Welcome to your Library
          </h2>

          <p className="mt-2 text-slate-500">
            Manage books and users from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Books
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#172554]">0</h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <BookOpen className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Issued Books
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#172554]">0</h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  <BookMarked className="h-6 w-6 text-teal-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Users
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#172554]">0</h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                  <Users className="h-6 w-6 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-700" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-[#172554]">Manage Books</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Add, update, search and manage library books.
                  </p>

                  <Button className="mt-4 bg-[#172554] hover:bg-[#1E3A8A]">
                    View Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                  <Users className="h-5 w-5 text-teal-700" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-[#172554]">Manage Users</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage registered library users and their details.
                  </p>

                  <Button className="mt-4 bg-[#0F766E] hover:bg-[#115E59]">
                    View Users
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
