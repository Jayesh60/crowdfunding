import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";
import { daysLeft } from "../utils";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [activeCamps, setActiveCamp] = useState([]);
  const [inactiveCamp, setInactiveCamp] = useState([]);
  const { activeTheme, setActiveTheme } = useStateContext();

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    await data.reverse();

    const activeCamps = await data.filter(
      (item) => daysLeft(item.deadline) > 0
    );
    setActiveCamp(activeCamps);

    const inactiveCamps = await data.filter(
      (item) => daysLeft(item.deadline) <= 0
    );
    setInactiveCamp(inactiveCamps);

    // console.log(data)
    // setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchUserCampaigns();
  }, [address, contract]);

  return (
    <div className="w-full">
      <DisplayCampaigns
        profile={true}
        title="Active Campaigns"
        isLoading={isLoading}
        campaigns={activeCamps}
      />
      <DisplayCampaigns
        profile={true}
        title="Inactive Campaigns"
        isLoading={isLoading}
        campaigns={inactiveCamp}
      />
    </div>
  );
};

export default Profile;
