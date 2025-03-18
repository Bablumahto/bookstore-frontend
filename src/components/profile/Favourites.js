import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./../Bookcard/BookCard";

function Favourites() {
  const [FavouriteBook, setFavouriteBook] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-x9oa.onrender.com/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBook(response.data.data);
    };
    fetch();
  });
  return (
    <>
      <div className=" grid md:grid-cols-4 gap-5 mx-2">
        {FavouriteBook?.length === 0 && (
          <div className="text-4xl bg-yellow-100 h-[100%] font-semibold text-zinc-500 flex items-center justify-center w">
            Nothing added to Favourite
          </div>
        )}

        {FavouriteBook &&
          FavouriteBook.map((items, i) => (
            <div key={i}>
              <BookCard data={items} Favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Favourites;
