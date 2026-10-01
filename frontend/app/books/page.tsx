"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search, Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  isIssued: boolean;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5001/api/books");

      const result = await response.json();

      if (response.ok) {
        setBooks(result.data);
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

  const searchBooks = async () => {
    if (!search.trim()) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5001/api/books/search?title=${encodeURIComponent(
          search,
        )}`,
      );

      const result = await response.json();

      if (response.ok) {
        setBooks(result.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.log("Failed to search books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className="border-slate-200"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>

            <div>
              <p className="text-sm font-medium text-[#0F766E]">Library</p>

              <h1 className="text-xl font-semibold text-[#172554]">Books</h1>
            </div>
          </div>

          <Button className="bg-[#172554] hover:bg-[#1E3A8A]">
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#172554]">Manage Books</h2>

          <p className="mt-1 text-sm text-slate-500">
            View and search books available in the library.
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6 border-slate-200 bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      searchBooks();
                    }
                  }}
                  placeholder="Search book by title..."
                  className="pl-9"
                />
              </div>

              <Button
                onClick={searchBooks}
                className="bg-[#0F766E] hover:bg-[#115E59]"
              >
                Search
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  fetchBooks();
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Books Table */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Book</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-slate-500"
                    >
                      Loading books...
                    </TableCell>
                  </TableRow>
                ) : books.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-slate-500"
                    >
                      No books found.
                    </TableCell>
                  </TableRow>
                ) : (
                  books.map((book) => (
                    <TableRow key={book._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                            <BookOpen className="h-4 w-4 text-blue-700" />
                          </div>

                          <span className="font-medium text-[#172554]">
                            {book.title}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {book.author}
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {book.category}
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {book.isbn}
                      </TableCell>

                      <TableCell>
                        {book.isIssued ? (
                          <Badge variant="destructive">Issued</Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            Available
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
