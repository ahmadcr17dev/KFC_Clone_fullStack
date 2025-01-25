import React from "react";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "typeface-poppins";
import PrivateRoute from "./components/PrivateRoute";
import ShopPage from "./pages/ShopPage";
import AdminUsers from "./components/AdminUsers";
import AddProducts from "./components/AddProducts";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="admin" element={<AdminPage />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="addproducts" element={<AddProducts />} />
        </Route>
        <Route path="shop" element={<ShopPage />}></Route>
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
