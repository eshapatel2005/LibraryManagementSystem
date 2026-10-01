"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  isIssued: boolean;
}

interface EditBookDialogProps {
  book: Book;
  onBookUpdated: () => void;
}

export default function EditBookDialog({
  book,
  onBookUpdated,
}: EditBookDialogProps) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [isbn, setIsbn] = useState(book.isbn);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setIsbn(book.isbn);
  }, [book]);

  const updateBook = async () => {
    if (!title || !author || !category || !isbn) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5001/api/books/${book._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            category,
            isbn,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update book");
        return;
      }

      alert("Book Updated Successfully");

      setOpen(false);

      onBookUpdated();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => setOpen(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#172554]">Edit Book</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>

              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-author">Author</Label>

              <Input
                id="edit-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>

              <Input
                id="edit-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-isbn">ISBN</Label>

              <Input
                id="edit-isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Enter ISBN"
              />
            </div>

            <Button
              onClick={updateBook}
              disabled={loading}
              className="w-full bg-[#0F766E] hover:bg-[#115E59]"
            >
              {loading ? "Updating..." : "Update Book"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
