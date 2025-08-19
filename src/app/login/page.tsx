"use client";

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
      ? "Welcome Back"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : mode === MODE.CONFIRM_EMAIL
      ? "Confirm Email"
      : "Confirm Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Sign In"
      : mode === MODE.RESET_PASSWORD
      ? "Send Reset Link"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Section */}
          <div className="hidden lg:block">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-green-600">NXTKIND</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Sign in to access your personalized nutrition journey and track your wellness progress.
              </p>
              
              {/* Feature Cards */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Track your nutrition goals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Access exclusive content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Manage your orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Auth Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {FormTitle}
                  </h2>
                  <p className="text-gray-600">
                    {mode === MODE.LOGIN 
                      ? "Sign in to your account to continue"
                      : mode === MODE.RESET_PASSWORD
                      ? "Enter your email to receive a reset link"
                      : "Enter the verification code sent to your email"
                    }
                  </p>
                </div>

                {mode === MODE.LOGIN && (
                  <>
                    {/* Google Login Button */}
                    <div className="mb-6">
                      <GoogleLoginButton />
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                      </div>
                    </div>
                  </>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>

                  {mode === MODE.CONFIRM_EMAIL ? (
                    <div>
                      <label htmlFor="emailCode" className="block text-sm font-medium text-gray-700 mb-2">
                        Verification Code
                      </label>
                      <input
                        id="emailCode"
                        type="text"
                        name="emailCode"
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                        value={emailCode}
                        onChange={(e) => setEmailCode(e.target.value)}
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <button
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {buttonTitle}
                  </button>

                  {mode === MODE.LOGIN && (
                    <div className="flex items-center justify-between text-sm">
                      <Link href="/signup" className="text-green-600 hover:text-green-700 font-medium">
                        Don&apos;t have an account? Sign up
                      </Link>
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => setMode(MODE.RESET_PASSWORD)}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {(mode === MODE.RESET_PASSWORD || mode === MODE.CONFIRM_EMAIL) && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-green-600 hover:text-green-700 font-medium"
                        onClick={() => setMode(MODE.LOGIN)}
                      >
                        ← Back to Sign In
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl" role="alert">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl" role="alert">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{success}</span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}