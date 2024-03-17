import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { StateContextProvider } from "../context";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", data.email)
      );
      const docsnap = await getDocs(q);

      if (docsnap.empty) {
        toast.error("Invalid Credentials...");
      } else {
        const userDoc = docsnap.docs[0];
        const userData = userDoc.data();
        if (userData.password === data.password) {
          localStorage.setItem("user", data);
          navigate("/");
          toast.success("LoggedIn Successfully!");
        } else {
          setData({ email: "", password: "" });
          setErrorMessage("password is incorrect...");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("something went wrong...");
    }
  };

  return (
    <div className="inset-0 w-full bg-light-gray text-white flex items-center justify-center h-[100vh] absolute z-50">
      <div className="h-fit bg-black md:w-[30%] w-[90%] flex flex-col p-6 px-8 items-center justify-center rounded-md">
        <img src="/src/assets/logo.svg" alt="" className="h-24" />
        <form
          onSubmit={handleLoginSubmit}
          className="pt-2 w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 text-green">
            <label htmlFor="email" className="font-[500]">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              value={data.email}
              placeholder="Email"
              className="w-full h-8 px-4 border border-green bg-transparent outline-none focus:outline-golden outline-offset-0 focus:outline-1 rounded-[2px] placeholder:text-green transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2 text-green">
            <label htmlFor="password" className="font-[500]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={data.password}
              placeholder="Password"
              className="w-full h-8 px-4 border border-green bg-transparent outline-none focus:outline-golden outline-offset-0 focus:outline-1 rounded-[2px] placeholder:text-green transition-all duration-300"
            />
          </div>
          <div className="text-red-500 font-[500] h-5">
            {errorMessage && errorMessage}
          </div>
          <button className="w-fit bg-green text-black font-[500] px-8 py-2 rounded">
            Login
          </button>

          <p className="text-green italic">
            Not registered?{" "}
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
