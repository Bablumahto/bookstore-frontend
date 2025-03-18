import React, { useEffect, useState } from "react";
import axios from "axios";
import { resolvePath } from "react-router-dom";

function Setting() {
  const [value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // change function
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-x9oa.onrender.com/api/v1/get-user-information`,
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  // suvmit button
  const submitAddress = async () => {
    const response = await axios.put(
      `https://bookstore-x9oa.onrender.com/api/v1/update-address`,
      value,
      {
        headers,
      }
    );

    alert(response.data.message);
  };
  return (
    <>
      {ProfileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 px-3">
          <h1 className=" text-3xl md:text-5xl  font-semibold text-zinc-500  mb-8">
            Setting
          </h1>
          <div className="flex gap-12">
            <div className="text-xl">
              <label htmlFor="Username">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold text-xl">
                {ProfileData.username}
              </p>
            </div>

            <div className="">
              <label htmlFor="email" className="text-xl">
                email
              </label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold text-xl">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="address" className="text-xl">
              Address
            </label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2  font-semibold text-xl"
              rows="4"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-center ">
            <button
              className="bg-yellow-400 text-zinc-900 font-semibold px-3 py-2 rounded  hover:bg-yellow-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Setting;
