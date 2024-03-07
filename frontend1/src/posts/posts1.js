import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./posts.css";
import GirlImages from "../data";

const Posts = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const observer = useRef();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current && posts.length > 0) {
      observer.current.observe(document.querySelector(".observer"));
    }

    return () => observer.current.disconnect();
  }, [posts]);

  const token = localStorage.getItem("jwttoken"); // Assuming the token is stored in local storage

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getPosts = async () => {
    setIsLoading(true);
    const res = await axios.get(`http://localhost:1000/posts?page=${page}`, {
      headers,
    });
    console.log(res);
    setPosts([...posts, ...res.data.posts]);
    setPage(page + 1);
    setIsLoading(false);
    if (res.data.status == 401 || res.data.status == 402) {
      alert("token has expired");
      navigate("/login");
    }
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      getPosts();
    }
  };

  return (
    <div>
      <header>{/* Header code */}</header>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" class="flex items-center">
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
                <NavLink to="/contact">Contact</NavLink>
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

      <div className="posts">
        {posts.map((val, index) => (
          <div className="picDes" key={index} style={{ marginTop: "10px" }}>
            <div className="image">
              <img src={val.image} alt="Post" />
            </div>
            <div className="description">
              <div style={{ paddingTop: "10px", marginBottom: "10px" }}>
                <i
                  className="fa fa-share"
                  aria-hidden="true"
                  style={{
                    paddingRight: "10px",
                    marginLeft: "10px",
                    fontSize: "25px",
                  }}
                ></i>
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                  style={{
                    paddingRight: "10px",
                    marginLeft: "10px",
                    fontSize: "25px",
                  }}
                ></i>
                <i
                  className="fa fa-comment"
                  aria-hidden="true"
                  style={{
                    paddingRight: "10px",
                    marginLeft: "10px",
                    fontSize: "25px",
                  }}
                ></i>
              </div>
              <div
                className="views"
                style={{
                  paddingLeft: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {val.likes}
              </div>
              <div
                style={{
                  fontFamily: "serif",
                  paddingLeft: "10px",
                  marginBottom: "10px",
                }}
              >
                {val.description}
              </div>
              <div style={{ paddingLeft: "10px" }}>{val.location}</div>
            </div>
          </div>
        ))}
        {isLoading && <div className="loading">Loading...</div>}
        <div className="observer"></div>
      </div>
    </div>
  );
};

export default Posts;
