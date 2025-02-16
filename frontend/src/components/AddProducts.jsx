import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddProducts = () => {
  // states to handle
  const [productid, setproductid] = useState("");
  const [productname, setproductname] = useState("");
  const [productprice, setproductprice] = useState("");
  const [productstock, setproductstock] = useState("");
  const [productcategory, setproductcategory] = useState("");
  const [productdiscount, setproductdiscount] = useState("");
  const [productimage, setproductimage] = useState(null);
  const [productdescription, setproductdescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [small, setsmall] = useState(false);
  const [medium, setmedium] = useState(false);
  const [large, setlarge] = useState(false);
  const [smallprice, setsmallprice] = useState("");
  const [mediumprice, setmediumprice] = useState("");
  const [largeprice, setlargeprice] = useState("");

  // api key
  const upload_product_key = import.meta.env.VITE_UPLOAD_PRODUCTS_KEY;

  // a function to add data into form and it will work with php code
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("productid", productid);
    formdata.append("productname", productname);
    formdata.append("productprice", productprice);
    formdata.append("productdescription", productdescription);
    formdata.append("productcategory", productcategory);
    formdata.append("productstock", productstock);
    formdata.append("productdiscount", productdiscount);
    formdata.append("productimage", productimage);
    formdata.append("smallprice", smallprice);
    formdata.append("mediumprice", mediumprice);
    formdata.append("largeprice", largeprice);

    try {
      const response = await axios.post(upload_product_key, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // it will reset form after successful submission
  const resetForm = () => {
    setsmall(false);
    setmedium(false);
    setlarge(false);
    setsmallprice("");
    setmediumprice("");
    setlargeprice("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setproductimage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="bg-stone-800 py-6 px-8 mt-6 font-poppins rounded">
      <h1 className="text-white text-2xl font-medium">Add Products</h1>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <input
            name="productId"
            placeholder="Product ID"
            type="text"
            value={productid}
            required
            onChange={(e) => setproductid(e.target.value)}
            className="w-[200px] h-10 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
          />
          <input
            name="productName"
            placeholder="Product Name"
            required
            type="text"
            value={productname}
            onChange={(e) => setproductname(e.target.value)}
            className="w-[450px] h-10 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
          />
          <input
            name="productPrice"
            placeholder="Product Price"
            required
            type="text"
            value={productprice}
            onChange={(e) => setproductprice(e.target.value)}
            className="w-[250px] h-10 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
          />
        </div>

        <div className="flex flex-row">
          <textarea
            name="productDescription"
            placeholder="Product Description"
            required
            rows={"5"}
            cols={"90"}
            value={productdescription}
            onChange={(e) => setproductdescription(e.target.value)}
            className="mt-4 p-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
          />
          <div className="flex flex-col">
            <select
              name="productCategory"
              value={productcategory}
              onChange={(e) => setproductcategory(e.target.value)}
              className="text-sm bg-stone-700 text-stone-100 mt-4 h-10 p-1 ml-4 rounded focus:outline-0"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="fries">Fries</option>
              <option value="chicken">Chicken</option>
              <option value="drinks">Drink</option>
              <option value="family">Family</option>
            </select>
            <input
              name="stockStatus"
              placeholder="Stock Status"
              required
              type="number"
              min="0"
              max="30"
              value={productstock}
              onChange={(e) => setproductstock(e.target.value)}
              className="w-[250px] h-10 px-2 ml-4 mt-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
            />
            <input
              name="discount"
              placeholder="Discount"
              required
              type="text"
              value={productdiscount}
              onChange={(e) => setproductdiscount(e.target.value)}
              className="w-[250px] h-10 px-2 ml-4 mt-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-stone-100 py-1">
          <label className="text-stone-100">Select Sizes:</label>
          <div className="flex flex-row items-center space-x-4 mt-2">
            <label>
              <input
                type="checkbox"
                value={small}
                onChange={() => setsmall(!small)}
              />{" "}
              Small
            </label>
            {small && (
              <input
                name="smallprice"
                placeholder="Small Price"
                required
                type="text"
                value={smallprice}
                onChange={(e) => setsmallprice(e.target.value)}
                className="w-[10rem] h-5 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
            )}
            <label>
              <input
                type="checkbox"
                value={medium}
                onChange={() => setmedium(!medium)}
              />{" "}
              Medium
            </label>
            {medium && (
              <input
                name="mediumprice"
                placeholder="Medium Price"
                required
                type="text"
                value={mediumprice}
                onChange={(e) => setmediumprice(e.target.value)}
                className="w-[10rem] h-5 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
            )}
            <label>
              <input
                type="checkbox"
                value={large}
                onChange={() => setlarge(!large)}
              />{" "}
              Large
            </label>
            {large && (
              <input
                name="largeprice"
                placeholder="Large Price"
                required
                type="text"
                value={largeprice}
                onChange={(e) => setlargeprice(e.target.value)}
                className="w-[10rem] h-5 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
            )}
          </div>
        </div>

        <label className="w-full flex flex-row mt-4 text-left py-2 px-4 text-sm text-white bg-red-600 rounded cursor-pointer focus:outline-0">
          Upload Product Image
          <input
            type="file"
            className="ml-8"
            onChange={handleImageChange}
            required
          />
        </label>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-48 h-48 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-4 py-2 text-sm text-white bg-blue-600 rounded focus:outline-0"
        >
          Submit Product
        </button>
      </form>
    </section>
  );
};

export default AddProducts;
