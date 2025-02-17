import React, { useEffect, useState } from "react";

const Sales = () => {
  const [products, setproducts] = useState([]);
  const api_adminsales = import.meta.env.VITE_ADMINSALES_KEY;

  useEffect(() => {
    const fetchsales = async () => {
      try {
        const response = await fetch(api_adminsales, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setproducts(data.products);
          } else {
            console.log("Failed to load sales");
          }
        }
      } catch (error) {
        console.log("Error in catch: ", error);
      }
    };
    fetchsales();
  }, []);

  return (
    <section className="mt-6 font-poppins text-white">
      <h1 className="text-3xl text-white font-semibold">Sales</h1>
      <div className="overflow-x-auto mt-8 max-h-[500px]">
        <table className="table-auto w-auto text-center border-collapse border border-gray-300">
          <thead className="sticky top-0">
            <tr className="bg-stone-900 font-medium">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Bill</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="bg-stone-700 text-sm">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">
                  {product.fname + " " + product.lname}
                </td>
                <td className="border px-4 py-2">
                  {product.city + " " + product.state}
                </td>
                <td className="border px-4 py-2">{product.product_name}</td>
                <td className="border px-4 py-2">{product.product_price}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.pay_bill}</td>
                <td className="border px-4 py-2">{product.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Sales;
