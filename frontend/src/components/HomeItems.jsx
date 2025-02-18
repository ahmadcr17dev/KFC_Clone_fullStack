import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeItems = () => {
  const [items, setItems] = useState([]);
  const homeitems_key = import.meta.env.VITE_HOME_ITEMS_KEY;

  useEffect(() => {
    const handlefetch = async () => {
      try {
        await axios
          .get("https://kicksandfits.lovestoblog.com/api/homeitems.php", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("API Data:", response.data);
            setItems(Array.isArray(response.data) ? response.data : []);
          })
          .catch((error) => console.error("Fetch error:", error));
      } catch (error) {
        console.log("Error in catch: ", error);
      }
    };
    handlefetch();
  }, []);

  return (
    <section className="mt-24 font-poppins pb-16 px-6 md:px-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl text-white font-bold text-left">
        BEST SELLER
      </h1>
      <p className="text-red-600 font-bold text-left -mt-3">__________</p>

      {/* Products Grid */}
      {items.length === 0 ? (
        <p>No item to show</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-stone-800 rounded-lg shadow-md p-4 hover:cursor-pointer transition-transform hover:scale-105"
            >
              <p className="text-white font-semibold text-xl md:text-2xl">
                {item.name}
              </p>
              <p className="text-white font-semibold bg-red-600 w-fit px-4 py-1 rounded-tr-xl rounded-bl-xl mt-2">
                Rs: {item.price}
              </p>
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-md mt-4"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeItems;
