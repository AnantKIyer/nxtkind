"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useWixClient } from "@/hooks/useWixClientContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";

enum MODE {
  LOGIN = "LOGIN",
  RESET_PASSWORD = "RESET_PASSWORD",
  CONFIRM_EMAIL = "CONFIRM_EMAIL",
}

export default function LoginPage() {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { wixClient, isLoggedIn, login } = useWixClient();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const FormTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : mode === MODE.CONFIRM_EMAIL
      ? "Confirm Email"
      : "Confirm Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : mode === MODE.CONFIRM_EMAIL
      ? "Confirm Email"
      : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      
      switch (mode) {
        case MODE.LOGIN:
          const loginResult = await login(email, password);
          if (loginResult.success) {
            setSuccess("Login successful! Redirecting...");
            setEmail("");
            setPassword("");
            router.push("/");
          } else {
            setError(loginResult.error || "Login failed");
          }
          return;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setSuccess("Password reset email sent. Please check your e-mail.");
          setMode(MODE.LOGIN);
          setTimeout(() => setSuccess(""), 4000);
          return;
        case MODE.CONFIRM_EMAIL:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      if (response?.loginState === 'SUCCESS') {
        setSuccess("Successful! You are being redirected.");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        setError("Something went wrong!");
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
              {FormTitle}
            </h1>

            {mode === MODE.LOGIN && (
              <>
                {/* Google Login Button */}
                <div className="mb-6">
                  <GoogleLoginButton />
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="someone@example.com"
                className="w-full p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />

              {mode === MODE.CONFIRM_EMAIL ? (
                <input
                  type="text"
                  name="emailCode"
                  placeholder="123456"
                  className="w-full p-3 border rounded-lg"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  required
                />
              ) : (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}

              <button
                className="mt-2 w-full rounded-md bg-black text-white py-3 px-4 disabled:cursor-not-allowed"
                type="submit"
              >
                {buttonTitle}
              </button>

              {mode === MODE.LOGIN && (
                <div className="flex items-center justify-between mt-1">
                  <Link href="/signup" className="text-sm underline">Don&#39;t have an account? Sign up</Link>
                  <button
                    type="button"
                    className="text-sm underline"
                    onClick={() => setMode(MODE.RESET_PASSWORD)}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {(mode === MODE.RESET_PASSWORD || mode === MODE.CONFIRM_EMAIL) && (
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Go back to Login
                </button>
              )}

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