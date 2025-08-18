"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClientContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { isLoggedIn, register } = useWixClient();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await register(email, password, { firstName, lastName });
      
      if (result.success) {
        setSuccess("Registration successful! Redirecting...");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push("/");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="-mt-11 w-full bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">
        {/* Left: Illustration */}
        <div className="hidden order-1 w-full md:w-1/2 md:flex justify-center">
          <Image
            src="/nxt_vertical_banner.jpg"
            alt="Nxtkind"
            width={600}
            height={700}
            className="rounded-xl object-cover shadow-[var(--shadow-box)]"
          />
        </div>

        {/* Right: Auth Card */}
        <div className="order-2 w-full md:w-1/2 flex justify-center">
          <form className="w-full max-w-md card p-8" onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#414143] mb-6">
              Create your account
            </h1>

            {/* Google Login Button */}
            <div className="mb-6">
              <GoogleLoginButton text="Sign up with Google" />
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 border rounded-lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="someone@example.com"
                className="w-full p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                className="mt-2 w-full rounded-md bg-black text-white py-3 px-4 disabled:cursor-not-allowed"
                type="submit"
              >
                Sign up
              </button>

              <div className="flex items-center justify-between mt-1">
                <Link href="/login" className="text-sm underline">Already have an account? Log in</Link>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{success}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


