import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//import { Sidebar, Navbar } from './components'
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
      } min-h-screen flex flex-row  transition duration-500 select-none overflow-hidden`}
    >
      {path.pathname !== "/about" && (
        <>
          <div className="sm:flex px-6 pt-2 z-20 hidden fixed mr-10 ">
            <Sidebar />
          </div>

          <div className="w-[10%] md:flex max-md:hidden"></div>
        </>
      )}

      <div
        className={`flex-1 ${
          path.pathname !== "/about" ? "px-6 pt-2 max-w-[1280px] mx-auto pb-32": "w-full"
        }  max-sm:w-full `}
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
