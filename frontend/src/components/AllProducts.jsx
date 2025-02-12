import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Close icon

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    stock_status: "",
    image: null, // File input
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/kicksandfits/backend/api/allproducts.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setProducts(data.products);
          } else {
            console.log("Error: No products found");
          }
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        "http://localhost/kicksandfits/backend/api/deleteproduct.php",
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.status) {
        setProducts(products.filter((item) => item.id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in Catch:", error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      stock_status: product.stock_status,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock_status", formData.stock_status);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(
        "http://localhost/kicksandfits/backend/api/updateproduct.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success(data.message);
        setIsModalOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in Catch:", error);
    }
  };

  return (
    <>
      <section className="mt-6 font-poppins text-white">
        <h1 className="text-3xl text-white font-semibold">Products</h1>
        <div className="overflow-x-auto mt-8 max-h-[500px]">
          <table className="table-auto w-[1000px] text-center border-collapse border border-gray-300">
            <thead className="sticky top-0">
              <tr className="bg-stone-900 font-medium">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Stock</th>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="bg-stone-700 text-sm">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">Rs: {product.price}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2">{product.stock_status}</td>
                  <td className="border px-4 py-2">
                    <MdEdit
                      size={"1rem"}
                      className="hover:cursor-pointer hover:text-red-500"
                      onClick={() => handleEditProduct(product)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <IoMdTrash
                      size={"1rem"}
                      className="hover:cursor-pointer hover:text-red-500"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal for Editing Product */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              <IoClose size="1.5rem" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 mb-2"
                placeholder="Product Name"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 mb-2"
                placeholder="Price"
              />
              <input
                type="number"
                name="stock_status"
                value={formData.stock_status}
                onChange={handleChange}
                className="w-full border p-2 mb-2"
                placeholder="Stock"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border p-2 mb-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
