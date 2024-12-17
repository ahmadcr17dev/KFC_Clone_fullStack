import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import axios from 'axios';

const StyledSection = styled.section`
  .image-box {
    img {
      width: 110px;
      height: 110px;
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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Custom Left Arrow
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="lefty custom-arrow left-arrow"
      style={{
        position: "absolute",
        left: "0px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      ❮
    </button>
  );

  // Custom Right Arrow
  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="righty custom-arrow right-arrow"
      style={{
        position: "absolute",
        right: "0px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      ❯
    </button>
  );

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
        <div className="mt-16 mb-16 relative">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={0}
            showDots={false}
            arrows={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.image}
                  style={{ width: "100%", height: "auto" }}
                />
                <h2 className="text-white">{item.name}</h2>
                <p>${item.price}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </StyledSection>
    </>
  );
};

export default HomeItems;
