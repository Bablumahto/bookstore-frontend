import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/Bookcard/BookCard";

function AllBook() {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-x9oa.onrender.com/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 h-screen py-8 px-4 md:h-full">
      <h4 className="text-3xl text-yellow-100 flex justify-center">
        All Books
      </h4>
      {!Data && <div className="flex items-center justify-center"></div>}
      <div className=" my-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Data && Data.map((item) => <BookCard key={item.id} data={item} />)}
      </div>
    </div>
  );
}

export default AllBook;
