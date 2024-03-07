import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from "validator";
const Signup = () => {
  const [fname, setfname] = useState();
  const [email, setemail] = useState();
  const [isChecked, setIsChecked] = useState(false);

  // const [mobile, setmobile] = useState();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const adddata = async (e) => {
    e.preventDefault();
    if (!fname || !email || !password || !cpassword) {
      alert("All fields are required");
      return;
    }
    if (!isChecked) {
      alert("Please accept the Terms and Conditions");
      return;
    }
    const validateEmail = (e) => {
      const email = e;

      if (validator.isEmail(email)) {
        // alert("email format is correct");
        return true;
      } else {
        alert("Please, enter valid Email!");
        return false;
      }
    };
    if (validateEmail(email)) {
      // setudata({
      //   fname: fname,
      //   email: email,
      //   mobile: mobile,
      //   password: password,
      //   cpassword: cpassword,
      // });
      // console.log(udata);
      console.log(fname, email, password, cpassword);

      if (password === cpassword && password) {
        console.log("passwords are matching");

        try {
          const res = await axios.post("http://localhost:1000/register", {
            fname,
            email,
            password,
            cpassword,
          });

          console.log("status", res);
          if (res.data.status == 409) {
            alert("email already in use");
          } else if (res.data.status == 201) {
            alert("email has been sent to ur account check it");
            window.localStorage.setItem("jwttoken", res.data.token);
            return;
          }
          // console.log(res.response.status);

          // Handle other status codes or success
        } catch (error) {
          console.log(error.response.status);
          // console.error("Error:", error);
          // console.log(error.response.status);
          // Handle other errors if needed
          if (error.response.status == 409) {
            // toast({
            //   title: "Email already registered",
            //   status: "error",
            //   duration: 9000,
            //   isClosable: true,
            // });
            alert("Email already registered");
            return;
          }
        }
        //   //console.log(res.response.status);
        //   if (res.status === 201) {
        //     toast.success("Data successfully added", {
        //       position: "top-center",
        //     });
        //     setfname("");
        //     setemail("");
        //     setmobile("");
        //     setpassword("");
        //     setcpassword("");
        //   } else if (res.data.status == 409) {
        //     toast.error("Email or mobile already exists", {
        //       position: "top-center",
        //     });
        //   } else if (res.data.status == 400) {
        //     toast.error("Passwords not matching", {
        //       position: "top-center",
        //     });
        //   } else if (res.data.status == 422) {
        //     toast.error("all fields are required", {
        //       position: "top-center",
        //     });
        //   } else if (res.data.status == 500) {
        //     toast.error("unknown errro", {
        //       position: "top-center",
        //     });
        //   }
        // };
      } else if (!password) {
        alert("enter a valid password");
      } else {
        console.log("eroror");
        // toast({
        //   title: "Account created.",
        //   description: "We've created your account for you.",
        //   status: "success",
        //   duration: 9000,
        //   isClosable: true,
        // });
        alert("passwords not matching");
      }
    }
  };

  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              class="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Post Link
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Your Account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="name"
                    value={fname}
                    onChange={(e) => {
                      setfname(e.target.value);
                    }}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="achyuta"
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  className="eye_button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    value={cpassword}
                    onChange={(e) => {
                      setcpassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required="true"
                      onChange={() => setIsChecked(!isChecked)}
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={adddata}
                  class="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                >
                  Create an account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    class="font-medium  text-blue-600 hover:underline dark:text-primary-500"
                  >
                    <NavLink to="/login">Login</NavLink>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
