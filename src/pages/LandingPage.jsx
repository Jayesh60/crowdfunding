import { useEffect, useState } from "react";
import ContactCTA from "../components/ContactCTA";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import { useStateContext } from "../context";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";

const LandingPage = () => {
  const { user, getTotalNumberOfCampaigns } = useStateContext();

  // useEffect(() => {
  //   const getCampaigns = async () => {
  //     const total = await getTotalNumberOfCampaigns();
  //     console.log(total);
  //   };
  //   getCampaigns();
  // }, []);

  const [loggedInUser, setLoggedInUser] = useState("");

  const [loginToggle, setLoginToggle] = useState(false);
  const [regToggle, setRegToggle] = useState(false);

  useEffect(() => {
    const Sessionuser = localStorage.getItem("user");
    if (Sessionuser) setLoggedInUser(Sessionuser);
    // console.log(loggedInUser);
  }, [user]);

  return (
    <section className="relative">
      {loginToggle && <LoginPage handleLogin={setLoginToggle} />}
      {regToggle && <SignUpPage handleReg={setRegToggle} />}
      <Hero
        user={loggedInUser && loggedInUser}
        handleLogin={setLoginToggle}
        handleReg={setRegToggle}
      />
      <Mission />
      <ContactCTA />
    </section>
  );
};

export default LandingPage;
