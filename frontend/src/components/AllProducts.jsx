import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const handlefetch = async () => {
      try {
        const response = await fetch('http://localhost/kicksandfits/backend/api/allproducts.php', {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log("Data:", data.products);
            setproducts(data.products); // Make sure you're setting 'users' key
          } else {
            console.log("Error: No users found");
          }
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    handlefetch();
  }, []);

  return (
    <>
      <section className="mt-6 font-poppins text-white">
        <h1 className="text-3xl text-white font-semibold">Products</h1>
        <div className="overflow-x-auto mt-8 max-h-[500px]">
          <table className="table-auto w-full text-center border-collapse border border-gray-300">
            <thead>
              <tr className="bg-stone-900 font-medium">
                <th className="border border-stone-500 px-4 py-2">No.</th>
                <th className="border border-stone-500 px-4 py-2">ID.</th>
                <th className="border border-stone-500 px-4 py-2">Name</th>
                <th className="border border-stone-500 px-4 py-2">Price</th>
                <th className="border border-stone-500 px-4 py-2">Category</th>
                <th className="border border-stone-500 px-4 py-2">Stock</th>
                <th className="border border-stone-500 px-4 py-2">Discount</th>
                <th className="border border-stone-500 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="bg-stone-700 text-sm">
                  <td className="border border-stone-500 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    {product.id}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    Rs: {product.price}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    {product.category}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    {product.stock_status}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    {product.discount}
                  </td>
                  <td className="border border-stone-500 px-4 py-2">
                    {product.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
