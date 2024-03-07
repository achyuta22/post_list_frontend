import React, { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const SignIn1 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   const { user, setuser, islogged, setislogged, nitems, phone, setphone } =
  // useContext(CountContext);
  const [logdata, setdata] = useState({
    email: "",
    password: "",
  });
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const senddata = async (e) => {
    const token = localStorage.getItem("jwtToken");

    e.preventDefault();
    await setdata({
      email,
      password,
    });
    console.log(email, password);
    // const res = await axios.post("http://localhost:1000/login", {
    //   email,
    //   password,
    // });
    const res = await axios.post(
      "http://localhost:1000/login",
      {
        email,
        password,
      },
      {
        // headers: {
        //   Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        // },
      }
    );
    if (res.data.status == 201) {
      await window.localStorage.setItem("jwttoken", res.data.token);
      alert("successful login");
      navigate("/post");
    } else if (res.data.status == 404) {
      alert("email not registered");
    } else if (res.data.status == 400) {
      alert("incorrect password");
    }
  };

  return (
    <div>
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
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="true"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    // onChange={adddata}
                    value={password}
                  />
                </div>
                <button
                  type="button"
                  className="eye_button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
                <div class="flex items-start">
                  {/* <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div> */}
                  <div class="ms-3 text-sm">
                    {/* <label
                      for="remember"
                      class="font-medium text-gray-500 dark:text-gray-400"
                    >
                      Remember this device
                    </label> */}
                  </div>
                  <a
                    href="#"
                    class="text-left text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    <NavLink to="/reset"> Lost Password? </NavLink>
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={senddata}
                >
                  Login to your account
                </button>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  Not registered yet?{" "}
                  <a class="text-blue-600 hover:underline dark:text-blue-500">
                    <NavLink to="/signup">Create your Account</NavLink>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn1;
