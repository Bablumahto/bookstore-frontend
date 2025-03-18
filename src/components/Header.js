import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const links = [
    {
      title: "Home",
      link: "/",
    },

    {
      title: "All Books",
      link: "/all-book",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin",
      link: "/profile",
    },
  ];

  const [mobileNav, setMobileNav] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
    links.splice(2, 3);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2);
  }
  return (
    <>
      <nav
        className={`z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between`}
      >
        <div className="h=10 flex items-center text-white">
          <h1>Book store</h1>
        </div>
        {/* link */}
        <div className="nav-links text-white  block md:flex justify-evenly items-center gap-4">
          <div className=" hidden md:flex gap-4 ">
            {links.map((item, i) => (
              <Link to={item.link} key={i}>
                <div className="hover:text-yellow-300 duration-200 transition-all">
                  {" "}
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className=" hidden md:flex gap-4">
              <Link
                to="/sign-up"
                className=" hover:bg-blue-500 transition-all duration-300 py-1 px-2 border border-blue-500 rounded"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className=" bg-blue-500 hover:bg-transparent py-1 px-2 border rounded"
              >
                Login
              </Link>
            </div>
          )}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* mobile code */}

      <div
        className={`${mobileNav} bg-zinc-500 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className={`${mobileNav} text-white text-4xl mb-8 font-semibold block`}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false ? (
          <>
            <Link
              to="/sign-up"
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
              className={`${mobileNav} mb-8 text-4xl font-semibold text-white  hover:bg-blue-500 transition-all duration-300 py-2 px-8 border border-blue-500 rounded`}
            >
              Signup
            </Link>
            <Link
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")
              }
              to="login"
              className={`${mobileNav} mb-8 text-4xl font-semibold text-white bg-blue-500 hover:bg-transparent py-2 px-8 border rounded`}
            >
              Login
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Header;
