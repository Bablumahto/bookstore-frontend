import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = async (e) => {
    try {
      if (
        values.username === " " ||
        values.email === " " ||
        values.password === " " ||
        values.address === " "
      ) {
        alert("all fields are required");
      } else {
        const response = await axios.post(
          "https://bookstore-x9oa.onrender.com/api/v1/register",
          values
        );
        console.log(response);

        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="md:h-[85vh] h-[87vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
        <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Signup</p>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                username
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="username"
                name="username"
                required
                value={values.username}
                onChange={change}
              />
            </div>
            {/* email */}
            <div>
              <label htmlFor="" className="text-zinc-400">
                email
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="email"
                name="email"
                required
                value={values.email}
                onChange={change}
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="" className="text-zinc-400">
                password
              </label>
              <input
                type=" password"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder=" password"
                name=" password"
                required
                value={values.passwordl}
                onChange={change}
              />
            </div>
            {/* address */}
            <div>
              <label htmlFor="" className="text-zinc-400">
                address
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="address"
                name="address"
                required
                value={values.address}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <button
                className="w-full bg-blue-500 text-white font-semibold py-2"
                onClick={submit}
              >
                Signup
              </button>
              <p className="flex mt-4 items-center justify-center text-zinc-200 font-serif">
                or
              </p>
              <p className="flex mt-4 items-center justify-center text-zinc-200 font-serif">
                Already have an Account?
                <Link to="/login">
                  <u>Login</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
