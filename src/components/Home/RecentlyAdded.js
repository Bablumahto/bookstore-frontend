import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Bookcard/BookCard";

function RecentlyAdded() {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-x9oa.onrender.com/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      <div className=" h-full py-4">
        <div className="my-8 px-4 text-white h-full">
          <h4 className="md:text-5xl text-3xl text-yellow-100 flex justify-center">
            Recetly Added Books
          </h4>

          <div className="my-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Data &&
              Data.map((items, i) => {
                return (
                  <div key={i}>
                    <BookCard data={items} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentlyAdded;
