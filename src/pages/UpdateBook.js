import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBook() {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  // headers
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
    bookid: id,
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
        const response = await axios.put(
          `https://bookstore-x9oa.onrender.com/api/v1/update-book`,
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
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // update books
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-x9oa.onrender.com/api/v1/get-book-by-id/${id}`
      );
      console.log(response);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      <div className="h-[100%] p-0 md:p-4 bg-zinc-900">
        <h1 className="text-3xl md:text-5xl font font-semibold text-zinc-500 mb-8">
          Update Book
        </h1>
        <div className="p-4 bg-zinc-800 rounded">
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
            <label htmlFor="" className="text-zinc-400">
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
            <label htmlFor="" className="text-zinc-400">
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
              className="mt-4 px-3 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 transition-all duration-300"
              onClick={Submit}
            >
              update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
