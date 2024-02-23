import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";
import { search } from "../assets";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { address, contract, getCampaigns } = useStateContext();

  const [ActiveCategory, setActiveCategory] = useState("All");

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();

    if (ActiveCategory !== "All") {
      const data2 = await data.filter(
        (item) => item.category === ActiveCategory
      );
      setCampaigns(data2);
    } else {
      setCampaigns(data);
    }
    setIsLoading(false);
  };

  const filterPrompts = (search) => {
    const regex = new RegExp(search, "i");
    return campaigns.filter(
      (item) =>
        regex.test(item.description) ||
        regex.test(item.name) ||
        regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract, ActiveCategory]);

  const categories = ["All", "Education", "Business", "Social Cause", "Gaming"];

  return (
    <div>
      <div className="lg:flex-1 flex flex-row md:w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-3xl md:absolute md:top-5 mb-5">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[#e8e4e4] placeholder:text-[#FFFFFF80]  bg-transparent outline-none px-2"
          value={searchText}
          onChange={handleSearchChange}
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* <h1>Categories</h1> */}
        <div className="flex md:gap-2 items-center max-md:justify-center">
          {categories.map((item, index) => (
            <p
              key={index}
              onClick={() => setActiveCategory(item)}
              className={`${
                ActiveCategory === item
                  ? " bg-black text-green-500 font-semibold"
                  : ""
              } md:px-6 px-3 py-1.5 rounded-md max-md:text-xs  md:py-1.5 cursor-pointer transition duration-300`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {searchText ? (
        <DisplayCampaigns
          title="All Campaigns"
          isLoading={isLoading}
          campaigns={searchedResults}
        />
      ) : (
        <DisplayCampaigns
          title="All Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      )}
    </div>
  );
};

export default Home;
