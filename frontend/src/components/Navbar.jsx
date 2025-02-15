import React, { useState } from "react";
import { FiHeart, FiShoppingCart, FiPhone } from "react-icons/fi";
import sitelogo from "../images/Capture.png";
import styled from "styled-components";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Stylednavbar = styled.nav`
  #logo {
    width: 6rem;
  }
  .menu-icon {
    display: none;
  }
  #mobile-menu {
    display: none;
  }
  #cart {
    /* margin: 1rem 0rem 0rem 0rem; */
    span {
      position: absolute;
      top: 1.4rem;
      right: 3.3rem;
      z-index: 0;
      background-color: red;
      color: white;
    }
  }
  #cart {
    /* margin: 1rem 0rem 0rem 0rem; */
    span {
      position: absolute;
      top: 1.5rem;
      right: 2.5rem;
      z-index: 0;
      background-color: red;
      color: white;
    }
  }
  #wish {
    /* margin: 1rem 0rem 0rem 0rem; */
    span {
      position: absolute;
      top: 1.5rem;
      right: 4.7rem;
      z-index: 0;
      background-color: red;
      color: white;
    }
  }
  @media (max-width: 450px) and (min-width: 0px) {
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
  @media (max-width: 1500px) and (min-width: 1400px) {
    #cart {
      /* margin: 1rem 0rem 0rem 0rem; */
      span {
        position: absolute;
        top: 1.4rem;
        right: 5.3rem;
        z-index: 0;
        background-color: red;
        color: white;
      }
    }
    #wish {
      /* margin: 1rem 0rem 0rem 0rem; */
      span {
        position: absolute;
        top: 1.4rem;
        right: 7.6rem;
        z-index: 0;
        background-color: red;
        color: white;
      }
    }
  }
  @media (max-width: 1030px) and (min-width: 800px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    #logo {
      width: 5rem;
    }
    #cart {
      /* margin: 1rem 0rem 0rem 0rem; */
      span {
        position: absolute;
        top: 1.1rem;
        right: 2rem;
      }
    }
    #wish {
      /* margin: 1rem 0rem 0rem 0rem; */
      span {
        position: absolute;
        top: 1.1rem;
        right: 4rem;
      }
    }
  }
  @media (max-width: 800px) and (min-width: 451px) {
    #logo {
      width: 3rem;
    }
    #wish {
      /* margin: 1rem 0rem 0rem 0rem; */
      span {
        position: absolute;
        top: 0.8rem;
        right: 2.4rem;
        font-size: 0.6rem;
        width: fit-content;
        height: fit-content;
        padding-inline: 5px;
      }
    }
    #cart {
      /* margin: 1rem 0rem 0rem 0rem; */
      span {
        position: absolute;
        top: 0.8rem;
        right: 0.5rem;
        font-size: 0.6rem;
        width: fit-content;
        height: fit-content;
        padding-inline: 5px;
      }
    }
  }
`;

const Navbar = () => {
  const [menu, setmenu] = useState(true);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const cartcount = useSelector((state) => state.cart.items.length);
  const wishcount = useSelector((state) => state.wish.items.length);

  const logout = () => {
    localStorage.clear("user");
    toast.success("Logout Successful");
    navigate("/");
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
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex flex-row justify-between md:px-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={sitelogo} alt="Kicks&Fits" id="logo" />
          </div>

          {/* Links & Contact Info */}
          <div className="menu-items md:flex md:items-center w-full md:w-auto mt-4 md:mt-0">
            <ul className="md:flex md:space-x-6 md:text-[0.7rem] items-center font-medium text-sm text-white ml-14">
              {/* Page Links */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    console.log("isActive:", isActive);
                    return `block py-2 md:py-0 ${
                      isActive ? "text-red-500" : "text-white"
                    }`;
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => {
                    console.log("isActive:", isActive);
                    return `block py-2 md:py-0 ${
                      isActive ? "text-red-500" : "text-white"
                    }`;
                  }}
                >
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
                      className={({ isActive }) => {
                        console.log("isActive:", isActive);
                        return `block py-2 md:py-0 ${
                          isActive ? "text-red-600" : "text-white"
                        }`;
                      }}
                      onClick={logout}
                    >
                      LogOut
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => {
                        console.log("isActive:", isActive);
                        return `block py-2 md:py-0 ${
                          isActive ? "text-red-600" : "text-white"
                        }`;
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) => {
                        console.log("isActive:", isActive);
                        return `block py-2 md:py-0 ${
                          isActive ? "text-red-600" : "text-white"
                        }`;
                      }}
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
            <FiPhone className="mr-2 md:text-[0.7rem]" />
            <a href="tel:+123456789" className="md:text-[0.7rem]">
              +123 456 789
            </a>
          </div>

          {/* Wishlist & Cart (For Larger Screens) */}
          <div className="icons hidden md:flex items-center gap-4 ml-6">
            <div id="wish">
              <NavLink to="/wishlist">
                {
                  <FiHeart
                    color={"#fff"}
                    className="xl:text-[1.2rem] lg:text-[1.2rem] md:text-[0.9rem]"
                  />
                }
              </NavLink>
              {wishcount > 0 && (
                <span className="badge badge-danger text-[0.7rem] font-semibold rounded-full text-center w-4 h-4">
                  {wishcount}
                </span>
              )}
            </div>
            <div id="cart">
              <NavLink to="/cart">
                {
                  <FiShoppingCart
                    color={"#fff"}
                    className="xl:text-[1.2rem] lg:text-[1.2rem] md:text-[0.9rem]"
                  />
                }
              </NavLink>
              {cartcount > 0 && (
                <span className="badge badge-danger text-[0.7rem] font-semibold rounded-full text-center w-4 h-4">
                  {cartcount}
                </span>
              )}
            </div>
            <div>
              {menu ? (
                <HiBars3BottomLeft
                  className="menu-icon text-xl"
                  onClick={openmenu}
                  color={"#fff"}
                />
              ) : (
                <RxCross2
                  className="menu-icon text-xl"
                  onClick={closemenu}
                  color={"#fff"}
                />
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
