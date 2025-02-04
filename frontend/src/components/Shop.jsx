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
      cartitem => cartitem.id === item.id
    );
    if (!existproduct) {
      dispatch(addtocart(item));
      toast.success(`${item.name} is added to cart`);
    } else {
      toast.error(`${item.name} is already in cart`);
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
              <button
                className="mt-6 bg-stone-500 rounded text-white font-medium w-full py-3 text-sm hover:bg-stone-600"
                onClick={() => handleaddtocart(item)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </StyledSection>

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
              <button
                className="mt-6 bg-stone-500 rounded text-white font-medium w-full py-3 text-sm hover:bg-stone-600"
                onClick={() => handleaddtocart(item)}
              >
                Add To Cart
              </button>
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
              <button
                className="mt-6 bg-stone-500 rounded text-white font-medium w-full py-3 text-sm hover:bg-stone-600"
                onClick={() => handleaddtocart(item)}
              >
                Add To Cart
              </button>
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
              <button
                className="mt-6 bg-stone-500 rounded text-white font-medium w-full py-3 text-sm hover:bg-stone-600"
                onClick={() => handleaddtocart(item)}
              >
                Add To Cart
              </button>
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
              <button
                className="mt-6 bg-stone-500 rounded text-white font-medium w-full py-3 text-sm hover:bg-stone-600"
                onClick={() => handleaddtocart(item)}
              >
                Add To Cart
              </button>
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
              <button
                className="mt-6 bg-stone-500 rounded text-white font-medium w-full py-3 text-sm hover:bg-stone-600"
                onClick={() => handleaddtocart(item)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </StyledSection>
    </section>
  );
};

export default Shop;
