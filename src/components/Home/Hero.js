import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="h-[80vh] md:h-[100vh] flex flex-col md:flex-row">
      <div className="w-full lg:w-3/6 flex  flex-col px-12 py-8 lg:items-start justify-center">
        <h1 className="sm:text-4xl md:text-6xl lg:text-left text-center text-yellow-100">
          Your Next Great Read Awaits
        </h1>
        <p className="mt-4 text-xl text-zinc-300 py-4 lg:text-left text-center ">
          Discover a world of imagination and knowledge with every page. Dive
          into adventures, explore new ideas, and inspire dreams.
        </p>
        <div className="mt-8 items center flex justify-center">
          <Link
            to="/all-book"
            className="bg-yellow-100 px-6 md:px-10 py-2 text-center
             items-center hover:bg-zinc-800 hover:text-zinc-200 duration-300 rounded-full text-xl lg:3xl"
          >
            Discover books
          </Link>
        </div>
      </div>
      <div className="lg:w-3/6 w-full md:h-[100%]  items-center justify-center sm:items-center">
        <img src="book.png" alt="book store image" className="object-cover" />
      </div>
    </div>
  );
}

export default Hero;
