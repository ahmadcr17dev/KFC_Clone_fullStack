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
import UpdateProduct from "./components/UpdateProduct";
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="admin" element={<AdminPage />}>
          <Route index element={<Navigate to="allproducts" replace />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="updateproducts" element={<UpdateProduct />} />
        </Route>
        <Route path="shop" element={<ShopPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist/>} />
        {/* <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        ></Route> */}
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
