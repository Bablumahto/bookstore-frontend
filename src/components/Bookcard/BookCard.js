import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function BookCard({ data, Favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  // remove book from favourite
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:8080/api/v1/remove-favourite",
      {},
      { headers }
    );
    alert("want to remove from favourite?");
  };
  return (
    <div className="bg-zinc-800  items-center">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col ">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-2 text-xl font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-400 font-semibold">{data.price}</p>
        </div>
      </Link>
      <div className=" justify-center flex pb-4">
        {" "}
        {Favourite && (
          <button
            className="bg-yellow-50 font-semibold px-2 py-3 rounded border border-yellow-100 text-yellow-500 my-2"
            onClick={handleRemoveBook}
          >
            Remove from Favourites
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;
