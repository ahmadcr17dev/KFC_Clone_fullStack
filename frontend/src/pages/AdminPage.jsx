import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { Outlet } from "react-router-dom"; // Import Outlet
import AdminSideBar from "../components/AdminSideBar";

const AdminPage = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 3000);
    return () => clearTimeout(timer);
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
            visible={true}
          />
        </div>
      ) : (
        <section className="bg-stone-700 w-full h-screen flex flex-row">
          <div className="bg-stone-800 w-fit h-full py-10 pl-6 pr-4">
            <AdminSideBar />
          </div>
          <div className="ml-8">
            <Outlet />
          </div>
        </section>
      )}
    </>
  );
};

export default AdminPage;
