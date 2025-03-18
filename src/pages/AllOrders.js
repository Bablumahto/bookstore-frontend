import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

function AllOrders() {
  const [Allorder, setAllOrder] = useState();
  const [Options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-x9oa.onrender.com/api/v1/get-all-orders`,
        { headers }
      );
      setAllOrder(response.data.data);
      // console.log(response);
    };
    fetch();
  }, []);

  // change
  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  // submitchanges
  const submitChanges = async (i) => {
    const id = Allorder[i]._id;
    const response = await axios.put(
      `https://bookstore-x9oa.onrender.com/api/v1/update-status/${id}`,
      values,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {Allorder && Allorder.length > 0 && (
        <div className="h-[100%] p-0  md:p-4 text-zinc-50">
          <h1 className="text-3xl md:text-5xl  font-semibold text-zinc-500">
            All Orders
          </h1>
          <div className=" mt-4 bg-zinc-800 w-full  rounded py-2 px-4  flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:flex">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="">
                <FaUserLarge></FaUserLarge>
              </h1>
            </div>
          </div>
          {Allorder &&
            Allorder.map((items, i) => (
              <div
                className="bg-zinc-800 w-full  rounded  py-2 px-4  flex gap-2 "
                key={i}
              >
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  {/* <h1>{items.book.desc.slice(0, 50)}...</h1> */}
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1>{items.book.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button
                      className="hover:scale-105 transition-all duration-300"
                      onClick={() => setOptions(i)}
                    >
                      {items.status === "Order Placed" ? (
                        <div className="text-yellow-500">{items.status}</div>
                      ) : items.status === "Canceled" ? (
                        <div className="text-red-500">{items.status}</div>
                      ) : (
                        <div className="text-green-500">{items.status}</div>
                      )}
                    </button>
                    <div className={`${Options == i ? "flex" : "hidden"}`}>
                      <select
                        name="status"
                        id=""
                        className="bg-gray-800"
                        onChange={change}
                        value={values.status}
                      >
                        {[
                          "Order placed",
                          "Out for Delivery",
                          "Canceled",
                          "Delivered",
                        ].map((items, i) => (
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-500 hover:text-pink-500 mx-2"
                        onClick={() => {
                          setOptions(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck></FaCheck>
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
}

export default AllOrders;
