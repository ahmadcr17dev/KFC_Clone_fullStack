import React from "react";
import logo from "../images/capture.png";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <section className="bg-stone-800 w-full mt-16 py-16 px-18">
        <div className="flex flex-row justify-center mx-auto">
          <div>
            <img src={logo} alt="site logo" />
          </div>
          <div className="ml-4 flex flex-row">
            <div className="p-2 bg-white rounded-full mx-1 hover:cursor-pointer">
              {" "}
              <a href="https://www.youtube.com">
                <FaYoutube color={"red"} size={"1.5rem"} />
              </a>{" "}
            </div>
            <div className="p-2 bg-white rounded-full mx-1 hover:cursor-pointer">
              {" "}
              <a href="https://www.instagram.com">
                <FaInstagram color={"red"} size={"1.5rem"} />
              </a>{" "}
            </div>
            <div className="p-2 bg-white rounded-full mx-1">
              {" "}
              <a href="https://www.facebook.com">
                <TiSocialFacebook color={"red"} size={"1.5rem"} />
              </a>{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-evenly mt-24 text-white font-poppins text-lg font-medium">
          <div>
            <ul>
              <li className="hover:cursor-pointer">About Us</li>
              <li className="hover:cursor-pointer">Mitao Bhook</li>
              <li className="hover:cursor-pointer">Privacy Policy</li>
              <li className="hover:cursor-pointer">Careers</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="hover:cursor-pointer">Contact Us</li>
              <li className="hover:cursor-pointer">Store Locator</li>
              <li className="hover:cursor-pointer">Track Order</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="hover:cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h5 className="text-2xl mb-4">Download Our App</h5>
            <div className="flex flex-row">
              <div className="p-2 bg-white rounded-full mx-1 w-fit">
                {" "}
                <a href="https://www.apple.com">
                  <FaApple color={"black"} size={"1.5rem"} />
                </a>{" "}
              </div>
              <div className="p-2 bg-white rounded-full mx-1 w-fit">
                {" "}
                <a href="https://www.playstore.com">
                  <IoLogoGooglePlaystore color={"black"} size={"1.5rem"} />
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 text-center">
          <p className="text-xl text-white">2025 KFC || All rights reserved</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
