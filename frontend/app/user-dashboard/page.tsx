"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Library,
  LogOut,
  User,
  Mail,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  isIssued: boolean;
}

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function UserDashboardPage() {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);

      if (parsedUser.role === "admin") {
        router.replace("/dashboard");
        return;
      }

      setUser(parsedUser);

      fetchBooks();
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
    }
  }, [router]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/books"
      );

      const result = await response.json();

      if (response.ok) {
        setBooks(result.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.replace("/login");
  };

  const availableBooks = books.filter(
    (book) => !book.isIssued
  );

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <header className="border-b bg-[#172554] px-8 py-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Library className="h-5 w-5" />
            </div>

            <div>
              <h1 className="font-semibold">
                Library Management
              </h1>

              <p className="text-xs text-blue-200">
                User Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="p-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#172554]">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Browse available books from the library.
          </p>
        </div>

        {/* User Information */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="mb-5 text-lg font-semibold text-[#172554]">
              My Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <User className="h-5 w-5 text-[#172554]" />

                <div>
                  <p className="text-xs text-gray-500">
                    Name
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {user?.name || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Mail className="h-5 w-5 text-[#172554]" />

                <div>
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    {user?.email || "-"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Books */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-[#172554]" />

              <div>
                <h2 className="text-lg font-semibold text-[#172554]">
                  Available Books
                </h2>

                <p className="text-sm text-gray-500">
                  Books currently available in the library
                </p>
              </div>
            </div>

            {loading && (
              <p className="text-sm text-gray-500">
                Loading books...
              </p>
            )}

            {!loading &&
              availableBooks.length === 0 && (
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <p className="text-sm text-gray-500">
                    No books are currently available.
                  </p>
                </div>
              )}

            {!loading &&
              availableBooks.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {availableBooks.map((book) => (
                    <div
                      key={book._id}
                      className="rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#172554]">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <h3 className="font-semibold text-[#172554]">
                        {book.title}
                      </h3>

                      <p className="mt-3 text-sm text-gray-600">
                        Author: {book.author}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        Category: {book.category}
                      </p>

                      <p className="mt-2 text-xs text-gray-400">
                        ISBN: {book.isbn}
                      </p>

                      <div className="mt-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        Available
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}