import React, { useEffect, useState } from "react";
import {
  GiPizzaSlice,
  GiHamburger,
  GiChickenOven,
  GiDrinkMe,
} from "react-icons/gi";
import { HiMiniUsers } from "react-icons/hi2";
import { GiFrenchFries } from "react-icons/gi";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../redux/cartslice";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { addtowishlist } from "../redux/wishslice";
import chicken from "../images/chicken.webp";
import cheese from "../images/cheese.webp";

const StyledSection = styled.section`
  .image-box img {
    width: max-content;
    height: max-content;
    object-fit: cover;
    display: block;
    margin: auto;
    border-radius: 10px;
  }

  @media (max-width: 464px) {
    .title {
      font-size: 1.5rem;
    }
    .lefty,
    .righty {
      display: none;
    }
    .image-box img {
      width: 15rem;
      height: 13rem;
    }
  }
`;

const Shop = () => {
  const [pizzaitems, setpizzaitems] = useState([]);
  const products_key = import.meta.env.VITE_PRODUCTS_KEY;
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  const wishitems = useSelector((state) => state.wish);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [customizations, setCustomizations] = useState({
  //   size: "",
  //   flavors: "",
  // });

  const openPopup = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setCustomizations({ size: "", flavors: "" });
  };

  useEffect(() => {
    axios
      .get(products_key)
      .then((response) => {
        console.log("API Data:", response.data);
        setpizzaitems(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // 🔥 Filter products by category
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

  return (
    <section className="h-full w-full font-poppins bg-stone-800">
      {/* Category Buttons */}
      <div className="cat-names py-10 flex flex-row justify-center px-8 sticky top-[4.8rem] bg-stone-800">
        {[
          {
            icon: <GiPizzaSlice size="1.5rem" />,
            label: "Pizza",
          },
          { icon: <GiHamburger size="1.5rem" />, label: "Burger" },
          { icon: <GiFrenchFries size="1.5rem" />, label: "Fries" },
          { icon: <GiChickenOven size="1.5rem" />, label: "Chicken" },
          { icon: <GiDrinkMe size="1.5rem" />, label: "Drinks" },
          { icon: <HiMiniUsers size="1.5rem" />, label: "Family Deals" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-row px-8 py-2 text-white bg-red-500 mx-1 rounded cursor-pointer hover:bg-red-700"
          >
            {item.icon}
            <p className="text-md ml-2">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Product List */}
      <StyledSection className="mt-12 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">Pizza Deals</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {getProductsByCategory("pizza").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
              onClick={() => openPopup(item)}
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white text-[1.1rem] font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-left text-stone-300 text-sm font-medium text-sm mt-4 pb-4"
              ></p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="mt-6 bg-stone-500 rounded text-white font-medium w-fit px-16 h-10 text-sm hover:bg-stone-600"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full py-3 hover:bg-stone-600 h-fit w-10 h-10 mt-6"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart color={"white"} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      {/* Pop-up Window */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-poppins"
          onClick={closePopup}
        >
          <div
            className="bg-white py-6 px-10 rounded-lg shadow-lg w-full mx-[190px] relative h-fit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="absolute top-2 right-2 text-white hover:bg-red-800 bg-red-500 w-8 h-8 rounded-full"
              onClick={closePopup}
            >
              ✖
            </button>
            <div className="flex flex-row w-full">
              <img
                src={`data:image/jpeg;base64,${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="w-[400px] h-[400px] object-cover rounded-md"
              />
              <div className="w-full">
                <h2 className="text-2xl font-semibold mt-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-stone-900 font-medium mt-4">
                  Rs: {selectedProduct.price}
                </p>
                {selectedProduct.type === "single" && (
                  <>
                    <div className="flex flex-col mt-10">
                      <div className="flex flex-row justify-between py-1">
                        <label>
                          <input type="radio" name="size" /> Small
                        </label>
                        <p className="text-stone-700 font-medium">Rs: 600</p>
                      </div>
                      <hr className="py-0" />
                      <div className="flex flex-row justify-between py-3">
                        <label>
                          <input type="radio" name="size" /> Medium
                        </label>
                        <p className="text-stone-700 font-medium">Rs: 1200</p>
                      </div>
                      <hr />
                      <div className="flex flex-row justify-between py-3">
                        <label>
                          <input type="radio" name="size" /> Large
                        </label>
                        <p className="text-stone-700 font-medium">Rs: 1800</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-black text-[1rem] font-semibold mt-8">
                        Choose Small Toppings
                      </p>
                      <div className="flex flex-row justify-between mt-6">
                        <label>
                          <input type="checkbox" name="toppings" /> Chicken
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
                          <input type="checkbox" name="toppings" /> Cheese
                        </label>
                        <img src={cheese} alt="cheese" className="mt-[-11px]" />
                        <p>Rs: 100</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            {/* <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={() => {
                closePopup();
              }}
            >
              Confirm Selection
            </button> */}
          </div>
        </div>
      )}

      <StyledSection className="mt-12 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">Burger Deals</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {getProductsByCategory("burger").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white text-[1.1rem] font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-left text-stone-300 text-sm font-medium mt-4 pb-4"
              ></p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="mt-6 bg-stone-500 rounded text-white font-medium w-fit px-16 h-10 text-sm hover:bg-stone-600"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full py-3 hover:bg-stone-600 h-fit w-10 h-10 mt-6"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart color={"white"} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">Fries Deals</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {getProductsByCategory("fries").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white text-[1.1rem] font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-left text-stone-300 text-sm font-medium mt-4 pb-4"
              ></p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="mt-6 bg-stone-500 rounded text-white font-medium w-fit px-16 h-10 text-sm hover:bg-stone-600"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full py-3 hover:bg-stone-600 h-fit w-10 h-10 mt-6"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart color={"white"} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">Chicken Deals</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {getProductsByCategory("chicken").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white text-[1.1rem] font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-left text-stone-300 text-sm font-medium text-1xl mt-4 pb-4"
              ></p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="mt-6 bg-stone-500 rounded text-white font-medium w-fit px-16 h-10 text-sm hover:bg-stone-600"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full py-3 hover:bg-stone-600 h-fit w-10 h-10 mt-6"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart color={"white"} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">Drinks</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {getProductsByCategory("drinks").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white text-[1.1rem] font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-left text-stone-300 text-sm font-medium text-1xl mt-4 pb-4"
              ></p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="mt-6 bg-stone-500 rounded text-white font-medium w-fit px-16 h-10 text-sm hover:bg-stone-600"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full py-3 hover:bg-stone-600 h-fit w-10 h-10 mt-6"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart color={"white"} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>

      <StyledSection className="mt-12 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">Family Deals</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {getProductsByCategory("family").map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-700 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white text-[1.1rem] font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.description.slice(0, 55),
                }}
                className="text-left text-stone-300 text-sm font-medium mt-4 pb-4"
              ></p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
              <div className="flex flex-row justify-between">
                <button
                  className="mt-6 bg-stone-500 rounded text-white font-medium w-fit px-16 h-10 text-sm hover:bg-stone-600"
                  onClick={() => handleaddtocart(item)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-stone-500 rounded-full py-3 hover:bg-stone-600 h-fit w-10 h-10 mt-6"
                  onClick={() => handleaddtowishlist(item)}
                >
                  <FiHeart color={"white"} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </StyledSection>
    </section>
  );
};

export default Shop;
