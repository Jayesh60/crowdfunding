import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { activeTheme, setActiveTheme } = useStateContext();

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    data.reverse();
    // console.log(data)
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchUserCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      profile={true}
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
