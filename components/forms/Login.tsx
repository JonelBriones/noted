"use client";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaCopy } from "react-icons/fa";
import { redirect } from "next/navigation";

const Login = ({ user }: any) => {
  const intialState = {
    zodErrors: "",
    mongooseErrors: "",
    email: "",
    password: [],
    successMsg: "",
  };
  // const [state, formAction, pending] = useActionState(createNote, intialState);

  const [toggleHidePassword, setToggleHidePassword] = useState(true);
  const [errorMsg, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [emailExist, setEmailExist] = useState(undefined);

  const useTestUser = {
    toggleTest: true,
    email: "testuser@gmail.com",
    password: "password",
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email == "") {
      setError({
        ...errorMsg,
        emailError: "Please enter a valid email address",
      });
      return;
    }
    const foundUser = user.find((u: any) => u.email == email);
    if (foundUser) {
      setError({ ...errorMsg, emailError: "" });
      console.log("email found");
    } else {
      setError({
        ...errorMsg,
        emailError: "Please enter a valid email address",
      });
      return;
    }
    if (password.length < 8 || password !== foundUser.settings.password) {
      setError({
        ...errorMsg,
        passwordError: "Incorrect Password. Please try again.",
        emailError: "",
      });
      return;
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
      login: true,
    });
    redirect("/");
  };

  return (
    <div
      className={`m-auto md:w-[540px] h-full p-8 w-full flex gap-4 flex-col justify-start`}
    >
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
        <h1 className="font-bold text-3xl">Welcome to Note</h1>
        <p className="text-neutral-400">Please log in to continue</p>
        <div className="flex justify-center  place-items-center flex-col">
          <span
            className="text-[12px] flex gap-2 place-items-center cursor-pointer w-fit"
            onClick={() => handleCopy(useTestUser.email)}
          >
            {useTestUser.email} <FaCopy size={".75rem"} />
          </span>
          <span
            className="text-[12px] flex gap-2 place-items-center cursor-pointer w-fit"
            onClick={() => handleCopy(useTestUser.password)}
          >
            {useTestUser.password} <FaCopy size={".75rem"} />
          </span>
        </div>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className={`p-2 rounded-lg border-2 border-neutral-300 text-neutral-500 text-sm hover:bg-neutral-50 outline-none  ${
              errorMsg.emailError
                ? "border-red-500"
                : "outline-offset-2 focus:border-neutral-600 focus:ring-neutral-600 focus:outline-neutral-500"
            }`}
          />

          {emailExist == false ||
            (errorMsg.emailError && (
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
                {errorMsg.emailError}
              </span>
            ))}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="flex justify-between place-items-center"
          >
            <span>Password</span>
            <Link
              href={"/signup"}
              className="text-neutral-600 text-sm hover:text-blue-500 hover:underline"
            >
              Forgot
            </Link>
          </label>

          <div className="w-full relative">
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
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
            {errorMsg.passwordError && (
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
                {errorMsg.passwordError}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <button className="bg-blue-500 blue text-white flex place-items-center justify-center gap-4 p-2  border-2 rounded-lg cursor-pointer hover:bg-blue-700">
            Login
          </button>
          <div className="w-full h-[1px] bg-neutral-200" />
          <div className="flex flex-col gap-4">
            <p className="text-neutral-600 text-sm">Or log in with:</p>
            <button
              className="flex place-items-center justify-center gap-4 p-2  border-2 rounded-lg cursor-pointer hover:bg-neutral-50"
              type="submit"
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
            No account yet?{" "}
            <Link href={"/signup"} className="hover:text-blue-500">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
