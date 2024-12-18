import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const HomePage = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
          <section>
            <h1 className="text-black text-lg">
                This is Admin Page
            </h1>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;