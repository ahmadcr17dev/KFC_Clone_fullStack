import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import AdminSideBar from "../components/AdminSideBar";
import { Routes, Route } from "react-router-dom";
import AdminUsers from "../components/AdminUsers";

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
        <section className="bg-stone-700 w-full h-screen flex flex-row">
          <div className="bg-stone-800 w-fit h-full py-10 pl-6 pr-4">
            <AdminSideBar />
          </div>
          <div className="ml-8 mt-16">
            <Routes>
              <Route path="admin/users" element={<AdminUsers />} />
            </Routes>
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;
