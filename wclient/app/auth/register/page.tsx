"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
   
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F8] p-4">
      <Card className="max-w-md w-full rounded-2xl shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#2E5C8A]">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Join SewaCycle to monitor your loved ones’ health easily
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium">Full Name</label>
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
              <label className="text-gray-700 text-sm font-medium">Email</label>
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
              <label className="text-gray-700 text-sm font-medium">Password</label>
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
              <label className="text-gray-700 text-sm font-medium">
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

            <Button type="submit" className="w-full mt-2">
              Sign Up
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-[#5B9BD5] hover:underline font-medium"
            >
              Log In
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
