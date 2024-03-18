import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  addDoc,
  getDoc,
  collection,
  serverTimestamp,
  doc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { logo } from "../assets";

const SignUpPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", data.email)
      );
      const docsnap = await getDocs(q);

      if (!docsnap.empty) {
        toast.error("Email Already Exists!");
      } else {
        await addDoc(collection(db, "users"), {
          email: data.email,
          password: data.password,
          timestamp: serverTimestamp(),
        });
        localStorage.setItem("user", data.email);
        setData({
          email: "",
          password: "",
        });
        navigate("/");
        toast.success("User Created!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while creating user...");
    }
  };

  return (
    <div className="inset-0 w-full bg-light-gray text-white flex items-center justify-center h-[100vh] absolute z-50">
      <div className="h-fit bg-black md:w-[30%] w-[90%] flex flex-col p-6 px-8 items-center justify-center rounded-md">
      <img src={logo} alt="" className="h-24" />
        <form
          onSubmit={handleSignUp}
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
              className=" w-full h-8 px-4 border border-green bg-transparent outline-none focus:outline-golden outline-offset-0 focus:outline-1 rounded-[2px] placeholder:text-green transition-all duration-300"
            />
          </div>
          <div className="text-red-500 font-[500] h-5">
            {errorMessage && errorMessage}
          </div>
          <button className="w-fit bg-green text-black font-[500] px-8 py-2 rounded">
            Create user
          </button>
          <p className="text-green italic">
            If already registered,{" "}
            <Link to={"/login"} className="underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
