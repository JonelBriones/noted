"use client";
import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = () => {
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="m-auto md:w-[540px] p-8 w-full flex gap-4 flex-col justify-center">
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
        <h1 className="font-bold text-3xl">Forgotten your password?</h1>
        <p className="text-neutral-400">
          Enter your email below, and we'll send you a link to reset it.
        </p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="email@example.com"
            className="p-2 rounded-lg border-2 border-neutral-300 text-neutral-500 text-sm hover:bg-neutral-50 outline-none  outline-offset-2 focus:border-neutral-600 focus:ring-neutral-600 focus:outline-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-6 text-center">
          <PrimaryBtn
            text="Send Reset Link"
            backgroundColor="bg-blue-500"
            textColor="text-white"
            hoverColor="hover:bg-blue-700"
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
