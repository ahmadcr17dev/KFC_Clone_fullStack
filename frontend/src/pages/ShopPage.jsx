import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import Shop from "../components/Shop";
import Footer from '../components/Footer';

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
        <div className="flex justify-center items-center h-screen bg-stone-900">
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
        <section className="bg-stone-800">
          <Navbar/>
          <Shop />
          {/* <Footer /> */}
        </section>
      )}
    </>
  );
};

export default HomePage;