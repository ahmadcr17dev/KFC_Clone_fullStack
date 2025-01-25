import React from "react";

const AddProducts = () => {
  return (
    <>
      <section className="bg-stone-800 py-6 px-8 font-poppins rounded">
        <h1 className="text-white text-2xl font-medium">Add Products</h1>
        <form className="mt-10">
          <div className="flex flex-row">
            <input
              placeholder="Product ID"
              required
              type="text"
              className="w-[200px] h-10 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
            />
            <input
              placeholder="Product Name"
              required
              type="text"
              className="w-[450px] h-10 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
            />
            <input
              placeholder="Product price"
              required
              type="text"
              className="w-[250px] h-10 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
            />
          </div>
          <div className="flex flex-row">
            <textarea
              placeholder="Product Description"
              required
              type="text"
              rows={"5"}
              cols={"90"}
              className="mt-4 p-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
            />
            <div className="flex flex-col">
              <select className="text-sm bg-stone-700 text-stone-100 mt-4 h-10 p-1 ml-4 rounded focus:outline-0">
                <option disabled>Select Category</option>
                <option value={"pizza"}>Pizza</option>
                <option value={"burger"}>Burger</option>
                <option value={"chicken"}>Chicken</option>
                <option value={"drinks"}>Drink</option>
                <option value={"family"}>Family Deals</option>
              </select>
              <input
                placeholder="Stock Status"
                required
                type="number"
                min={"0"}
                max={"30"}
                className="w-[250px] h-10 px-2 ml-4 mt-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
              <input
                placeholder="Discount"
                required
                type="text"
                className="w-[250px] h-10 px-2 ml-4 mt-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-sm text-white bg-red-600 rounded focus:outline-0">
            Upload Product Image
          </button>
        </form>
      </section>
    </>
  );
};

export default AddProducts;
