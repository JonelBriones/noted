"use client";
import Image from "next/image";
import React, { useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import Link from "next/link";

const Signup = () => {
  const [toggleHidePassword, setToggleHidePassword] = useState(true);
  return (
    <div className="md:w-[540px] p-8 w-full flex gap-4 flex-col justify-center">
      <div className="flex justify-center">
        <Image
          src={"/images/logo.svg"}
          width={0}
          height={0}
          alt="logo"
          className="w-[95px] h-[28px]"
        />
      </div>
      <div className="text-center">
        <h1 className="font-bold text-3xl">Create Your Account</h1>
        <p className="text-neutral-400">
          Sign up to start organizing your nots and boost your productivity.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="email@example.com"
            className="p-2 rounded-lg border-2 text-neutral-500 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">
            <span>Password</span>
          </label>

          <div className="w-full relative">
            {toggleHidePassword ? (
              <input
                type="password"
                className="p-2 rounded-lg border-2 text-neutral-500 text-sm w-full"
              />
            ) : (
              <input
                type="text"
                className="p-2 rounded-lg border-2 text-neutral-500 text-sm w-full"
              />
            )}
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
          <div className="flex place-items-center gap-2">
            <Image
              src={"/images/icon-info.svg"}
              width={0}
              height={0}
              alt="icon-hide-password"
              className="size-4"
            />

            <span className="text-neutral-600 text-xs">
              At least 8 characters
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <PrimaryBtn text="Sign up" backgroundColor="bg-blue-500" />
          <div className="w-full h-[1px] bg-neutral-200" />
          <p className="text-neutral-600 text-sm">Or log in with:</p>
          <div className="flex place-items-center justify-center  gap-4 p-2 text-neutral-950 text-sm font-medium border-2 rounded-lg cursor-pointer">
            <Image
              src={"/images/icon-google.svg"}
              width={0}
              height={0}
              alt="icon-google"
              className="size-[16px]"
            />
            Google
          </div>
          <Link href={"/login"} className="text-neutral-600 text-sm">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
