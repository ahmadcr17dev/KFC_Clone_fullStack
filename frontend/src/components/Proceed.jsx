import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bars } from "react-loader-spinner";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Proceed = () => {
  // Get product from Redux (if available)
  const proceedProductFromRedux = useSelector(
    (state) => state.product.proceedProduct
  );

  // Get product from LocalStorage (if Redux is empty)
  const [proceedProduct, setProceedProduct] = useState(null);
  const [loading, setloading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (proceedProductFromRedux) {
      setProceedProduct(proceedProductFromRedux);
    } else {
      const storedProduct = JSON.parse(localStorage.getItem("products"));
      setProceedProduct(storedProduct);
    }
  }, [proceedProductFromRedux]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice =
      (proceedProduct.subtotal / 100) * 5 + proceedProduct.subtotal;

    const salesData = {
      ...formData,
      product_id: proceedProduct.id,
      product_name: proceedProduct.name,
      quantity: proceedProduct.quantity,
      product_price: proceedProduct.subtotal,
      total_price: totalPrice,
    };

    try {
      const response = await fetch(
        "http://localhost/kicksandfits/backend/api/sales.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(salesData),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        toast.success(result.message);
        setFormData({
          firstName: "",
          lastName: "",
          city: "",
          state: "",
          zip: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to place order.");
    }
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
          <Navbar />
          <section className="flex flex-row justify-between px-8 py-8 bg-stone-900 font-poppins">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-[65%] bg-stone-800 rounded-lg px-10 py-6 text-stone-300"
              onSubmit={handleSubmit}
            >
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
                  value={formData.firstName}
                  onChange={handleChange}
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
                  value={formData.lastName}
                  onChange={handleChange}
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
                  value={formData.city}
                  onChange={handleChange}
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
                  value={formData.state}
                  onChange={handleChange}
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
                  value={formData.zip}
                  onChange={handleChange}
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

              <div>
                <h1 className="text-stone-100 text-[1rem] mt-8">
                  We are only providing Cash on Deliverey just now!
                </h1>
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
              <h2 className="text-[1.5rem] font-semibold mb-10">
                Order Summary
              </h2>
              <div className="flex flex-row justify-between">
                <p>Product:</p>
                <p className="text-stone-200 font-medium">
                  {proceedProduct.name}
                </p>
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
                  {(proceedProduct.subtotal / 100) * 5 +
                    proceedProduct.subtotal}
                </p>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default Proceed;
