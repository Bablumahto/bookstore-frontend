import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MobileNave() {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className="w-full flex  items-center justify-between lg:hidden mt-4">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full     text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/order-History"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Setting
          </Link>
        </div>
      )}

      {/* admin */}
      {role === "admin" && (
        <div className="w-full flex  items-center justify-between lg:hidden mt-4">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full     text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            AllOrders
          </Link>
          <Link
            to="/profile/add-books"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  );
}

export default MobileNave;
