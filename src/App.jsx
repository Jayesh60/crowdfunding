import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { useStateContext } from "./context";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { Footer } from "./components/Footer";
import LandingPage from "./pages/LandingPage";

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
  const path = useLocation();

  useEffect(() => {
    const Sessionuser = localStorage.getItem("user");
    // console.log(Sessionuser)
    if (!Sessionuser) {
      navigate("/about");
    }
  }, [user]);

  return (
    <div
      className={`relative ${
        activeTheme ? "bg-black" : "bg-[#CFE2F3]"
      } min-h-screen flex !flex-col h-full w-full transition duration-500 select-none overflow-hidden gap-5`}
    >
      {path.pathname !== "/about" && <Sidebar />}

      <div
        className={`flex flex-col ${
          path.pathname !== "/about" ? "" : "w-full"
        }  max-sm:w-full items-center justify-center px-6`}
      >
        {path.pathname !== "/about" && <Navbar />}

        <Routes>
          <Route path="/about" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
