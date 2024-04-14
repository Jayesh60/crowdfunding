import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect } from "@thirdweb-dev/react";
import { useStateContext } from "../context";
import toast from "react-hot-toast";
import CustomButton from "./CustomButton";

const Sidebar = () => {
  const navigate = useNavigate();
  const disConnect = useDisconnect();
  const [isActive, setIsActive] = useState("dashboard");
  const { activeTheme, setActiveTheme, user, setUser } = useStateContext();
  const { connect, address } = useStateContext();

  const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div
      className={`w-[38px] h-[38px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );

  return (
    <div className="hidden md:flex justify-between items-center bg-[#1c1c24] w-full md:px-16">
      <Link
        to="/"
        onClick={() => setIsActive("dashboard")}
        className="flex gap-2 items-center text-white text-xl font-bold font-epilogue uppercase"
      >
        <Icon styles="w-[34px] h-[34px] bg-[#2c2f32]" imgUrl={logo} />
        <h1>Fund'Dive</h1>
      </Link>

      <div className=" flex justify-between items-center  rounded-[20px] py-3">
        <div className="flex cursor-pointer justify-center items-center gap-2">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (link.name === "disConnect") {
                  disConnect();
                  localStorage.removeItem("user");
                  setUser({});
                  toast.success("Logged Out Successfully!");
                } else if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
          <Icon
            styles="bg-[#1c1c24]"
            imgUrl={sun}
            handleClick={() => setActiveTheme((p) => !p)}
          />

          <CustomButton
            btnType="button"
            title={address ? "Create a campaign" : "Connect Wallet"}
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("create-campaign");
              else connect();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
