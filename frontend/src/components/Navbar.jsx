import React, { useState } from "react";
import { FiHeart, FiShoppingCart, FiPhone } from "react-icons/fi";
import sitelogo from "../images/Capture.png";
import styled from "styled-components";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Stylednavbar = styled.nav`
  #logo{
    width: 6rem;
  }
  .menu-icon {
    display: none;
  }
  #mobile-menu {
    display: none;
  }
  @media (max-width: 500px) and (min-width: 0px) {
    #logo {
      width: 4rem;
    }
    .phone {
      display: none;
    }
    .menu-items {
      display: none;
    }
    .icons {
      display: flex;
    }
    .menu-icon {
      display: block;
    }
    #mobile-menu {
      display: none;
      flex-direction: column;
      padding: 0rem 0rem 1rem 0rem;
      margin-left: -1.5rem;
      ul li {
        padding: 5px 0px 5px 10px;
      }
    }
  }
`;

const Navbar = () => {
  const [menu, setmenu] = useState(true);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("user");
    toast.success("Logout Successful");
    navigate('/');
  };

  const openmenu = () => {
    if (window.innerWidth <= 500) {
      document.getElementById("mobile-menu").style.display = "block";
      setmenu(false);
    } else if (window.innerWidth > 500) {
      document.getElementById("mobile-menu").style.display = "none";
      setmenu(true);
    }
  };

  const closemenu = () => {
    document.getElementById("mobile-menu").style.display = "none";
    setmenu(true);
  };

  return (
    <Stylednavbar className="bg-stone-800 text-black shadow-lg font-poppins">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex flex-row justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={sitelogo} alt="Kicks&Fits" id="logo"/>
          </div>

          {/* Links & Contact Info */}
          <div className="menu-items md:flex md:items-center w-full md:w-auto mt-4 md:mt-0">
            <ul className="md:flex md:space-x-6 items-center font-medium text-sm text-white ml-14">
              {/* Page Links */}
              <li>
                <NavLink
                  to="/"
                  className="block py-2 md:py-0"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="shop" className="block py-2 md:py-0">
                  Shop
                </NavLink>
              </li>
              <li>
                <a href="#" className="block py-2 md:py-0">
                  About
                </a>
              </li>
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 md:py-0"
                      onClick={logout}
                    >
                      LogOut
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 md:py-0"
                    >
                      Account
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="login"
                      className="block py-2 md:py-0"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="signup"
                      className="block py-2 md:py-0"
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          {/* Contact Info */}
          <div className="phone mt-4 md:mt-0 md:ml-6 flex items-center text-white">
            <FiPhone className="mr-2" />
            <a href="tel:+123456789">
              +123 456 789
            </a>
          </div>

          {/* Wishlist & Cart (For Larger Screens) */}
          <div className="icons hidden md:flex items-center gap-4 ml-6">
            <a href="#" className="text-xl">
              <FiHeart color={'#fff'}/>
            </a>
            <a href="#" className="text-xl">
              <FiShoppingCart color={'#fff'}/>
            </a>
            <div>
              {menu ? (
                <HiBars3BottomLeft
                  className="menu-icon text-xl"
                  onClick={openmenu}
                  color={'#fff'}
                />
              ) : (
                <RxCross2 className="menu-icon text-xl" onClick={closemenu} color={'#fff'}/>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className="md:flex md:items-center w-full md:w-auto mt-4 md:mt-0 text-white"
        id="mobile-menu"
      >
        <ul className="md:flex md:space-x-6 items-center font-semibold text-sm ml-14">
          {/* Page Links */}
          <li>
            <a href="#" className="block py-2 md:py-0 hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0 hover:text-blue-500">
              Shop
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0 hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0 hover:text-blue-500">
              Login
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0 hover:text-blue-500">
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </Stylednavbar>
  );
};

export default Navbar;
