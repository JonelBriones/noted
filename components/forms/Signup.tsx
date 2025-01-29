"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ReactLoader } from "../ReactLoader";
const Signup = ({ user }: any) => {
  const [success, setSuccess] = useState(false);
  const [toggleHidePassword, setToggleHidePassword] = useState(true);
  const [toggleHideConfirmPassword, setToggleHideConfirmPassword] =
    useState(true);

  const [errorMsg, setError] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ emailError: "", passwordError: "", confirmPasswordError: "" });
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };
  const { email, password, confirmPassword } = signUpForm;

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email == "") {
      setError({
        ...errorMsg,
        emailError: "Please enter a valid email address",
      });
      return;
    }

    if (password == "" || password.length < 8) {
      console.log("password under 8");
      setError({
        ...errorMsg,
        passwordError: "Password must be at least 8 characters.",
        emailError: "",
      });
      return;
    }

    if (password !== confirmPassword) {
      console.log("passwords dont match");
      setError({
        ...errorMsg,
        confirmPasswordError: "Confirm Password does not match.",
        emailError: "",
      });
      return;
    }

    const foundUser = user.find((u: any) => u.email == email);
    if (foundUser) {
      setError({
        ...errorMsg,
        emailError: "Email already taken. Please use another email.",
      });
      return;
    } else {
      setError({
        ...errorMsg,
        emailError: "",
      });
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
      signin: true,
    });
    setSuccess(true);
    toast.success("You successfully signed up!");
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        redirect("/login");
      }, 3000);
    }
  }, [success]);

  return (
    <div className="m-auto md:w-[540px] h-full p-8 w-full flex gap-4 flex-col justify-start">
      <ToastContainer autoClose={3000} />
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

      {success ? (
        <div className="flex flex-col place-items-center gap-14 h-20 ">
          <span className="relative">
            <span className="absolute right-[24px]">
              <ReactLoader color={"#335CFF"} loading={success} />
            </span>
          </span>

          <h1>Returning to Login Page</h1>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              autoComplete="email"
              onChange={(e) => onChangeHandler(e)}
              id="email"
              name="email"
              placeholder="email@example.com"
              className={`p-2 rounded-lg border-2 border-neutral-300 text-neutral-500 text-sm hover:bg-neutral-50 outline-none  ${
                errorMsg.emailError
                  ? "border-red-500"
                  : "outline-offset-2 focus:border-neutral-600 focus:ring-neutral-600 focus:outline-neutral-500"
              }`}
            />
            {errorMsg.emailError && (
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
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="flex justify-between place-items-center"
            >
              <span>Password</span>
            </label>
            <div className="w-full relative">
              <input
                id="password"
                name={"password"}
                autoComplete="new-password"
                onChange={(e) => onChangeHandler(e)}
                type={toggleHidePassword ? "password" : "text"}
                className={`p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full`}
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
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="flex justify-between place-items-center"
            >
              <span>Confirm Password</span>
            </label>
            <div className="w-full relative">
              <input
                id="confirmPassword"
                onChange={(e) => onChangeHandler(e)}
                name={"confirmPassword"}
                autoComplete="new-password"
                type={toggleHideConfirmPassword ? "password" : "text"}
                className={`p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full  ${
                  errorMsg.confirmPasswordError
                    ? "border-red-500"
                    : "outline-offset-2 focus:border-neutral-600 focus:ring-neutral-600 focus:outline-neutral-500"
                }`}
              />
              <div
                onClick={() =>
                  setToggleHideConfirmPassword(!toggleHideConfirmPassword)
                }
              >
                <Image
                  src={`/images/icon-${
                    toggleHideConfirmPassword ? "hide" : "show"
                  }-password.svg`}
                  width={0}
                  height={0}
                  alt="icon-hide-password"
                  className="size-5 absolute right-4 top-[10px] cursor-pointer"
                />
              </div>
            </div>
            {errorMsg.confirmPasswordError && (
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
                {errorMsg.confirmPasswordError}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-6 text-center">
            <button className="bg-blue-500 text-white flex place-items-center justify-center gap-4 p-2  border-2 rounded-lg cursor-pointer hover:bg-blue-700">
              Signup
            </button>
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
      )}
    </div>
  );
};

export default Signup;
