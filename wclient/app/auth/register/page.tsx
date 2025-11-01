"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@/lib/context/AuthContext";
import { UserRole } from "@/lib/services/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { signup, isLoading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CHILD" as UserRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      await signup(form.name, form.email, form.password, form.role);
      // Navigation is handled in AuthContext after successful signup
    } catch (error) {
      // Error handling is done in AuthContext with toast notifications
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F8] p-4">
      <Card className="max-w-md w-full rounded-2xl shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Join SewaCycle to monitor your loved ones’ health easily
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-700 text-sm font-semibold">Full Name</label>
              <Input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                required
              >
                <option value="CHILD">Child (Patient)</option>
                <option value="NURSE">Nurse (Caregiver)</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm font-semibold">
                Confirm Password
              </label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log In
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
