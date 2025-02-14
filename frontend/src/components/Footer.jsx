import React from "react";
import logo from "../images/capture.png";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import styled from "styled-components";

const Styledsection = styled.section`
  @media (max-width: 640px){
    .footer{
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
    }
  }
`;

const Footer = () => {
  return (
    <>
      <Styledsection className="bg-stone-700 w-full mt-0 py-16 px-18">
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
        <div className="footer flex flex-row justify-evenly mt-24 text-white font-poppins xl:text-lg lg:text-lg md:text-sm font-medium">
          <div className="mb-6">
            <ul>
              <li className="hover:cursor-pointer">About Us</li>
              <li className="hover:cursor-pointer">Mitao Bhook</li>
              <li className="hover:cursor-pointer">Privacy Policy</li>
              <li className="hover:cursor-pointer">Careers</li>
            </ul>
          </div>
          <div className="mb-6">
            <ul>
              <li className="hover:cursor-pointer">Contact Us</li>
              <li className="hover:cursor-pointer">Store Locator</li>
              <li className="hover:cursor-pointer">Track Order</li>
            </ul>
          </div>
          <div className="mb-6">
            <ul>
              <li className="hover:cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
          <div className="mb-6">
            <h5 className="xl:text-2xl lg:text-2xl md:text-[1rem] mb-4">
              Download Our App
            </h5>
            <div className="flex flex-row">
              <div className="p-2 md:p-auto bg-white rounded-full mx-1 w-fit">
                {" "}
                <a href="https://www.apple.com">
                  <FaApple
                    color={"black"}
                    className="xl:text-[1.5rem] lg:text-[1.5rem] md:text-[1.15rem]"
                  />
                </a>{" "}
              </div>
              <div className="p-2 md:p-auto bg-white rounded-full mx-1 w-fit">
                {" "}
                <a href="https://www.playstore.com">
                  <IoLogoGooglePlaystore
                    color={"black"}
                    className="xl:text-[1.5rem] lg:text-[1.5rem] md:text-[1.15rem]"
                  />
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 text-center">
          <p className="text-xl text-white">2025 KFC || All rights reserved</p>
        </div>
      </Styledsection>
    </>
  );
};

export default Footer;
