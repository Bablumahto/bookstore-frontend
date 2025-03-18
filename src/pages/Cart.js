import React, { useEffect, useState } from "react";

import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [Cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // headers
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  // data fetching
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-x9oa.onrender.com/api/v1/get-user-cart`,
        {
          headers,
        }
      );
      setCart(response.data.data);
    };
    fetch();
  });

  // total in cart
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((itmes) => {
        total += itmes.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `https://bookstore-x9oa.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},
      {
        headers,
      }
    );
    alert(response.data.message);
  };

  // order place
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `https://bookstore-x9oa.onrender.com/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/order-History");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* if cart is empty */}
      {Cart && Cart.length === 0 && (
        <div className="bg-zinc-800 h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl  font-semibold text-zinc-400">
              empty cart
            </h1>
          </div>
        </div>
      )}

      {/* cart data */}

      {Cart && Cart.length > 0 && (
        <>
          <div className="bg-zinc-900 py-4 h-[100vh]">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8 text-center">
              your cart
            </h1>
            {Cart.map((items, i) => (
              <div className="mx-4" key={i}>
                <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center px-4">
                  <img
                    src={items.url}
                    alt="/"
                    className="h-[20vh] md:h-[10vh] object-cover"
                  />
                  <div className="w-full md:w-auto">
                    <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                      {items.title}
                    </h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                      {items.desc.slice(0, 100)}...
                    </p>
                    <p className="text-normal text-zinc-300 mt-2 hidden  md:block lg:hidden">
                      {items.desc.slice(0, 30)}..
                    </p>
                    <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                      {items.desc.slice(items.desc.slice(0, 100))}
                    </p>
                  </div>
                  <div className="flex mt-4 w-full  md:w-auto items-center justify-between">
                    <h2 className="text-zinc-100 text-3xl flex font-semibold">
                      {items.price}
                    </h2>
                    <button
                      className="bg-red-100 text-red-700 border-red-700 rounded  p-2 ms-12"
                      onClick={() => deleteItem(items._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {Cart && Cart.length > 0 && (
              <div className="mt-4 w-full  flex items-center justify-end pr-4">
                <div className="p-4 bg-zinc-800 rounded">
                  <h1 className="text-3xl text-zinc-300 font-semibold">
                    Total amount
                  </h1>
                  <div className="mt-3 flex items-center justify-between text-xl text-zinc-300 ">
                    <h2>{Cart.length}books</h2>
                    <h2>{total}</h2>
                  </div>
                  <div className="w-[100%] mt-3">
                    <button
                      className="bg-zinc-100 rounded  px-4 py-2  flex justify-center w-full font font-semibold hover:bg-zinc-900  hover:text-zinc-100 transition-all duration-500"
                      onClick={placeOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
