import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FormEvent } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          username: username,
          password: password,
        },
      );
      const { data } = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setWarning(
          "Login Successfully... Please wait to redirect to dashboard"
        );

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
      }
    } catch (error: any) {
      console.error(error.response.data.data.error);
      setWarning("User Not Found on the Database or Credentials Not Found");
    }
  };

  return (
    <>
      <Head>
        <title>Login | My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex justify-center ">
        <div className="w-2/3 hidden md:flex ">
          <Image src="https://is3.cloudhost.id/kedaiedukasi/assets/image/login.avif" width={5000} height={5000} alt="testing" className="object-cover border-primary  border-r-2 rounded-e-3xl"/>
        </div>
        <div className="md:w-1/3 flex justify-center  items-center">
          <div className="md:max-w-md   w-full px-6 py-8 bg-white shadow-2xl shadow-primary rounded-3xl justify-center">
            <div className="justify-center flex">
              <Link href="/" className="flex items-center pl-2.5 mb-5">
                <Image
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-6 mr-3 sm:h-7"
                  alt="Flowbite Logo"
                  width={28}
                  height={28}
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
                  Kedai Programmer
                </span>
              </Link>
            </div>
            <h2 className="text-2xl font-mono mb-4">Sign in to your account</h2>
            {warning && (
              <div className="bg-primary border rounded-xl p-4 mb-4 text-white">
                {warning}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-gray-700 font-poppins font-medium"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Sign In
              </button>
            </form>
            <div className="mt-6 text-sm text-gray-600 justify-center items-center flex">
              <Link
                href="/forgot-password"
                className="text-indigo-500 hover:text-indigo-600 font-poppins"
              >
                Forgot password?
              </Link>
              <span className="mx-2">·</span>
              <Link
                href="/register"
                className="text-indigo-500 font-poppins hover:text-indigo-600"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
