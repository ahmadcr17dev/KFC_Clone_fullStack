import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import {
  deletefromcart,
  increment,
  decrement,
  clearcart,
} from "../redux/cartslice";
import toast from "react-hot-toast";
import styled from "styled-components";

const StyledSection = styled.section`
  @media (max-width: 640px) {
    .name {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
      margin-left: 0rem;
    }
    .buttons {
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .buttons button:nth-child(2) {
      width: 100%;
      margin-left: 0.5rem;
    }
    .plusminus {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
    }
    .plusminus div:nth-child(2) {
      margin-right: 0rem;
    }
  }
`;

const Cart = () => {
  const [loading, setloading] = useState(true);
  const cartitems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleremovefromcart = (name) => {
    dispatch(deletefromcart(name));
    toast.success(`${name.name} is removed from the cart`);
  };

  const handleclearcart = () => {
    dispatch(clearcart());
    toast.success("Cart has been cleared");
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
          <StyledSection className="bg-stone-900 font-poppins">
            <h1 className="text-white text-3xl font-semibold pt-8 ml-8">
              Cart
            </h1>
            {cartitems.length > 0 ? (
              <>
                <div className={"mx-auto mt-6 text-white"}>
                  {cartitems.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col xl:flex-row xl:items-center lg:items-center lg:flex-row md:items-center md:flex-row mx-6 p-3 bg-stone-600 text-white rounded-lg shadow-md mb-3"
                      >
                        <div className="flex items-center justify-center text-white rounded-full">
                          <img
                            src={`data:image/jpeg;base64,${item.image}`}
                            alt={item.name}
                            className="w-[10rem] h-[10rem] xl:w-[4rem] xl:h-[4rem] lg:w-[4rem] lg:h-[4rem] md:w-[4rem] md:h-[4rem] rounded-full"
                          />
                        </div>
                        <div className="name flex-1 ml-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-stone-300">
                            Rs: {item.price}
                          </p>
                        </div>
                        <div className="plusminus flex flex-row">
                          <div className="mr-16">
                            <p>Rs: {item.price * item.quantity}</p>
                          </div>
                          <div className="flex flex-row justify-between mr-10">
                            <button
                              className="bg-red-500 hover:bg-red-700 p-1 rounded mr-2"
                              onClick={() => dispatch(increment(item.id))}
                              disabled={item.quantity >= item.stock_status}
                            >
                              <FaPlus size={16} color={"white"} />
                            </button>
                            <input
                              type="number"
                              readOnly
                              defaultValue={0}
                              className="w-[3rem] h-auto p-1 rounded text-white text-sm text-center border-0 bg-stone-800"
                              value={item.quantity}
                            />
                            <button
                              className="bg-red-500 hover:bg-red-700 p-1 rounded ml-2"
                              onClick={() => dispatch(decrement(item.id))}
                              disabled={item.quantity < 1}
                            >
                              <FaMinus size={16} color={"white"} />
                            </button>
                          </div>
                        </div>
                        <div className="buttons">
                          <button className="text-red-500 hover:text-red-700">
                            <FaTrash
                              size={16}
                              onClick={() => handleremovefromcart(item)}
                            />
                          </button>
                          <button
                            className="text-white bg-red-500 hover:bg-red-600 sm-medium text-sm px-8 py-2 rounded ml-8"
                            disabled={item.quantity <= 0}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 rounded text-white px-8 py-2 my-4 ml-6 text-sm"
                  onClick={() => handleclearcart()}
                >
                  Clear Cart
                </button>
              </>
            ) : (
              <h3 className="text-white font-medium text-1xl text-center">
                The Cart is Empty!
              </h3>
            )}
          </StyledSection>
        </>
      )}
    </>
  );
};

export default Cart;
