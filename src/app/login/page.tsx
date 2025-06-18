"use client";

import Image from "next/image";
import { useWixClient } from "@/hooks/useWixClientContext";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  CONFIRM_EMAIL = "CONFIRM_EMAIL",
}
export default function LoginPage() {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const FormTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : mode === MODE.CONFIRM_EMAIL
      ? "Confirm Email"
      : "Confirm Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : mode === MODE.CONFIRM_EMAIL
      ? "Confirm Email"
      : null;

  const router = useRouter();

  const wixClient = useWixClient();

  const handleConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword ? true : false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (
        (mode === MODE.REGISTER || mode === MODE.RESET_PASSWORD) &&
        !handleConfirmPassword(password, confirmPassword)
      ) {
        setError("Passwords do not match");
        console.log("Password don't match", password, confirmPassword);
        return;
      }
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: {
              firstName,
              lastName,
            },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setSuccess("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.CONFIRM_EMAIL:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setSuccess("Successful! You are being redirected.");
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Error in Development");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="-mt-11 w-full bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">
        {/* Text Section */}
        <div className="order-2 px-10 w-full md:w-3/4 text-center items-start md:text-left space-y-6">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <h1 className="text-4xl w-full md:text-5xl font-bold tracking-tighter text-[#414143]">
              {FormTitle}
            </h1>
            <br />

            {mode === MODE.REGISTER ? (
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full mb-4 p-3 border rounded-lg"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full mb-4 p-3 border rounded-lg"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            ) : null}

            <input
              type="email"
              name="email"
              placeholder="someone@example.com"
              className="w-full mb-4 p-3 border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />

            {mode === MODE.CONFIRM_EMAIL ? (
              <input
                type="text"
                name="emailCode"
                placeholder="123456"
                className="w-full mb-2 p-3 border rounded-lg"
                onChange={(e) => setEmailCode(e.target.value)}
              />
            ) : (
              (mode === MODE.LOGIN || mode === MODE.REGISTER) && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
              )
            )}

            {mode === MODE.REGISTER ? (
              <input
                type="password"
                name="reset_password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            ) : null}

            {mode === MODE.LOGIN && (
              <div className="flex flex-row items-center justify-between">
                <p
                  className="text-sm -mb-5 cursor-pointer underline"
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Don&#39;t have an account? <span>Register</span>{" "}
                </p>
                <p
                  className="text-sm -mb-5 cursor-pointer underline"
                  onClick={() => setMode(MODE.RESET_PASSWORD)}
                >
                  Forgot Password?
                </p>
              </div>
            )}

            {mode === MODE.REGISTER && (
              <div
                className="text-sm -mb-5 cursor-pointer underline"
                onClick={() => setMode(MODE.LOGIN)}
              >
                Have an existing account?Login
              </div>
            )}

            {mode === MODE.RESET_PASSWORD && (
              <div
                className="text-sm -mb-5 cursor-pointer underline"
                onClick={() => setMode(MODE.LOGIN)}
              >
                Go back to Login
              </div>
            )}

            {mode === MODE.CONFIRM_EMAIL && (
              <div
                className="text-sm -mb-5 cursor-pointer underline"
                onClick={() => setMode(MODE.LOGIN)}
              >
                Go back to Login
              </div>
            )}

            <button
              className="w-full rounded-md bg-black text-white py-3 px-4 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : buttonTitle}
            </button>

            {error && (
              <div
                className="order-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}

            {success && (
              <div
                className="order-1 bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative"
                role="alert"
              >
                
                <span className="block sm:inline">
                  {success}
                </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Image Section */}
        <div className=" hidden order-1 w-full md:w-1/4 mt-0 md:flex justify-center">
          <Image
            src="/login-bg.png" // replace with your image in /public
            alt="Hero Image"
            width={500}
            height={700}
            className="rounded-r-xl inset-shadow-sm object-cover"
          />
        </div>
      </div>
    </section>
  );
}
