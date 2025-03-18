import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "./../../store/Auth";
import { useDispatch, useSelector } from "react-redux";

function Sidebar({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className=" bg-zinc-800 p-4 rounded flex flex-col items-center justify-between md:h-[100%] lg:h-[100%] mx-2">
      <div className="flex flex-col justify-center items-center">
        {" "}
        <img src={data.avatar} alt="/" className="h-[12vh]"></img>
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex-col  items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/order-History"
            className="text-zinc-100 font-semibold w-full py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Setting
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex-col  items-center justify-center hidden lg:flex">
          <Link
            to="/profile/all-orders"
            className="text-zinc-100 font-semibold w-full py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-books"
            className="text-zinc-100 font-semibold w-full py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Setting
          </Link>
        </div>
      )}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4  lg:mt-0 text-white font-semibold flex  items-center justify-center hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          navigate("/");
        }}
      >
        logout
      </button>
    </div>
  );
}

export default Sidebar;
