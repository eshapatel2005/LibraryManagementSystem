"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddBookDialogProps {
  onBookAdded: () => void;
}

export default function AddBookDialog({
  onBookAdded,
}: AddBookDialogProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addBook = async () => {
    if (!title || !author || !category || !isbn) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            category,
            isbn,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to add book");
        return;
      }

      alert("Book Added Successfully");

      setTitle("");
      setAuthor("");
      setCategory("");
      setIsbn("");

      setOpen(false);

      onBookAdded();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#172554] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1E3A8A]">
        <Plus className="h-4 w-4" />
        Add Book
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#172554]">
            Add New Book
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>

            <Input
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>

            <Input
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>

            <Input
              id="isbn"
              placeholder="Enter ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={addBook}
            disabled={loading}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#0F766E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#115E59] disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}