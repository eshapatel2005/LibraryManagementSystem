"use client";

import { useEffect, useState } from "react";
import { BookOpenCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Book {
  _id: string;
  title: string;
  isIssued: boolean;
}

interface AssignBookDialogProps {
  book: Book;
  onBookAssigned: () => void;
}

export default function AssignBookDialog({
  book,
  onBookAssigned,
}: AssignBookDialogProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5001/api/users", {
          headers: {
            Authorization: token || "",
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch users");
        }

        setUsers(result.data || []);
      } catch (error) {
        console.error("Users Fetch Error:", error);
        alert(error instanceof Error ? error.message : "Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [open]);

  const assignBook = async () => {
    if (!userId) {
      alert("Please select a user");
      return;
    }

    if (!expiryDate) {
      alert("Please select expiry date");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5001/api/books/${book._id}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
          body: JSON.stringify({
            userId,
            expiryDate,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to assign book");
      }

      alert("Book Assigned Successfully");

      setOpen(false);
      setUserId("");
      setExpiryDate("");

      onBookAssigned();
    } catch (error) {
      console.error("Assign Book Error:", error);

      alert(error instanceof Error ? error.message : "Failed to assign book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 text-teal-700 hover:bg-teal-50"
        disabled={book.isIssued}
        onClick={() => setOpen(true)}
        title={book.isIssued ? "Book Already Issued" : "Assign Book"}
      >
        <BookOpenCheck className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Book</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">Book</p>

              <p className="font-medium">{book.title}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user">Select User</Label>

              <select
                id="user"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loadingUsers}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">
                  {loadingUsers ? "Loading users..." : "Select a user"}
                </option>

                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>

              <input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <Button
              className="w-full bg-[#0F766E] hover:bg-[#115E59]"
              onClick={assignBook}
              disabled={loading}
            >
              {loading ? "Assigning..." : "Assign Book"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
