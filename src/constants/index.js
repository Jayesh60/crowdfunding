import {
  createCampaign,
  dashboard,
  logout,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  // {
  //   name: 'withdraw',
  //   imgUrl: withdraw,
  //   link: '/',
  //   disabled: true,
  // },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "disConnect",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];

export const categories = [
  { value: "All", label: "All" },
  // { value: "Education", label: "Education" },
  { value: "Art", label: "Art" },
  { value: "Social Cause", label: "Social Cause" },
  { value: "Design", label: "Design" },
  { value: "Technology", label: "Technology" },
  { value: "Fashion", label: "Fashion" },
  { value: "Photography", label: "Photography" },
  { value: "Games", label: "Games" },
  { value: "Music", label: "Music" },
];
