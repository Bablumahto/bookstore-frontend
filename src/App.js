import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllBook from "./pages/AllBook";
import Cart from "./pages/Cart";
import { Navigate } from "react-router-dom";

import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/Auth";
import Favourites from "./components/profile/Favourites";
import UserOrderHistory from "./components/profile/UserOrderHistory";
import Setting from "./components/profile/Setting";
import ViewBookDetail from "./components/ViewBookDetail";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());

      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  });
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-book" element={<AllBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetail />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />

        <Route path="/profile" element={<Profile />}>
          {/* Nested Routes for Profile */}
          <Route
            index
            element={
              role === "user" ? <Favourites /> : <Navigate to="all-orders" />
            }
          />
          <Route path="settings" element={<Setting />} />
          <Route path="order-history" element={<UserOrderHistory />} />
          <Route path="all-orders" element={<AllOrders />} />

          {role === "admin" && (
            <Route path="/profile/add-books" element={<AddBook />} />
          )}
        </Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
