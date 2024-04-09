import { Link } from "react-router-dom";
import { logo } from "../assets";

const Hero = ({ user, handleLogin, handleReg }) => {


  return (
    <div className="md:px-16 px-6 relative w-full bg-no-repeat bg-center bg-[url('/src/assets/home-banner.png')] bg-cover">
      <nav className="flex justify-between py-5 z-10 w-full h-full ">
        <div className="flex gap-3 text-white items-center">
          <img src={logo} alt="" className="" />
          <h1 className="font-bold text-xl">FundDive</h1>
        </div>
        <div className="text-green flex md:gap-10 gap-2 text-sm font-medium">
          {user === "" ? (
            <>
              <button onClick={()=> handleLogin(true)}>Login</button>
              <button onClick={()=> handleReg(true)} className=" px-4 md:px-7 py-1 md:py-1.5 border bg-green text-black duration-300 border-green md:rounded-2xl rounded-3xl text-sm">
                Signup
              </button>
            </>
          ) : (
            user
          )}
        </div>
      </nav>
      <div className="flex flex-col items-center w-full gap-8 h-[90vh] max-md:pt-16 pt-20 ">
        {/* <div className="bg-gray-700 p-0.5 z-10">
          <h1 className="bg-green px-4 py-2 font-bold text-xl">
            41 Total Users 12,000 Donated
          </h1>
        </div> */}
        <h1 className="text-5xl w-[85%] md:w-[50%] text-center font-bold md:-mt-16 text-white">
          <span className="text-green"> Happiness </span> comes from{" "}
          <span className="text-green"> your action.</span>
        </h1>

        <p className="text-gray-300 opacity-90 text-center">
          Be a part of the breakthrough and make someone’s dream come true.
        </p>
        {user === "" ? (
          <button onClick={()=> handleReg(true)} className="w-fit px-6 py-2 font-semibold bg-green rounded-3xl">
            Create Account for free
          </button>
        ) : (
          <Link to={'/'} className="w-fit px-6 py-2 font-semibold bg-green rounded-3xl">
            Go to Home Page
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
