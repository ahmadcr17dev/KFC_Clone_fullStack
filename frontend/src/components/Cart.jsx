import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Cart = () => {
  const [loading, setloading] = useState(true);
  const cartitems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-stone-800">
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
          <section className="bg-stone-900 font-poppins">
            <Navbar />
            <h1 className="text-white text-3xl font-semibold mt-8 ml-8">
              Cart
            </h1>
            <div className={"mx-auto mt-6 text-white"}>
              {cartitems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mx-6 p-3 bg-stone-600 text-white rounded-lg shadow-md mb-3"
                >
                  <div className="flex items-center justify-center bg-blue-500 text-white rounded-full">
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={item.name}
                      className="w-[4rem] h-[4rem] rounded-full"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-stone-300">Rs: {item.price}</p>
                  </div>
                  <div className="flex flex-row justify-between mr-10">
                    <button className="bg-red-500 hover:bg-red-700 p-1 rounded mr-2">
                      <FaPlus size={16} color={"white"} />
                    </button>
                    <input type="number" readOnly className="w-8 h-6 p-1 rounded" />
                    <button className="bg-red-500 hover:bg-red-700 p-1 rounded ml-2">
                      <FaMinus size={16} color={"white"} />
                    </button>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash size={16} />
                  </button>
                  <button className="text-white bg-red-500 hover:bg-red-600 sm-medium text-sm px-8 py-2 rounded ml-8">
                    Continue
                  </button>
                </div>
              ))}
            </div>
            <Footer />
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
