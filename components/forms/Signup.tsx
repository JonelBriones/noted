"use client";
import Image from "next/image";
import React, { useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [toggleHidePassword, setToggleHidePassword] = useState(true);
  const [error, setError] = useState({
    emailError: false,
  });
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="m-auto md:w-[540px] h-full p-8 w-full flex gap-4 flex-col justify-start">
      <Link href={"/"} className="flex justify-center">
        <Image
          src={"/images/logo.svg"}
          width={0}
          height={0}
          alt="logo"
          className="w-[95px] h-[28px]"
        />
      </Link>
      <div className="flex flex-col gap-3 text-center mb-8">
        <h1 className="font-bold text-3xl">Create Your Account</h1>
        <p className="text-neutral-400">
          Sign up to start organizing your nots and boost your productivity.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="email@example.com"
            className={`p-2 rounded-lg border-2 border-neutral-300 text-neutral-500 text-sm hover:bg-neutral-50 outline-none  ${
              error.emailError
                ? "border-red-500"
                : "outline-offset-2 focus:border-neutral-600 focus:ring-neutral-600 focus:outline-neutral-500"
            }`}
          />
          {error.emailError && (
            <span className="text-red-500 text-[12px] flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#fb3748"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
                />
              </svg>
              Please enter a valid email address
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="flex justify-between place-items-center"
          >
            <span>Password</span>
          </label>
          <div className="w-full relative">
            <input
              type={toggleHidePassword ? "password" : "text"}
              className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
            />
            <div onClick={() => setToggleHidePassword(!toggleHidePassword)}>
              <Image
                src={`/images/icon-${
                  toggleHidePassword ? "hide" : "show"
                }-password.svg`}
                width={0}
                height={0}
                alt="icon-hide-password"
                className="size-5 absolute right-4 top-[10px] cursor-pointer"
              />
            </div>
          </div>
          <span className="text-neutral-600 text-[12px] flex gap-2">
            <Image
              src={"/images/icon-info.svg"}
              width={0}
              height={0}
              alt="logo"
              className="w-[18px] h-[18px]"
            />
            At least 8 characters
          </span>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <PrimaryBtn
            text="Login"
            backgroundColor="bg-blue-500"
            textColor="text-white"
            hoverColor="hover:bg-blue-700"
          />
          <div className="w-full h-[1px] bg-neutral-200" />
          <div className="flex flex-col gap-4">
            <p className="text-neutral-600 text-sm">Or log in with:</p>
            <button
              className="flex place-items-center justify-center gap-4 p-2  border-2 rounded-lg cursor-pointer hover:bg-neutral-50"
              onClick={() => signIn("google")}
            >
              <Image
                src={"/images/icon-google.svg"}
                width={0}
                height={0}
                alt="icon-google"
                className="size-[25px]"
              />
              <span className="text-lg text-neutral-950 font-medium">
                Google
              </span>
            </button>
          </div>
          <span className="text-neutral-600 text-sm">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-neutral-950 hover:text-blue-500"
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
