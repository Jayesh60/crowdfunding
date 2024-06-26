import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../assets";
import { daysLeft } from "../utils";
import { useStateContext } from "../context";

const DisplayCampaigns = ({ title, isLoading, campaigns, profile }) => {
  const { activeTheme, setActiveTheme } = useStateContext();
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign });
  };

  // const dataList = campaigns.filter((item) => {
  //   const daysL = daysLeft(item.deadline);
  //   return daysL >= 0;
  // });


  return (
    <div className="min-h-screen">
      <h1
        className={`${
          activeTheme ? "text-white" : "text-black"
        } font-epilogue font-semibold py-2  `}
      >
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            Oopss!! Sorry, There's No Campaigns available
          </p>
        )}

        {!isLoading && !profile &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
        {!isLoading && profile &&
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
