import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  // headers
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // change
  const Change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // submit function
  const Submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.desc === "" ||
        Data.price === "" ||
        Data.author === "" ||
        Data.language === ""
      ) {
        alert("all fields are required");
      } else {
        const response = await axios.post(
          "https://bookstore-x9oa.onrender.com/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate("/all-book");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="h-[100%] p-0 md:p-4">
        <h1 className="text-3xl md:text-5xl font font-semibold text-zinc-500 mb-8 flex  justify-center md:justify-start">
          Add Book
        </h1>
        <div className="p-4 bg-zinc-800 rounded h-[75vh]">
          {/* url code */}
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Image
            </label>
            <input
              type="text"
              name="url"
              placeholder="url of image"
              required
              value={Data.url}
              onChange={Change}
              className="w-full mt-2  bg-zinc-900  text-zinc-100 p-2  outline-none"
            />
          </div>

          {/* title */}
          <div className="">
            <label htmlFor="" className="text-zinc-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title of book"
              required
              value={Data.title}
              onChange={Change}
              className="w-full mt-2  bg-zinc-900  text-zinc-100 p-2  outline-none"
            />
          </div>

          {/* author */}
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Author
            </label>
            <input
              type="text"
              name="author"
              placeholder="Author of book"
              required
              value={Data.author}
              onChange={Change}
              className="w-full mt-2  bg-zinc-900  text-zinc-100 p-2  outline-none"
            />
          </div>

          {/* language */}
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              name="language"
              placeholder="language of book"
              required
              value={Data.language}
              onChange={Change}
              className="w-full mt-2  bg-zinc-900  text-zinc-100 p-2  outline-none"
            />
          </div>

          {/* price */}
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="text"
              name="price"
              placeholder="price"
              required
              value={Data.price}
              onChange={Change}
              className="w-full mt-2  bg-zinc-900  text-zinc-100 p-2  outline-none"
            />
          </div>

          {/* desc */}
          <div className="">
            <label htmlFor="" className="text-zinc-400 h-[50%]">
              description
            </label>
            <textarea
              type="text"
              name="desc"
              rows="5"
              placeholder="description of book"
              required
              value={Data.desc}
              onChange={Change}
              className="w-full mt-2  bg-zinc-900  text-zinc-100 p-2  outline-none"
            />
          </div>
          <div className="flex items-center justify-center">
            {" "}
            <button
              className="mt-4 px-4 py-1 bg-blue-500 text-white text-2xl md:text-xl font-semibold rounded hover:bg-blue-400 transition-all duration-300"
              onClick={Submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
          
    </>
  );
}
