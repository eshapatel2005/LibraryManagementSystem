"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Library,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

import Sidebar from "@/components/sidebar";
import AddBookDialog from "@/components/add-book-dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  isIssued: boolean;
}

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/books"
      );

      const result = await response.json();

      if (response.ok) {
        setBooks(result.data || []);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.log("Failed to fetch books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const totalBooks = books.length;

  const issuedBooks = books.filter(
    (book) => book.isIssued
  ).length;

  const availableBooks = books.filter(
    (book) => !book.isIssued
  ).length;

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="flex h-20 items-center justify-between px-8">
            <div>
              <p className="text-sm font-medium text-[#0F766E]">
                Library Management
              </p>

              <h1 className="text-2xl font-bold text-[#172554]">
                Dashboard
              </h1>
            </div>

            <AddBookDialog onBookAdded={fetchBooks} />
          </div>
        </header>

        {/* Content */}
        <section className="px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#172554]">
              Welcome to Library Management System
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage books and library users from one place.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* Total Books */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Books
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#172554]">
                      {loading ? "..." : totalBooks}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <BookOpen className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Books */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Available Books
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                      {loading ? "..." : availableBooks}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                    <Library className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issued Books */}
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Issued Books
                    </p>

                    <p className="mt-2 text-3xl font-bold text-amber-600">
                      {loading ? "..." : issuedBooks}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                    <BookOpenCheck className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-[#172554]">
              Quick Actions
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Books */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <BookOpen className="h-5 w-5 text-blue-700" />
                      </div>

                      <h3 className="font-semibold text-[#172554]">
                        Manage Books
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Add, edit, search, assign and delete books.
                      </p>
                    </div>

                    <Link href="/books">
                      <Button
                        variant="outline"
                        className="gap-2"
                      >
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Users */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                        <Users className="h-5 w-5 text-[#0F766E]" />
                      </div>

                      <h3 className="font-semibold text-[#172554]">
                        Manage Users
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        View and manage registered library users.
                      </p>
                    </div>

                    <Link href="/users">
                      <Button
                        variant="outline"
                        className="gap-2"
                      >
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Books */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#172554]">
                  Recent Books
                </h2>

                <p className="text-sm text-slate-500">
                  Books currently available in your library.
                </p>
              </div>

              <Link href="/books">
                <Button
                  variant="ghost"
                  className="text-[#0F766E]"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    Loading books...
                  </div>
                ) : books.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    No books available.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {books.slice(0, 5).map((book) => (
                      <div
                        key={book._id}
                        className="flex items-center justify-between px-6 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                            <BookOpen className="h-4 w-4 text-blue-700" />
                          </div>

                          <div>
                            <p className="font-medium text-[#172554]">
                              {book.title}
                            </p>

                            <p className="text-xs text-slate-500">
                              {book.author}
                            </p>
                          </div>
                        </div>

                        {book.isIssued ? (
                          <Badge variant="destructive">
                            Issued
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            Available
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}