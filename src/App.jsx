import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

//import { Sidebar, Navbar } from './components'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { useStateContext } from "./context";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

const App = () => {
  const { activeTheme, setActiveTheme, user, setUser } = useStateContext();
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleDarkModeChange = (event) => {
      setActiveTheme(event.matches);
    };

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);
    setActiveTheme(darkModeMediaQuery.matches);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const Sessionuser = localStorage.getItem("user");
    if (!Sessionuser) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div
      className={`relative sm:-8 p-4 ${
        activeTheme ? "bg-black" : "bg-[#CFE2F3]"
      } min-h-screen flex flex-row transition duration-500`}
    >
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
