// import { Divider } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./signUp.css";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import validator from "validator";
// import { ToastContainer, toast } from "react-toastify";
// import { toast } from "react-toastify";
// import { useToast } from "@chakra-ui/react";

const Signup = () => {
  // const toast = useToast();
  // const [udata, setudata] = useState({
  //   name: "",
  //   email: "",
  //   mobile: "",
  //   password: "",
  //   cpassword: "",
  // });

  const [fname, setfname] = useState();
  const [email, setemail] = useState();
  // const [mobile, setmobile] = useState();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const adddata = async (e) => {
    e.preventDefault();
    const validateEmail = (e) => {
      const email = e;

      if (validator.isEmail(email)) {
        alert("email format is correct");
      } else {
        alert("Please, enter valid Email!");
      }
    };
    validateEmail(email);
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
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="blacklogoamazon.png" alt="" />
        </div>

        <div className="sign_form">
          <form>
            <h1>Sign-Up</h1>
            <div className="form_data">
              <label for="fname">Your Name</label>
              <input
                type="text"
                id="fname"
                name="name"
                value={fname}
                onChange={(e) => {
                  setfname(e.target.value);
                }}
              ></input>
            </div>
            <div className="form_data">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              ></input>
            </div>

            <div className="form_data">
              <label for="Password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              ></input>
              <button
                type="button"
                className="eye_button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <div className="form_data">
              <label for="cPassword">Password Again</label>
              <input
                type={showPassword ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              ></input>
            </div>
            <button className="signin_btn" onClick={adddata}>
              Continue
            </button>

            <div className="signin_info">
              <p>Already Have an Account?</p>

              <NavLink to="/login">Sign In</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
