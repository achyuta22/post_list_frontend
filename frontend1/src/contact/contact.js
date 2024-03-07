import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  //   var transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "ravihalbharat@gmail.com",
  //       pass: "zrig xqtk fnjc tkrc",
  //     },
  //   });
  //   var mailOptions = {
  //     from: email,
  //     to: "ravihalbharat@gmail.com",
  //     subject: subject,
  //     text: message,
  //   };
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:1000/contact", {
      email,
      subject,
      message,
    });
    if (res.data.status == 400) {
      alert("error while sending mail");
    } else if (res.data.status == 200) {
      alert("mail sent successfully");
    }
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     alert("email sent");
    //     console.log("Email sent: " + info.response);
    //     // res.send({ msg: "Verification code sent", status: 266 });
    //   }
    // });
  };
  return (
    <>
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
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            "Have a question, suggestion, or just want to get in touch with us?
            Use the form below to send us a message! We'll get back to you as
            soon as possible"
          </p>
          <form action="#" class="space-y-8">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@---.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                required
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-sm font-medium bg-blue-700 text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={submitForm}
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
