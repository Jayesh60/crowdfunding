import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//import { Sidebar, Navbar } from './components'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { useStateContext } from './context';

const App = () => {
  const {activeTheme, setActiveTheme} = useStateContext();
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleDarkModeChange = (event) => {
      setActiveTheme(event.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    setActiveTheme(darkModeMediaQuery.matches);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  return (
    <div className={`relative sm:-8 p-4 ${activeTheme ? 'bg-black':'bg-[#CFE2F3]'} min-h-screen flex flex-row transition duration-500`}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/*👇👇 Uncomment when you want profile page  */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
