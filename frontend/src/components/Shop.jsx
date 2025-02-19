import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../redux/cartslice";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { addtowishlist } from "../redux/wishslice";
import chicken from "../images/chicken.webp";
import cheese from "../images/cheese.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StyledSection = styled.section`
  .image-box img {
    width: max-content;
    height: max-content;
    object-fit: cover;
    display: block;
    margin: auto;
    border-radius: 10px;
  }
`;

const Shop = () => {
  const [pizzaitems, setpizzaitems] = useState([]);
  const products_key = import.meta.env.VITE_PRODUCTS_KEY;
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  const wishitems = useSelector((state) => state.wish);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setquantity] = useState(0);
  const [radio, setradio] = useState("");
  const [cheese1, setcheese] = useState(false);
  const [chicken1, setchicken] = useState(false);
  const navigate = useNavigate();

  const handlecheesecheck = () => {
    setcheese((prevChecked) => !prevChecked);
  };

  const handlechickencheck = () => {
    setchicken((prevChecked) => !prevChecked);
  };

  const handlechangeradio = (event) => {
    setradio(event.target.value);
  };

  const increment = () => {
    setquantity((prev) => prev + 1);
  };

  const decrement = () => {
    setquantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const openPopup = (product) => {
    setSelectedProduct(product);
    setquantity(0);
    setcheese(false);
    setchicken(false);
    setradio("");
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    axios
      .get(products_key, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Data:", response.data);
        setpizzaitems(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Fetch error:", error));
  });



  // Filter products by category
  const getProductsByCategory = (category) => {
    return pizzaitems.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const handleaddtocart = (item) => {
    const existproduct = cartitems.items.some(
      (cartitem) => cartitem.id === item.id
    );
    if (!existproduct) {
      dispatch(addtocart(item));
      toast.success(`${item.name} is added to cart`);
    } else {
      toast.error(`${item.name} is already in cart`);
    }
  };

  const handleaddtowishlist = (item) => {
    const existeditem = wishitems.items.some(
      (wishitem) => wishitem.id === item.id
    );
    if (!existeditem) {
      dispatch(addtowishlist(item));
      toast.success(`${item.name} is added to wishlist`);
    } else {
      toast.error(`${item.name} is already in wishlist`);
    }
  };

  const handleproceed = (selectedProduct) => {
    const updatedProduct = {
      ...selectedProduct,
      selectedSize: radio, // Selected size (small, medium, large)
      quantity: quantity, // Updated quantity
      cheese: cheese1, // Selected cheese topping
      chicken: chicken1, // Selected chicken topping
      subtotal:
        (radio === "small"
          ? quantity * selectedProduct.small_price
          : radio === "medium"
          ? quantity * selectedProduct.medium_price
          : radio === "large"
          ? quantity * selectedProduct.large_price
          : radio === "tikka"
          ? quantity * selectedProduct.price
          : radio === "fajita"
          ? quantity * selectedProduct.price
          : radio === "spicy"
          ? quantity * selectedProduct.price
          : selectedProduct.category === "burger"
          ? quantity * selectedProduct.price
          : selectedProduct.category === "fries"
          ? quantity * selectedProduct.price
          : selectedProduct.category === "chicken"
          ? quantity * selectedProduct.price
          : selectedProduct.category === "drinks"
          ? quantity * selectedProduct.price
          : selectedProduct.category === "family"
          ? quantity * selectedProduct.price
          : 0) +
        (cheese1 && selectedProduct.category === "pizza"
          ? quantity * 100
          : cheese1
          ? quantity * 50
          : cheese1 && selectedProduct.category === "family"
          ? quantity * 100
          : 0) +
        (chicken1 && selectedProduct.category === "pizza"
          ? quantity * 100
          : chicken1 && selectedProduct.category === "family"
          ? quantity * 100
          : 0),
    };

    // Save to Redux (dispatch action)
    dispatch({ type: "UPDATE_PROCEED_PRODUCT", payload: updatedProduct });

    // Store in LocalStorage
    localStorage.setItem("products", JSON.stringify(updatedProduct));

    // Redirect to Proceed Page
    navigate("/proceed");
  };

  return (
    <section className="h-full w-full font-poppins bg-stone-800">
      {/* Product List */}
      <StyledSection className="pt-12 font-poppins pb-16 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl xl:text-3xl lg:text-3xl md:text-[2rem] text-white font-bold">
          Pizza Deals
        </h1>
        <p className="text-red-500 font-bold text-left -mt-2 sm:-mt-3">
          __________
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-3 md:gap-3 mt-10">
          {getProductsByCategory("pizza").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 rounded-lg shadow-md p-2 xl:p-4 lg:p-4 md:p-4"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                onClick={() => openPopup(item)}
                className="xl:w-full lg:w-full md:w-full h-40 object-cover rounded-md hover:cursor-pointer"
              />
              <p className="text-white text-[0.8rem] xl:text-[1.3rem] font-semibold mt-4 pb-2 lg:text-[1rem]">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
    __html: item.description.length > 55 ? item.description.slice(0, 55) + "..." : item.description,
  }}
                className="text-stone-300 text-[0rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-medium mt-2 pb-2"
              ></p>
              <p className="text-white text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl">
                Rs: {item.price}
              </p>

              <div className="flex flex-row justify-between items-center mt-4">
                <button
                  className="bg-stone-500 rounded text-white font-medium mx-1 w-full py-2 text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full p-2 xl:p-3 lg:p-2 md:p-2 hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart
                    color={"white"}
                    className="mx-auto text-[0.8rem] lg:text-[0.9rem] md:text-[0.9rem]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl xl:text-3xl lg:text-3xl md:text-[2rem] text-white font-bold">
          Burger Deals
        </h1>
        <p className="text-red-500 font-bold text-left -mt-2 sm:-mt-3">
          __________
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-3 md:gap-3 mt-10">
          {getProductsByCategory("burger").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 rounded-lg shadow-md p-2 xl:p-4 lg:p-4 md:p-4"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                onClick={() => openPopup(item)}
                className="xl:w-full lg:w-full md:w-full h-40 object-cover rounded-md hover:cursor-pointer"
              />
              <p className="text-white text-[0.8rem] xl:text-[1.3rem] font-semibold mt-4 pb-2 lg:text-[1rem]">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-stone-300 text-[0rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-medium mt-2 pb-2"
              ></p>
              <p className="text-white text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl">
                Rs: {item.price}
              </p>

              <div className="flex flex-row justify-between items-center mt-4">
                <button
                  className="bg-stone-500 rounded text-white font-medium mx-1 w-full py-2 text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full p-2 xl:p-3 lg:p-2 md:p-2 hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart
                    color={"white"}
                    className="mx-auto text-[0.8rem] lg:text-[0.9rem] md:text-[0.9rem]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl xl:text-3xl lg:text-3xl md:text-[2rem] text-white font-bold">
          Chicken Deals
        </h1>
        <p className="text-red-500 font-bold text-left -mt-2 sm:-mt-3">
          __________
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-3 md:gap-3 mt-10">
          {getProductsByCategory("chicken").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 rounded-lg shadow-md p-2 xl:p-4 lg:p-4 md:p-4"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                onClick={() => openPopup(item)}
                className="xl:w-full lg:w-full md:w-full h-40 object-cover rounded-md hover:cursor-pointer"
              />
              <p className="text-white text-[0.8rem] xl:text-[1.3rem] font-semibold mt-4 pb-2 lg:text-[1rem]">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-stone-300 text-[0rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-medium mt-2 pb-2"
              ></p>
              <p className="text-white text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl">
                Rs: {item.price}
              </p>

              <div className="flex flex-row justify-between items-center mt-4">
                <button
                  className="bg-stone-500 rounded text-white font-medium mx-1 w-full py-2 text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full p-2 xl:p-3 lg:p-2 md:p-2 hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart
                    color={"white"}
                    className="mx-auto text-[0.8rem] lg:text-[0.9rem] md:text-[0.9rem]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl xl:text-3xl lg:text-3xl md:text-[2rem] text-white font-bold">
          Fries Deals
        </h1>
        <p className="text-red-500 font-bold text-left -mt-2 sm:-mt-3">
          __________
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-3 md:gap-3 mt-10">
          {getProductsByCategory("fries").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 rounded-lg shadow-md p-2 xl:p-4 lg:p-4 md:p-4"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                onClick={() => openPopup(item)}
                className="xl:w-full lg:w-full md:w-full h-40 object-cover rounded-md hover:cursor-pointer"
              />
              <p className="text-white text-[0.8rem] xl:text-[1.3rem] font-semibold mt-4 pb-2 lg:text-[1rem]">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-stone-300 text-[0rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-medium mt-2 pb-2"
              ></p>
              <p className="text-white text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl">
                Rs: {item.price}
              </p>

              <div className="flex flex-row justify-between items-center mt-4">
                <button
                  className="bg-stone-500 rounded text-white font-medium mx-1 w-full py-2 text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full p-2 xl:p-3 lg:p-2 md:p-2 hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart
                    color={"white"}
                    className="mx-auto text-[0.8rem] lg:text-[0.9rem] md:text-[0.9rem]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl xl:text-3xl lg:text-3xl md:text-[2rem] text-white font-bold">
          Drinks
        </h1>
        <p className="text-red-500 font-bold text-left -mt-2 sm:-mt-3">
          __________
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-3 md:gap-3 mt-10">
          {getProductsByCategory("drinks").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 rounded-lg shadow-md p-2 xl:p-4 lg:p-4 md:p-4"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                onClick={() => openPopup(item)}
                className="xl:w-full lg:w-full md:w-full h-40 object-cover rounded-md hover:cursor-pointer"
              />
              <p className="text-white text-[0.8rem] xl:text-[1.3rem] font-semibold mt-4 pb-2 lg:text-[1rem]">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-stone-300 text-[0rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-medium mt-2 pb-2"
              ></p>
              <p className="text-white text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl">
                Rs: {item.price}
              </p>

              <div className="flex flex-row justify-between items-center mt-4">
                <button
                  className="bg-stone-500 rounded text-white font-medium mx-1 w-full py-2 text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full p-2 xl:p-3 lg:p-2 md:p-2 hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart
                    color={"white"}
                    className="mx-auto text-[0.8rem] lg:text-[0.9rem] md:text-[0.9rem]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl xl:text-3xl lg:text-3xl md:text-[2rem] text-white font-bold">
          Family Deals
        </h1>
        <p className="text-red-500 font-bold text-left -mt-2 sm:-mt-3">
          __________
        </p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 lg:gap-3 md:gap-3 mt-10">
          {getProductsByCategory("family").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 rounded-lg shadow-md p-2 xl:p-4 lg:p-4 md:p-4"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                onClick={() => openPopup(item)}
                className="xl:w-full lg:w-full md:w-full h-40 object-cover rounded-md hover:cursor-pointer"
              />
              <p className="text-white text-[0.8rem] xl:text-[1.3rem] font-semibold mt-4 pb-2 lg:text-[1rem]">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-stone-300 text-[0rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-medium mt-2 pb-2"
              ></p>
              <p className="text-white text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl">
                Rs: {item.price}
              </p>

              <div className="flex flex-row justify-between items-center mt-4">
                <button
                  className="bg-stone-500 rounded text-white font-medium mx-1 w-full py-2 text-[0.7rem] xl:text-sm lg:text-[0.7rem] md:text-[0.7rem] hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full p-2 xl:p-3 lg:p-2 md:p-2 hover:bg-stone-600 transition-all"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart
                    color={"white"}
                    className="mx-auto text-[0.8rem] lg:text-[0.9rem] md:text-[0.9rem]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      {/* Pop-up Window */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-stone-700 bg-opacity-50 flex justify-center items-center font-poppins"
          onClick={closePopup}
        >
          <div
            className="bg-stone-800 py-8 px-12 rounded-lg shadow-lg w-fit relative xl:h-fit text-white max-h-[300px] overflow-x-auto lg:max-h-[400px] lg:overflow-x-auto md:max-h-[300px] md:overflow-x-auto md:mx-[1rem] mx-[0.1rem]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="absolute top-4 right-4 text-white hover:bg-red-800 bg-red-500 w-8 h-8 rounded-full"
              onClick={closePopup}
            >
              ✖
            </button>
            <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row w-full">
              <img
                src={`data:image/jpeg;base64,${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="w-[0px] h-[0px] xl:w-[400px] xl:h-[400px] rounded-full px-10 lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[199px]"
              />
              <div className="w-full">
                <h2 className="text-[1.3rem] xl:text-2xl lg:text-2xl md:text-2xl font-semibold mt-2">
                  {selectedProduct.name}
                </h2>
                <p className="xl:font-medium lg:font-medium md:font-medium mt-4">
                  Rs: {selectedProduct.price}
                </p>
                {(selectedProduct.small_price > 0 ||
                  selectedProduct.medium_price > 0 ||
                  selectedProduct.large_price > 0) &&
                  selectedProduct.category === "pizza" && (
                    <>
                      <div className="flex flex-col mt-10">
                        <div className="flex flex-row justify-between py-1">
                          <label>
                            <input
                              type="radio"
                              name="size"
                              value="small"
                              onChange={handlechangeradio}
                              checked={radio === "small"}
                            />{" "}
                            Small 7
                          </label>
                          <p className="text-stone-200 font-medium">
                            Rs: {selectedProduct.small_price}
                          </p>
                        </div>
                        <hr className="py-0" />
                        <div className="flex flex-row justify-between py-3">
                          <label>
                            <input
                              type="radio"
                              name="size"
                              value="medium"
                              onChange={handlechangeradio}
                              checked={radio === "medium"}
                            />{" "}
                            Medium 10
                          </label>
                          <p className="text-stone-200 font-medium">
                            Rs: {selectedProduct.medium_price}
                          </p>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between py-3">
                          <label>
                            <input
                              type="radio"
                              name="size"
                              value="large"
                              onChange={handlechangeradio}
                              checked={radio === "large"}
                            />{" "}
                            Large 13
                          </label>
                          <p className="text-stone-200 font-medium">
                            Rs: {selectedProduct.large_price}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[1rem] font-semibold mt-8">
                          Choose Small Toppings
                        </p>
                        <div className="flex flex-row justify-between mt-6">
                          <label>
                            <input
                              type="checkbox"
                              name="toppings"
                              onChange={handlechickencheck}
                              checked={chicken1}
                            />{" "}
                            Chicken
                          </label>
                          <img
                            src={chicken}
                            alt="chicken"
                            className="mt-[-11px]"
                          />
                          <p>Rs: 100</p>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between mt-6">
                          <label>
                            <input
                              type="checkbox"
                              name="toppings"
                              onChange={handlecheesecheck}
                              checked={cheese1}
                            />{" "}
                            Cheese
                          </label>
                          <img
                            src={cheese}
                            alt="cheese"
                            className="mt-[-11px]"
                          />
                          <p>Rs: 100</p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="text-stone-100 font-medium">SubTotal: </p>
                        <p>
                          Rs:{" "}
                          {radio === "small"
                            ? quantity * selectedProduct.small_price +
                              (cheese1 ? quantity * 1 * 100 : 0) +
                              (chicken1 ? quantity * 1 * 100 : 0)
                            : radio === "medium"
                            ? quantity * selectedProduct.medium_price +
                              (cheese1 ? quantity * 1 * 100 : 0) +
                              (chicken1 ? quantity * 1 * 100 : 0)
                            : radio === "large"
                            ? quantity * selectedProduct.large_price +
                              (cheese1 ? quantity * 1 * 100 : 0) +
                              (chicken1 ? quantity * 1 * 100 : 0)
                            : 0}
                        </p>
                      </div>
                      <div className="flex flex-row mt-6">
                        <div className="flex flex-row">
                          <button
                            className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                            onClick={increment}
                            disabled={quantity >= selectedProduct.stock_status}
                          >
                            <FaPlus size={14} color={"white"} />
                          </button>
                          <input
                            type="text"
                            readOnly
                            defaultValue={0}
                            className="w-[1.5rem] h-auto p-1 rounded text-white text-center border-0 bg-stone-800"
                            value={quantity}
                          />
                          <button
                            className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                            onClick={decrement}
                            disabled={quantity <= 0}
                          >
                            <FaMinus size={14} color={"white"} />
                          </button>
                        </div>
                        <div>
                          <button
                            className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                            onClick={() => handleproceed(selectedProduct)}
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                {(selectedProduct.small_price <= 0.0 ||
                  selectedProduct.medium_price <= 0.0 ||
                  selectedProduct.large_price <= 0.0) &&
                  selectedProduct.category === "pizza" && (
                    <>
                      <div className="flex flex-col mt-10">
                        <p className="text-[1rem] font-semibold mt-[-19px] mb-4">
                          Choose Your Flavour
                        </p>
                        <div className="flex flex-row justify-between py-1">
                          <label>
                            <input
                              type="radio"
                              name="size"
                              required
                              value="tikka"
                              onChange={handlechangeradio}
                              checked={radio === "tikka"}
                            />{" "}
                            Chicken Tikka
                          </label>
                        </div>
                        <hr className="py-0" />
                        <div className="flex flex-row justify-between py-3">
                          <label>
                            <input
                              type="radio"
                              name="size"
                              required
                              value="fajita"
                              onChange={handlechangeradio}
                              checked={radio === "fajita"}
                            />{" "}
                            Chicken Fajita
                          </label>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between py-3">
                          <label>
                            <input
                              type="radio"
                              name="size"
                              required
                              value="spicy"
                              onChange={handlechangeradio}
                              checked={radio === "spicy"}
                            />{" "}
                            Hot & Spicy
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="text-[1rem] font-semibold mt-8">
                          Choose Small Toppings
                        </p>
                        <div className="flex flex-row justify-between mt-6">
                          <label>
                            <input
                              type="checkbox"
                              name="toppings"
                              onChange={handlechickencheck}
                              checked={chicken1}
                            />{" "}
                            Chicken
                          </label>
                          <img
                            src={chicken}
                            alt="chicken"
                            className="mt-[-11px]"
                          />
                          <p>Rs: 100</p>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between mt-6">
                          <label>
                            <input
                              type="checkbox"
                              name="toppings"
                              onChange={handlecheesecheck}
                              checked={cheese1}
                            />{" "}
                            Cheese
                          </label>
                          <img
                            src={cheese}
                            alt="cheese"
                            className="mt-[-11px]"
                          />
                          <p>Rs: 100</p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="font-medium">SubTotal: </p>
                        <p>
                          Rs:{" "}
                          {radio === "tikka"
                            ? quantity * selectedProduct.price +
                              (cheese1 ? quantity * 1 * 100 : 0) +
                              (chicken1 ? quantity * 1 * 100 : 0)
                            : radio === "fajita"
                            ? quantity * selectedProduct.price +
                              (cheese1 ? quantity * 1 * 100 : 0) +
                              (chicken1 ? quantity * 1 * 100 : 0)
                            : radio === "spicy"
                            ? quantity * selectedProduct.price +
                              (cheese1 ? quantity * 1 * 100 : 0) +
                              (chicken1 ? quantity * 1 * 100 : 0)
                            : 0}
                        </p>
                      </div>
                      <div className="flex flex-row mt-6">
                        <div className="flex flex-row">
                          <button
                            className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                            onClick={increment}
                            disabled={quantity >= selectedProduct.stock_status}
                          >
                            <FaPlus size={14} color={"white"} />
                          </button>
                          <input
                            type="text"
                            readOnly
                            defaultValue={0}
                            className="w-[1.5rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                            value={quantity}
                          />
                          <button
                            className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                            onClick={decrement}
                            disabled={quantity <= 0}
                          >
                            <FaMinus size={14} color={"white"} />
                          </button>
                        </div>
                        <div>
                          <button
                            className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                            onClick={() => handleproceed(selectedProduct)}
                          >
                            Proceed To Checkout
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                {selectedProduct.category === "burger" && (
                  <>
                    <div>
                      <p className="text-[1rem] font-semibold mt-8">
                        Extra Ads On
                      </p>
                      <div className="flex flex-row justify-between mt-6">
                        <label>
                          <input
                            type="checkbox"
                            name="toppings"
                            onChange={handlecheesecheck}
                            checked={cheese1}
                          />{" "}
                          Cheese Slice
                        </label>
                        <img src={cheese} alt="cheese" className="mt-[-11px]" />
                        <p>Rs: 50</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-[6rem]">
                      <p className="font-medium">SubTotal: </p>
                      <p>
                        Rs:{" "}
                        {cheese1
                          ? quantity * selectedProduct.price + quantity * 1 * 50
                          : quantity * selectedProduct.price}
                      </p>
                    </div>
                    <div className="flex flex-row mt-6">
                      <div className="flex flex-row">
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                          onClick={increment}
                          disabled={quantity >= selectedProduct.stock_status}
                        >
                          <FaPlus size={14} color={"white"} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          defaultValue={0}
                          className="w-[1.5rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                          value={quantity}
                        />
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                          onClick={decrement}
                          disabled={quantity <= 0}
                        >
                          <FaMinus size={14} color={"white"} />
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                          onClick={() => handleproceed(selectedProduct)}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedProduct.category === "fries" && (
                  <>
                    <div className="flex flex-row justify-between mt-[1rem] xl:mt-[15rem] lg:mt-[15rem] md:mt-[15rem]">
                      <p className="font-medium">SubTotal: </p>
                      <p>Rs: {quantity * selectedProduct.price}</p>
                    </div>
                    <div className="flex flex-row mt-6">
                      <div className="flex flex-row">
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                          onClick={increment}
                          disabled={quantity >= selectedProduct.stock_status}
                        >
                          <FaPlus size={14} color={"white"} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          defaultValue={0}
                          className="w-[1.5rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                          value={quantity}
                        />
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                          onClick={decrement}
                          disabled={quantity <= 0}
                        >
                          <FaMinus size={14} color={"white"} />
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                          onClick={() => handleproceed(selectedProduct)}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedProduct.category === "chicken" && (
                  <>
                    <div className="flex flex-row justify-between mt-[1rem] xl:mt-[15rem] lg:mt-[15rem] md:mt-[15rem]">
                      <p className="font-medium">SubTotal: </p>
                      <p>Rs: {quantity * selectedProduct.price}</p>
                    </div>
                    <div className="flex flex-row mt-6">
                      <div className="flex flex-row">
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                          onClick={increment}
                          disabled={quantity >= selectedProduct.stock_status}
                        >
                          <FaPlus size={14} color={"white"} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          defaultValue={0}
                          className="w-[1.5rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                          value={quantity}
                        />
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                          onClick={decrement}
                          disabled={quantity <= 0}
                        >
                          <FaMinus size={14} color={"white"} />
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                          onClick={() => handleproceed(selectedProduct)}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedProduct.category === "drinks" && (
                  <>
                    <div className="flex flex-row justify-between mt-[1rem] xl:mt-[15rem] lg:mt-[15rem] md:mt-[15rem]">
                      <p className="font-medium">SubTotal: </p>
                      <p>Rs: {quantity * selectedProduct.price}</p>
                    </div>
                    <div className="flex flex-row mt-6">
                      <div className="flex flex-row">
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                          onClick={increment}
                          disabled={quantity >= selectedProduct.stock_status}
                        >
                          <FaPlus size={14} color={"white"} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          defaultValue={0}
                          className="w-[1.5rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                          value={quantity}
                        />
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                          onClick={decrement}
                          disabled={quantity <= 0}
                        >
                          <FaMinus size={14} color={"white"} />
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                          onClick={() => handleproceed(selectedProduct)}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedProduct.category === "family" && (
                  <>
                    <div>
                      <p className="text-[1rem] font-semibold mt-8">
                        Extra Ads On
                      </p>
                      <div className="flex flex-row justify-between mt-6">
                        <label>
                          <input
                            type="checkbox"
                            name="toppings"
                            onChange={handlecheesecheck}
                            checked={cheese1}
                          />{" "}
                          Cheese Slice
                        </label>
                        <img src={cheese} alt="cheese" className="mt-[-11px]" />
                        <p>Rs: 50</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-[6rem]">
                      <p className="font-medium">SubTotal: </p>
                      <p>
                        Rs:{" "}
                        {cheese1
                          ? quantity * selectedProduct.price + quantity * 1 * 50
                          : quantity * selectedProduct.price}
                      </p>
                    </div>
                    <div className="flex flex-row mt-6">
                      <div className="flex flex-row">
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded mr-0 xl:mr-2 lg:mr-2 md:mr-2"
                          onClick={increment}
                          disabled={quantity >= selectedProduct.stock_status}
                        >
                          <FaPlus size={14} color={"white"} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          defaultValue={0}
                          className="w-[1.5rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                          value={quantity}
                        />
                        <button
                          className="bg-red-500 hover:bg-red-700 px-2 rounded ml-0 xl:ml-2 lg:ml-2 md:ml-2"
                          onClick={decrement}
                          disabled={quantity <= 0}
                        >
                          <FaMinus size={14} color={"white"} />
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-full bg-red-500 rounded py-2 xl:px-[7.1rem] lg:px-[7.1rem] text-white text-[0.8rem] xl:text-sm lg:text-sm md:text-sm mx-1 md:px-[3rem] md:w-full"
                          onClick={() => handleproceed(selectedProduct)}
                        >
                          Proceed To Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;
