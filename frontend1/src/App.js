import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./signUpIn/signUp1";
import SignIn from "./signUpIn/signIn1";
import Post from "./posts/posts1";
import PasswordReset from "./signUpIn/passwordReset1";
import Home from "./Home/home";
import Contact from "./contact/contact";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/reset" element={<PasswordReset />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
