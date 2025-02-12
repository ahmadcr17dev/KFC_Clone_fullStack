import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { PiCirclesThreePlus } from "react-icons/pi";
import { PiUsersThree } from "react-icons/pi";
import { PiCoins } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import sitelogo from "../images/Capture.png";

const AdminSideBar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.clear("user");
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <>
      <section className="flex flex-col justify-container h-full w-fit font-poppins">
        <img
          src={sitelogo}
          alt="Kicks&Fits"
          id="logo"
          style={{
            width: "4rem",
            marginTop: "2rem",
            marginBottom: "3rem",
            marginLeft: "1rem",
          }}
        />
        <NavLink
          to="allproducts"
          className={({ isActive }) => {
            console.log("isActive:", isActive);
            return `flex flex-row text-white py-3 pl-3 pr-5 mb-1 rounded ${
              isActive ? "bg-black" : "hover:bg-black"
            }`;
          }}
        >
          <AiOutlineProduct color={"white"} size={"1.17rem"} />
          <p className="text-sm ml-2">All Products</p>
        </NavLink>
        <NavLink
          to="addproducts"
          className={({ isActive }) => {
            console.log("isActive:", isActive);
            return `flex flex-row text-white py-3 pl-3 pr-5 mb-1 rounded ${
              isActive ? "bg-black" : "hover:bg-black"
            }`;
          }}
        >
          <PiCirclesThreePlus color={"white"} size={"1.17rem"} />
          <p className="text-sm ml-2">Add Product</p>
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) => {
            console.log("isActive:", isActive);
            return `flex flex-row text-white py-3 pl-3 pr-5 mb-1 rounded ${
              isActive ? "bg-black" : "hover:bg-black"
            }`;
          }}
        >
          <PiUsersThree color={"white"} size={"1.17rem"} />
          <p className="text-sm ml-2">Users</p>
        </NavLink>
        <NavLink
          to="sales"
          className={({ isActive }) => {
            console.log("isActive:", isActive);
            return `flex flex-row text-white py-3 pl-3 pr-5 mb-1 rounded ${
              isActive ? "bg-black" : "hover:bg-black"
            }`;
          }}
        >
          <PiCoins color={"white"} size={"1.17rem"} />
          <p className="text-sm ml-2">Sales</p>
        </NavLink>
        <NavLink
          to="/"
          className="flex flex-row text-white py-3 pl-3 pr-5 mb-1 rounded hover:cursor-pointer hover:bg-black"
          onClick={handlelogout}
        >
          <IoLogOutOutline color={"white"} size={"1.17rem"} />
          <p className="text-sm ml-2">LogOut</p>
        </NavLink>
      </section>
    </>
  );
};

export default AdminSideBar;
