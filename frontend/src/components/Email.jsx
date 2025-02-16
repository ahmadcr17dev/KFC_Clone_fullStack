import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

const Styledsection = styled.section`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Email = () => {
  const [email, setemail] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const api_key = import.meta.env.VITE_EMAIL_KEY;
    try {
      const response = await fetch(api_key, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
        setemail("");
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Styledsection className="container mt-16 pb-16 text-center font-poppins">
        <h3 className="text-[1.4rem] xl:text-4xl lg:text-4xl md:text-3xl text-white font-bold">
          Subscribe To Our Email
        </h3>
        <form onSubmit={handlesubmit}>
          <input
            placeholder="Email Address"
            className="email bg-stone-700 text-white pl-6 py-3 mt-6 rounded-sm text-lg mb-4 w-[19rem] xl:w-[35rem] lg:w-[30rem] md:w-[19rem]"
            required
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <button
            className="button bg-red-600 px-11 py-3 font-medium rounded-sm ml-1 text-white text-lg hover:cursor-pointer hover:bg-red-700 md:mt-4"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </Styledsection>
    </>
  );
};

export default Email;
