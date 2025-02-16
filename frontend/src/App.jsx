import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "typeface-poppins";
import PrivateRoute from "./components/PrivateRoute";
import ShopPage from "./pages/ShopPage";
import AdminUsers from "./components/AdminUsers";
import AddProducts from "./components/AddProducts";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Proceed from "./components/Proceed";
import Sales from "./components/Sales";
import { initialcart } from "./redux/cartslice";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [user, setuser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialcart());
  }, [dispatch]);

  useEffect(() => {
    const storeduser = localStorage.getItem("user");

    try {
      if (storeduser) {
        const parsedUser = JSON.parse(storeduser);
        if (typeof parsedUser === "object" && parsedUser !== null) {
          setuser(parsedUser);
        } else {
          console.error("Invalid user data:", parsedUser);
          localStorage.removeItem("user"); // Clear invalid data
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear invalid data
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        ></Route>
        <Route path="login" element={<LoginPage setuser={setuser} />} />
        <Route path="signup" element={<SignupPage />}></Route>
        <Route
          path="shop"
          element={
            <>
              {" "}
              <Navbar />
              <ShopPage />
              <Footer />{" "}
            </>
          }
        />
        <Route
          path="cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="wishlist"
          element={
            <>
              <Navbar />
              <Wishlist />
              <Footer />
            </>
          }
        />
        <Route
          path="proceed"
          element={
            <>
              <Navbar />
              <Proceed />
              <Footer />
            </>
          }
        />
        <Route
          path="admin"
          element={
            <PrivateRoute requiredRole={"admin"}>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="allproducts" replace />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="sales" element={<Sales />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
