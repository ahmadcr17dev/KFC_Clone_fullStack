import React, { useEffect, useState } from "react";
import {
  GiPizzaSlice,
  GiHamburger,
  GiChickenOven,
  GiDrinkMe,
} from "react-icons/gi";
import { HiMiniUsers } from "react-icons/hi2";
import axios from "axios";
import styled from "styled-components";

const StyledSection = styled.section`
  .image-box img {
    width: 100%;
    height: 200px;
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

  useEffect(() => {
    axios
      .get(products_key)
      .then((response) => {
        console.log("API Data:", response.data);
        setpizzaitems(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <section className="h-full w-full font-poppins">
      {/* Category Buttons */}
      <div className="cat-names mt-16 flex flex-row justify-center px-8">
        {[
          { icon: <GiPizzaSlice size="1.5rem" />, label: "Pizza" },
          { icon: <GiHamburger size="1.5rem" />, label: "Burger" },
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
      <StyledSection className="mt-24 font-poppins pb-16 px-10">
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
          {pizzaitems.map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-800 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
              <p className="text-left text-white font-semibold text-1xl mt-4 pb-4">
                {item.name}
              </p>
              <p className="text-left text-white text-sm font-medium text-1xl mt-4 pb-4">
                {item.description}
              </p>
              <p className="text-left text-white text-sm font-semibold bg-red-600 w-fit px-6 py-1 rounded-bl-xl ">
                Starts from Rs: {item.price}
              </p>
            </div>
          ))}
        </div>
      </StyledSection>
    </section>
  );
};

export default Shop;
