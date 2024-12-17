import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Bars } from 'react-loader-spinner';
import HeroSection from "../components/HeroSection";
import ExploreMenu from "../components/ExploreMenu";
import HomeItems from "../components/HomeItems";

const HomePage = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Bars
            height="80"
            width="80"
            color="red"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <section className="bg-stone-950">
            <Navbar />
            <HeroSection />
            <ExploreMenu />
            <HomeItems />
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
