import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const baseButtonClass =
  "flex items-center gap-3 px-8 py-2 border border-gray-300 rounded-lg shadow-md bg-white font-medium transition duration-300  hover:shadow-lg";
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const left = (screenWidth - 500) / 2;
const top = (screenHeight - 500) / 2;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    let url = process.env.REACT_APP_API_URL + "/auth/google";
    const popup = window.open(
      url,
      "Google Login",
      `width=500,height=600,left=${left},top=${top}`
    );

    window.addEventListener(
      "message",
      (event) => {
        // if (event.origin !== "http://localhost:3000") return;

        const { user, token } = event.data;
        login(user, token); // Store user and token in context
        navigate("/user/dashboard");
      },
      { once: true }
    );
  };

  const handleFacebookLogin = () => {
    let url = process.env.REACT_APP_API_URL + "/auth/facebook";
    const popup = window.open(
      url,
      "Google Login",
      `width=500,height=600,left=${left},top=${top}`
    );

    window.addEventListener(
      "message",
      (event) => {
        // if (event.origin !== "http://localhost:3000") return;
        const { user, token } = event.data;
        login(user, token); // Store user and token in context
        // localStorage.setItem("token", token);
        // setToken(token);
        // setUser(user);
      },
      { once: true }
    );
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 md:mt-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl  font-bold text-center text-gray-900">
          {" "}
          JK Technosoft Limited
        </h1>
        <h3 className="mt-10 text-center text-xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h3>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>
        </form>

        <div className="flex flex-row justify-center items-center my-8">
          <span className="flex flex-1 h-px bg-black"></span>
          <div className="mx-4"> or continue with</div>
          <span className="flex flex-1  h-px bg-black"></span>
        </div>

        <div className="flex flex-row gap-5 justify-evenly ">
          <button
            className={`${baseButtonClass}  text-gray-700`}
            onClick={handleGoogleLogin}
          >
            <img
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              alt="Google Logo"
              className="w-6 h-6"
            />
            <span> Google</span>
          </button>

          <button
            className={`${baseButtonClass} text-blue-600`}
            onClick={handleFacebookLogin}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook Logo"
              className="w-6 h-6"
            />
            <span>Facebook</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
