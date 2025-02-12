import React from "react";
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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="admin" element={<AdminPage />}>
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="sales" element={<Sales />} />
        </Route>
        <Route path="shop" element={<ShopPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="proceed" element={<Proceed />} />
        {/* <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        ></Route> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
