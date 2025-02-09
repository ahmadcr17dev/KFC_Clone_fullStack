import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Proceed = () => {
  // Get product from Redux (if available)
  const proceedProductFromRedux = useSelector(
    (state) => state.product.proceedProduct
  );

  // Get product from LocalStorage (if Redux is empty)
  const [proceedProduct, setProceedProduct] = useState(null);

  useEffect(() => {
    if (proceedProductFromRedux) {
      setProceedProduct(proceedProductFromRedux);
    } else {
      const storedProduct = JSON.parse(localStorage.getItem("products"));
      setProceedProduct(storedProduct);
    }
  }, [proceedProductFromRedux]);

  if (!proceedProduct) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <section className="flex flex-row justify-between px-8 py-8 bg-stone-900 font-poppins">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-[65%] bg-stone-800 rounded-lg px-10 py-6 text-stone-300">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-stone-300"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full p-2 border border-stone-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-stone-700 bg-stone-700 text-stone-200 font-medium text-sm"
              required
              placeholder="first name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-stone-300"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full p-2 border border-stone-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-stone-700 bg-stone-700 text-stone-200 font-medium text-sm"
              required
              placeholder="last name"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-stone-300"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full p-2 border border-stone-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-stone-500 bg-stone-700 text-stone-200 font-medium text-sm"
              required
              placeholder="city"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-stone-300"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              className="mt-1 block w-full p-2 border border-stone-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-stone-500 bg-stone-700 text-stone-200 font-medium text-sm"
              required
              placeholder="State"
            />
          </div>

          <div>
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-stone-300"
            >
              Zip
            </label>
            <input
              type="text"
              id="zip"
              className="mt-1 block w-full p-2 border border-stone-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-stone-700 bg-stone-700 text-stone-200 font-medium text-sm"
              required
              placeholder="78900"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-stone-700 rounded focus:ring-stone-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-stone-300">
              Agree to terms and conditions
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Checkout
            </button>
          </div>
        </form>
        <div className="bg-stone-800 px-10 py-6 mt-8 rounded-lg w-[33%] text-white">
          <h2 className="text-[1.5rem] font-semibold mb-10">Order Summary</h2>
          <div className="flex flex-row justify-between">
            <p>Product:</p>
            <p className="text-stone-200 font-medium">{proceedProduct.name}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Size/Flavour:</p>
            <p className="text-stone-200 font-medium">
              {proceedProduct.selectedSize}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Quantity:</p>
            <p className="text-stone-200 font-medium">
              {proceedProduct.quantity}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Cheese:</p>
            <p className="text-stone-200 font-medium">
              {proceedProduct.cheese ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Chicken:</p>
            <p className="text-stone-200 font-medium">
              {proceedProduct.chicken ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-row justify-between mt-10">
            <p>SubTotal:</p>
            <p className="text-stone-200 font-medium">
              Rs: {proceedProduct.subtotal}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>GST:</p>
            <p className="text-stone-200 font-medium">5%</p>
          </div>
          <div className="flex flex-row justify-between mt-10 text-[1.3rem]">
            <p>Total:</p>
            <p className="text-stone-200 font-medium">
              Rs:{" "}
              {(proceedProduct.subtotal / 100) * 5 + proceedProduct.subtotal}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Proceed;
