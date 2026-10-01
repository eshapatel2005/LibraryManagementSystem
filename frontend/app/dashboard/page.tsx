"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Users, Library, CheckCircle } from "lucide-react";

import Sidebar from "@/components/sidebar";
import { Card, CardContent } from "@/components/ui/card";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  isIssued: boolean;
}

export default function DashboardPage() {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (user.role !== "admin") {
        router.replace("/user-dashboard");
        return;
      }

      fetchBooks();
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
    }
  }, [router]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/books");

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

  const totalBooks = books.length;

  const issuedBooks = books.filter((book) => book.isIssued).length;

  const availableBooks = totalBooks - issuedBooks;

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b bg-white px-8 py-6">
          <h1 className="text-2xl font-bold text-[#172554]">Dashboard</h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome to Library Management System
          </p>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Library className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Books</p>

                  <p className="text-2xl font-bold text-[#172554]">
                    {loading ? "..." : totalBooks}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <CheckCircle className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Available Books</p>

                  <p className="text-2xl font-bold text-green-700">
                    {loading ? "..." : availableBooks}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <BookOpen className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Issued Books</p>

                  <p className="text-2xl font-bold text-amber-700">
                    {loading ? "..." : issuedBooks}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin message */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172554] text-white">
                  <Users className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#172554]">
                    Admin Dashboard
                  </h2>

                  <p className="text-sm text-gray-500">
                    You have access to books, users, assignments and other
                    library management features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
