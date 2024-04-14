import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
import toast from "react-hot-toast";
import { categories } from "../constants";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ActiveCategory, setActiveCategory] = useState(categories[1]);
  const { createCampaign } = useStateContext();
  const [imgCount, setImgCount] = useState(0);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  const [imgList, setImgList] = useState([""]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleImg = (e, index, indexToRemove) => {
    const value = e?.target.value;
    if (index === undefined) {
      setImgList((prevImgList) => [...prevImgList, value]);
    } else {
      setImgList((prevImgList) => {
        const newImgList = [...prevImgList];
        if (indexToRemove !== undefined) {
          newImgList.splice(indexToRemove, 1);
          setImgCount((p) => p - 1);
        } else {
          newImgList[index] = value;
        }
        return newImgList;
      });
    }
  };

  console.log(ActiveCategory?.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form",form);
    checkIfImage(imgList, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          image: imgList,
          category: ActiveCategory?.value,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
        toast.success("Campaign Created!");
      } else {
        // alert("Provide valid image URL");
        toast.error("Not an Image");
        setForm({ ...form, image: "" });
      }
    });
  };
  const animatedComponents = makeAnimated();
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <label htmlFor="category" className="text-green">
          Category *
        </label>
        <Select
          defaultValue={categories[1]}
          components={animatedComponents}
          options={categories.slice(1)}
          onChange={setActiveCategory}
          className="basic-single"
          classNamePrefix="select"
        />

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label className="w-full">
              <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#FFFFFF] mb-[10px]">
                Image*
              </span>
            </label>

            <div
              className="flex-none text-white cursor-pointer bg-gray-600 opacity-90 px-2 py-1 rounded-sm bg-opacity-90 text-sm"
              onClick={() => {
                setImgCount((p) => p + 1);
                setImgList((prevImgList) => [...prevImgList, ""]);
              }}
            >
              Add Another Image+
            </div>
          </div>

          <input
            required
            // value={value}
            onChange={(e) => handleImg(e, 0)}
            step="0.1"
            placeholder={"Paste image URL of your campaign"}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          />

          {[...Array(imgCount)].map((i, index) => (
            <div className="flex relative w-full items-center" key={index}>
              <input
                required
                value={imgList[index + 1]}
                onChange={(e) => handleImg(e, index + 1)}
                step="0.1"
                placeholder={"Paste image URL of your campaign"}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] w-full"
              />
              <span
                className="absolute right-5 rotate-90 cursor-pointer text-red-600"
                onClick={() => {
                  handleImg(null, null, index + 1);
                }}
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/FA5252/multiply.png"
                  alt="multiply"
                />
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title={isLoading ? "Submitting..." : "Submit new campaign"}
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
