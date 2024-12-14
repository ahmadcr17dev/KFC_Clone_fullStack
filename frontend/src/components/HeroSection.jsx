import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banneri from "../images/banneri.jpg";
import bannerii from "../images/bannerii.jpg";
import banneriii from "../images/banneriii.jpg";
import banneriv from "../images/banneriv.jpg";
import bannerv from "../images/bannerv.jpg";
import { styled } from "styled-components";

const StyledCarousel = styled.section`
  @media (max-width: 464px) and (min-width: 0px) {
    #images {
      height: 250px;
    }
  }
`;

const HeroSection = () => {
  const images = [banneri, bannerii, banneriii, banneriv, bannerv];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <StyledCarousel>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        showDots={false}
        arrows={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img id="images" src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </StyledCarousel>
  );
};

export default HeroSection;
