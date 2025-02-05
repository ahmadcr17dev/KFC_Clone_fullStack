import React, { useState } from "react";

const UpdateProduct = () => {
  const [productsearch, setproductsearch] = useState("");
  const [products, setproducts] = useState([]);

  const handlefetchproducts = async () => {
    try {
      const response = await fetch(
        `http://localhost/kicksandfits/backend/api/updateproduct.php?search=${productsearch}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text(); // Get response as text
      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text); // Parse JSON
      console.log("Fetched Products:", data);

      if (!data.success) {
        console.error("Error:", data.message);
      } else {
        setproducts(data.products); // Set products if found
      }
    } catch (error) {
      console.error("Error in Fetch:", error.message);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setproducts(updatedProducts);
  };

  const handleSubmit = async (event, product) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/kicksandfits/backend/api/updateproduct.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <section className="font-poppins mt-8">
      <h1 className="font-semibold text-white text-3xl">Update Products</h1>
      <div>
        <input
          name="productId"
          placeholder="Product ID or Product Name"
          required
          type="text"
          value={productsearch}
          onChange={(e) => setproductsearch(e.target.value)}
          className="w-[500px] h-10 px-2 mt-8 text-sm font-medium text-stone-100 bg-stone-800 border-stone-500 rounded focus:outline-0"
        />
        <button
          className="bg-red-500 py-2 px-10 rounded text-sm text-white font-medium ml-2 hover:bg-red-600"
          onClick={handlefetchproducts}
        >
          GO
        </button>
      </div>

      {products.length > 0 ? (
        products.map((product, index) => (
          <form
            key={product.id}
            className="mt-6"
            onSubmit={(e) => handleSubmit(e, product)}
          >
            <div className="flex flex-row">
              <input
                name="productId"
                placeholder="Product ID"
                required
                type="text"
                value={product.id}
                className="w-[200px] h-10 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
                readOnly
              />
              <input
                name="productName"
                placeholder="Product Name"
                required
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="w-[450px] h-10 ml-4 px-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
              <input
                name="productPrice"
                placeholder="Product Price"
                required
                type="text"
                value={product.price}
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
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
                value={product.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                className="mt-4 p-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
              />
              <div className="flex flex-col">
                <select
                  name="productCategory"
                  className="text-sm bg-stone-700 text-stone-100 mt-4 h-10 p-1 ml-4 rounded focus:outline-0"
                  value={product.category}
                  onChange={(e) =>
                    handleInputChange(index, "category", e.target.value)
                  }
                >
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
                  value={product.stock_status}
                  onChange={(e) =>
                    handleInputChange(index, "stock_status", e.target.value)
                  }
                  className="w-[250px] h-10 px-2 ml-4 mt-2 text-sm font-medium text-stone-100 bg-stone-700 border-stone-500 rounded focus:outline-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 text-sm text-white bg-blue-600 rounded focus:outline-0"
            >
              Update Product
            </button>
          </form>
        ))
      ) : (
        <p className="text-white text-xl text-center">No Products to show</p>
      )}
    </section>
  );
};

export default UpdateProduct;
