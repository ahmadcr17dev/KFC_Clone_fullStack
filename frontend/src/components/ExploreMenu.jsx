import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import explorei from "../images/explorei.png";
import exploreii from "../images/exploreii.png";
import exploreiii from "../images/exploreiii.png";
import exploreiv from "../images/exploreiv.png";
import explorev from "../images/explorev.png";
import explorevi from "../images/explorevi.png";
import styled from "styled-components";

const StyledSection = styled.section`
  .image-box {
    img {
      width: "110px";
      height: "110px";
      display: "block";
      margin-left: "auto";
      margin-right: "auto";
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

const ExploreMenu = () => {
  const images = [
    { pic: explorei, title: "EveryDay Meal" },
    { pic: exploreii, title: "Ala-Carte & Combo" },
    { pic: exploreiii, title: "Promotion" },
    { pic: exploreiv, title: "Signature-Boxes" },
    { pic: explorev, title: "Sharing" },
    { pic: explorevi, title: "Snacks & Beverages" },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1031 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1030, min: 768 },
      items: 3,
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
  const CustomLeftArrow = ({ onClick }) => {
    return (
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
  };

  // Custom Right Arrow
  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="righty custom-arrow right-arrow"
        style={{
          position: "absolute",
          right: "0px",
          top: "50%",
          transform: "translateY(-50%)",
          //   zIndex: 1,
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
  };

  return (
    <>
      <StyledSection className="mt-36 font-poppins pb-16 px-10">
        <h1 className="title text-4xl text-white font-bold">EXPLORE MENU</h1>
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
            {images.map((image, index) => (
              <div
                key={index}
                className="image-box bg-stone-800 mx-3 rounded-lg shadow-md p-4 hover:cursor-pointer"
              >
                <img src={image.pic} alt={`Slide ${index + 1}`} />
                <p className="text-center text-white font-semibold text-base mt-4 pb-4">
                  {image.title}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </StyledSection>
    </>
  );
};

export default ExploreMenu;
