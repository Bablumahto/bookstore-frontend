import React, { useEffect, useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router-dom";

import axios from "axios";
import MobileNave from "../components/profile/MobileNave";

function Profile() {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-x9oa.onrender.com/api/v1/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  });
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white gap-4 ">
      {profile && (
        <>
          <div className="md:w-1/6 w-full h-auto lg:h-full">
            <Sidebar data={profile}></Sidebar>
            <MobileNave></MobileNave>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet></Outlet>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default Profile;
