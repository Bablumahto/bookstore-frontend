import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/Auth";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [values, setValues] = useState({
    username: "",

    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = async (e) => {
    try {
      if (values.username === " " || values.password === " ") {
        alert("all fields are required");
      } else {
        const response = await axios.post(
          "https://bookstore-x9oa.onrender.com/api/v1/login",
          values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      }
    } catch (error) {
      alert("wrong details");
    }
  };

  return (
    <>
      <div className="h-[87vh] bg-zinc-900 px-12 py-8 flex items-center  md:justify-center">
        <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Login</p>
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

            <div className="mt-4">
              <button
                className="w-full bg-blue-500 text-white font-semibold py-2"
                onClick={submit}
              >
                Login
              </button>
              <p className="flex mt-4 items-center justify-center text-zinc-200 font-serif">
                or
              </p>
              <p className="flex mt-4 items-center justify-center text-zinc-200 font-serif">
                Don't have an Account?
                <Link to="/sign-up">
                  <u>SignUp</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
