import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";
import { search } from "../assets";
import { categories } from "../constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { address, contract, getCampaigns } = useStateContext();
  const { activeTheme, setActiveTheme } = useStateContext();

  const [ActiveCategory, setActiveCategory] = useState("All");

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    // console.log(data)
    data.reverse();
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
        regex.test(item.title) ||
        regex.test(item.category)
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

  return (
    <div className="md:px-16 w-full">
      <div className="flex flex-row md:w-[458px] py-3 shadow-search-bar items-center pl-2 border-gray-500 border border-opacity-90 rounded-md mb-5">
        <input
          type="text"
          placeholder="Search campaigns, creators, and categories"
          className={`flex w-full font-epilogue font-normal placeholder:text-sm bg-transparent outline-none px-2 ${
            activeTheme
              ? "text-green placeholder:text-[#4acd8ef1]"
              : "text-black placeholder:text-black"
          }`}
          value={searchText}
          onChange={handleSearchChange}
        />

        <div className="w-[72px] h-full flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full pb-4 border-b border-gray-600 mb-5">
        {/* <h1>Categories</h1> */}
        <div className="flex flex-wrap md:gap-4 gap-2 items-center max-md:justify-center font-semibold">
          {categories.map((item, index) => (
            <p
              key={index}
              onClick={() => setActiveCategory(item.value)}
              className={`${
                ActiveCategory === item?.value
                  ? activeTheme
                    ? " text-green font-semibold"
                    : "  text-black font-semibold"
                  : activeTheme
                  ? " text-green hover:border-b hover:border-green"
                  : " text-black hover:border-b hover:border-black"
              }  max-md:text-xs ${
                activeTheme ? "border-b border-black" : "border-b"
              }  cursor-pointer transition duration-100`}
            >
              {item?.value}
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
          title={`${ActiveCategory} Campaigns`}
          isLoading={isLoading}
          campaigns={campaigns}
        />
      )}
    </div>
  );
};

export default Home;
