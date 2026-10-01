"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserIdFromToken = (token: string) => {
    try {
      const payload = token.split(".")[1];

      const decodedPayload = JSON.parse(
        atob(
          payload
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      return decodedPayload.id;
    } catch (error) {
      return null;
    }
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Login API
      const loginResponse = await fetch(
        "http://localhost:5001/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const loginResult = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(
          loginResult.message ||
            "Invalid email or password"
        );
        return;
      }

      if (!loginResult.token) {
        setError("Login token not received");
        return;
      }

      const token = loginResult.token;

      // Save token
      localStorage.setItem("token", token);

      // Get user ID from JWT
      const userId = getUserIdFromToken(token);

      if (!userId) {
        localStorage.removeItem("token");

        setError("Invalid login token");
        return;
      }

      // Get logged-in user's details
      const userResponse = await fetch(
        `http://localhost:5001/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const userResult =
        await userResponse.json();

      if (!userResponse.ok) {
        localStorage.removeItem("token");

        setError(
          userResult.message ||
            "Unable to get user details"
        );
        return;
      }

      const user = userResult.data;

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Role based redirect
      if (user.role === "admin") {
        router.replace("/dashboard");
      } else {
        router.replace("/user-dashboard");
      }
    } catch (error) {
      setError(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172554] text-white">
            <BookOpen className="h-7 w-7" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold text-[#172554]">
              Library Management
            </CardTitle>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="pl-10 pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#172554] hover:bg-[#1e3a8a]"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}