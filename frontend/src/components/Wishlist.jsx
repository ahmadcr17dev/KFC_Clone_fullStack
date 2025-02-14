import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bars } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { deletefromwishlist, clearwishlist } from "../redux/wishslice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [loading, setloading] = useState(true);
  const wishitems = useSelector((state) => state.wish.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleremovefromwishlist = (name) => {
    dispatch(deletefromwishlist(name));
    toast.success(`${name.name} is removed from wishlist`);
  };

  const handleclearwishlist = () => {
    dispatch(clearwishlist());
    toast.success("Wishlist has been cleared");
  };

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
              Wishlist
            </h1>
            {wishitems.length > 0 ? (
              <>
                <div className="mx-auto mt-6 text-white">
                  {wishitems.map((item) => {
                    return (
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
                          <p className="text-sm text-stone-300">
                            Rs: {item.price}
                          </p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash
                            size={16}
                            onClick={() => handleremovefromwishlist(item)}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 rounded text-white px-16 py-2 my-4 ml-6 text-sm"
                  onClick={() => handleclearwishlist()}
                >
                  Clear Wishlist
                </button>
              </>
            ) : (
              <h3 className="text-white font-medium text-1xl text-center mb-6">
                WishList is Empty
              </h3>
            )}
            <Footer />
          </section>
        </>
      )}
    </>
  );
};

export default Wishlist;
