import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function UserOrderHistory() {
  const [OrderHistory, setOrderHistory] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://bookstore-x9oa.onrender.com/api/v1/get-order-history`,
        { headers }
      );
      setOrderHistory(res.data.data);
      console.log(res);
    };
    fetch();
  });

  return (
    <>
      {OrderHistory && OrderHistory?.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col  items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}

      {/* lenght is greater */}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-full p-2 md:p-4 text-zinc-100">
          {" "}
          <h1 className="text-2xl md:text-4xl font-semibold text-zinc-500 mb-4 md:mb-8">
            Your Order History
          </h1>
          {/* Table Header (Hidden on Mobile) */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-2 flex gap-4 justify-center">
            <div className="w-[3%] text-center">Sr</div>
            <div className="w-[22%] text-center">Books</div>
            <div className="w-[9%] text-center">Price</div>
            <div className="w-[16%] text-center">Status</div>
            <div className="w-[5%] text-center hidden md:block">Mode</div>
          </div>
          {/* Order Items */}
          {OrderHistory.map((items, i) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-2 flex  flex-row gap-4 justify-center items-center md:items-start"
              key={i}
            >
              <div className="w-[3%] text-center">{i + 1}</div>
              <div className="w-[22%] text-center">
                <Link
                  to={`view-book-details/${items.book._id}`}
                  className="hover:text-blue-500"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[9%] text-center">{items.book.price}</div>
              {/* Status Display */}
              <div className="w-[16%] text-center font-semibold">
                {items.status === "Order placed" ? (
                  <span className="text-yellow-500">{items.status}</span>
                ) : items.status === "Cancelled" ? (
                  <span className="text-red-500">{items.status}</span>
                ) : (
                  <span className="text-green-500">{items.status}</span>
                )}
              </div>
              {/* Payment Mode (Hidden on Mobile) */}
              <div className="w-[5%] text-center hidden md:block">COD</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UserOrderHistory;
