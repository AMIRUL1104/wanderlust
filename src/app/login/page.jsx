"use client";
// react-icons থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হয়েছে
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import React, { useState } from "react";
import { CardFooter, Input, Button, Checkbox, Link } from "@heroui/react";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e) => {
    e.preventDefault();
    // আপনার লগইন লজিক বা API কল এখানে হবে
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md p-4 shadow-xl">
        <div className="flex flex-col items-center gap-1 pb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-small text-default-500">Log in to your account</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <Input
              isRequired
              type="email"
              label="Email"
              placeholder="example@gmail.com"
              labelPlacement="outside"
              value={email}
              onValueChange={setEmail}
              startContent={
                <FaEnvelope className="pointer-events-none text-xl text-default-400" />
              }
              variant="bordered"
            />

            {/* Password Input */}
            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              value={password}
              onValueChange={setPassword}
              variant="bordered"
              startContent={
                <FaLock className="pointer-events-none text-xl text-default-400" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1 py-2">
              <Checkbox size="sm" defaultSelected>
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              color="primary"
              type="submit"
              className="w-full font-semibold"
              size="lg"
            >
              Log In
            </Button>
          </form>
        </div>

        <CardFooter className="flex justify-center justify-items-center pt-4">
          <p className="text-sm text-default-500">
            New user?{" "}
            <Link size="sm" href="/sign-up">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
}
