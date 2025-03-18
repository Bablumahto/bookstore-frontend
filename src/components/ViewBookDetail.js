import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ViewBookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/get-book-by-id/${id}`
      );
      console.log(response);
      setData(response.data.data);
    };
    fetch();
  }, []);

  // headers
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  // favoutire code
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  // handle cart
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  // delte book
  const deleteBook = async () => {
    const response = await axios.delete(`http://localhost:8080/api/v1/delete`, {
      headers,
    });
    alert(response.data.message);
    navigate("/all-book");
  };
  return (
    <>
      {data && (
        <div className="py-8 px-6 bg-zinc-900 flex flex-col gap-8 lg:flex-row items-center lg:items-start">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 p-4 rounded-lg h-auto lg:h-[88vh] flex flex-col items-center bg-zinc-900">
            <div className="flex flex-col lg:flex-row justify-around items-center w-full lg:h-[100%] bg-zinc-800 p-2 rounded-lg">
              <img
                src={data.url}
                alt="book details"
                className="h-full md:h-[70vh] lg:h-80 object-cover rounded"
              />
              {isLoggedIn && role === "user" && (
                <div className="flex gap-4 mt-4 lg:mt-0 lg:flex-col">
                  <button
                    className="bg-white flex items-center justify-center rounded-full p-3 text-3xl text-red-500 shadow-lg"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white flex items-center justify-center gap-2 rounded-full p-3 text-xl text-blue-500 shadow-lg"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {/* Admin Controls */}
              {isLoggedIn && role === "admin" && (
                <div className="flex gap-4 mt-4 lg:mt-0 lg:flex-col">
                  <button
                    className="bg-white flex items-center justify-center rounded-full p-3 text-3xl text-red-500 shadow-lg"
                    onClick={deleteBook}
                  >
                    <MdDelete />
                  </button>
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white flex items-center justify-center gap-2 rounded-full p-3 text-xl text-blue-500 shadow-lg"
                  >
                    <FaEdit />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 p-4 text-center lg:text-left">
            <h1 className="text-zinc-300 text-3xl md:text-4xl font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">{data.author}</p>
            <p className="text-zinc-500 mt-2 text-base md:text-lg">
              {data.desc}
            </p>
            <p className="flex items-center justify-center lg:justify-start text-zinc-400 mt-4 gap-2">
              <GrLanguage /> {data.language}
            </p>
            <p className="text-zinc-100 mt-4 text-2xl md:text-3xl font-semibold">
              {data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBookDetail;
