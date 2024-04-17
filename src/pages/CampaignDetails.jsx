import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { logo, thirdweb } from "../assets";
import ShareBtn from "../components/ShareBtn";
import toast from "react-hot-toast";

const CampaignDetails = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const {
    donate,
    getDonations,
    contract,
    address,
    activeTheme,
    setActiveTheme,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [donators, setDonators] = useState([]);

  const [confirm, setConfirm] = useState(false);
  const [dontateCmpt, setDontateCmpt] = useState(false);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);


  const handleDonate = async () => {
    setIsLoading(true);
    try {
      await donate(state.pId, amount);
      setDontateCmpt(true);
      toast.success("Donated Successfully!");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Something went wrong...");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDontateCmpt(false);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [dontateCmpt]);

  return (
    <div
      onClick={() => {
        if (confirm) {
          setConfirm(false);
        }
      }}
      className="flex items-center flex-col w-full px-0 md:px-10"
    >
      {dontateCmpt && (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col ">
          <div className="relative bg-green bg-opacity-90 md:w-[25%] w-[90%] flex flex-col p-3 px-8 items-center justify-center rounded-sm gap-2 py-4">
            <img
              width="150"
              height="150"
              src="https://img.icons8.com/clouds/150/checked--v1.png"
              alt="checked--v1"
            />
            <h1 className="text-2xl font-bold text-black text-center font-epilogue">
              Thank you for supporting the project!
            </h1>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {confirm && (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col ">
          <div className="h-fit relative bg-[#8c6dfd] bg-opacity-80 md:w-[35%] w-[90%] flex flex-col px-8 py-4 items-center justify-center rounded-sm gap-2">
            <div className="text-lg flex items-center gap-2 font-semibold text-white text-center">
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/clouds/100/error.png"
                alt="error"
              />
              DO YOU REALLY WANT TO FUND THIS CAMPAIGN?
            </div>
            <button
              onClick={handleDonate}
              className="w-fit justify-end bg-gray-800 font-medium text-white px-4 py-1 rounded-sm"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex md:flex-row flex-col gap-[30px]">
        <div className="md:flex-1 flex-col">
          <div className="flex md:w-[70vw] w-full">
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              centeredSlides
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {state?.image?.map((item, index) => (
                <SwiperSlide key={index} className="w-full h-full">
                  <img
                    src={item}
                    key={index}
                    alt="campaign"
                    className="w-full h-full aspect-video object-cover rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div
            className={`${
              activeTheme ? "text-green" : "text-black"
            } font-epilogue font-[1000] text-3xl  uppercase`}
          >
            {state.title}
          </div>
          <div>
            <h4
              className={`${
                activeTheme ? "text-white" : "text-black"
              } font-epilogue font-semibold text-[18px]  uppercase`}
            >
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={logo}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4
                  className={`${
                    activeTheme ? "text-white" : "text-black"
                  } font-epilogue font-semibold text-[14px]  uppercase`}
                >
                  {state.name}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {state?.owner.slice(0,10) + "......." + state?.owner.slice(32) }
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4
              className={`${
                activeTheme ? "text-white" : "text-black"
              } font-epilogue font-semibold text-[18px]  uppercase`}
            >
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4
              className={`${
                activeTheme ? "text-white" : "text-black"
              } font-epilogue font-semibold text-[18px]  uppercase`}
            >
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-xs md:text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item?.donator?.slice(0,10) + "......." + item?.donator?.slice(32) }
                    </p>
                    <p className="font-epilogue font-normal text-sm md:text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="pb-6">
            <ShareBtn description={"Help me with Donations"} />
          </div>
          <h4
            className={`${
              activeTheme ? "text-white" : "text-black"
            } font-epilogue font-semibold text-[18px]  uppercase`}
          >
            Fund
          </h4>
          <div className="mt-3 flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p
              className={`font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]`}
            >
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="text"
                placeholder="Avax 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <button
                className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd] ${
                  amount <= 0 && "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (amount > 0) setConfirm(true);
                }}
              >
                Fund Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
