import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const Verify = () => {
  const navigate = useNavigate();
  const [resetCode, setresetCode] = useState();
  const [email, setemail] = useState();
  // const [mobile, setmobile] = useState();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const code = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1000/code", {
        email: email,
      });
      if (res.data.status == 266) {
        alert("a code has been sent to your email");
      } else if (res.data.status == 404) {
        alert("email has not been registered");
      }
    } catch (error) {}
  };
  const verify = async (e) => {
    e.preventDefault();
    if (resetCode) {
      if (password == cpassword) {
        try {
          const res = await axios.put("http://localhost:1000/verify", {
            email: email,
            code: resetCode,
            password: password,
          });
          if (res.data.status == 201) {
            alert("password reset");
            setemail("");
          } else if (res.data.status == 405) {
            alert("retry error occurred");
          } else if (res.data.status == 466) {
            alert("enter valid code");
          }
        } catch (error) {
          console.log(error);
          alert("some error occurred");
        }
      } else {
        alert("passwords not matching");
      }
    } else {
      alert("enter valid code");
    }
  };
  return (
    <div>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a class="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="mr-3 h-6 sm:h-9"
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Post Link
              </span>
            </a>
            <div class="flex items-center lg:order-2">
              <a
                href="/contact"
                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                <NavLink to="/post">Posts</NavLink>
              </a>
              <button
                href="#"
                class="text-red bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log Out
              </button>
            </div>
            <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </header>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div class="flex flex-col justify-center">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Explore a visual journey
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Here at Post Link, we prioritize the security and experience of
              our users. Our platform is designed to ensure that your data is
              protected and that you have a seamless browsing experience.
            </p>
            <a
              href="#"
              class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more about our app
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div>
            <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Post Link
              </h2>
              <form class="mt-8 space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required="true"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    class=" mt-5 w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={code}
                  >
                    Send verfication to email
                  </button>
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Verification Code
                  </label>
                  <input
                    type="code"
                    name="code"
                    id="code"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={resetCode}
                    onChange={(e) => {
                      setresetCode(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                type={showPassword ? "text" : "password"}
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Re enter password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={cpassword}
                    onChange={(e) => {
                      setcpassword(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={verify}
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verify;
