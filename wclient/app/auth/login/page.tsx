"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/lab/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F8] p-4">
      <Card className="max-w-md w-full rounded-2xl shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#2E5C8A]">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Sign in to manage your parents' health
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="flex justify-between text-gray-700 text-sm font-medium">
                Password
                <a href="#" className="text-[#5B9BD5] hover:underline text-sm">
                  Forgot?
                </a>
              </label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              Sign In
            </Button>

           
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-[#5B9BD5] hover:underline font-medium">
              Sign Up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
