"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Users as UsersIcon } from "lucide-react";

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5001/api/users", {
        headers: {
          Authorization: token || "",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Failed to fetch users");
        return;
      }

      setUsers(result.data || []);
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete user");
        return;
      }

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (err) {
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b bg-white px-8 py-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-[#172554]">Users</h1>

              <p className="text-sm text-gray-500">
                Manage registered library users
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5" />
                  All Users
                </CardTitle>

                <Badge variant="secondary">{users.length} Users</Badge>
              </div>
            </CardHeader>

            <CardContent>
              {loading && (
                <div className="py-10 text-center text-gray-500">
                  Loading users...
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {!loading && !error && users.length === 0 && (
                <div className="py-10 text-center text-gray-500">
                  No users found
                </div>
              )}

              {!loading && !error && users.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="px-4 py-3 text-sm font-semibold">
                          Name
                        </th>

                        <th className="px-4 py-3 text-sm font-semibold">
                          Email
                        </th>

                        <th className="px-4 py-3 text-sm font-semibold">
                          Phone
                        </th>

                        <th className="px-4 py-3 text-sm font-semibold">
                          Role
                        </th>

                        <th className="px-4 py-3 text-right text-sm font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user._id}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="px-4 py-4 font-medium">{user.name}</td>

                          <td className="px-4 py-4 text-gray-600">
                            {user.email}
                          </td>

                          <td className="px-4 py-4 text-gray-600">
                            {user.phone}
                          </td>

                          <td className="px-4 py-4">
                            <Badge
                              variant={
                                user.role === "admin" ? "default" : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>

                          <td className="px-4 py-4 text-right">
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(user._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
