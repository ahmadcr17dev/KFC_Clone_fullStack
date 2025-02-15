import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import Login from "../components/Login";

const LoginPage = ({setuser}) => {
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
          <Login setuser={setuser} />
        </>
      )}
    </>
  );
};

export default LoginPage;
