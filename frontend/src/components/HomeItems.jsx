import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import axios from 'axios';

const StyledSection = styled.section`
  .image-box {
    img {
      width: fit-content;
      height: fit-content;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media (max-width: 464px) and (min-width: 0px) {
    .title {
      font-size: 1.5rem;
    }
    .lefty {
      display: none;
    }
    .righty {
      display: none;
    }
    .image-box img {
      width: 15rem;
      height: 13rem;
    }
  }
`;

const HomeItems = () => {

  const [items, setitems] = useState([]);
  const homeitems_key = import.meta.env.VITE_HOME_ITEMS_KEY;

  useEffect(() => {
    axios
      .get(homeitems_key)
      .then((response) => {
        console.log("API Data:", response.data);
        setitems(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Fetch error:", error))
  }, []);

  return (
    <>
      <StyledSection className="mt-24 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">BEST SELLER</h1>
        <p style={{ color: "red", fontWeight: "bold", marginTop: "-15px" }}>
          __________
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="image-box bg-stone-800 mx-1 rounded-lg shadow-md p-4 hover:cursor-pointer"
            >
              <p className="text-left text-white font-semibold text-2xl mt-4 pb-4">
                {item.name}
              </p>
              <p className="text-left text-white font-semibold bg-red-600 w-fit px-6 py-1 rounded-tr-xl rounded-bl-xl ">
                Rs: {item.price}
              </p>
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </StyledSection>
    </>
  );
};

export default HomeItems;
