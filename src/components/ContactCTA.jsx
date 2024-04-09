import { Link } from "react-router-dom";
import { hands } from "../assets";

const ContactCTA = () => {
  return (
    <div className="h-[70vh] bg-white px-6 md:px-40 py-20 ">
      <div className="h-[40vh] bg-contact flex max-md:flex-col items-center justify-between rounded-xl">
        <div className="flex flex-col justify-around px-20 py-5 text-white">
          <div>
            <h1>Contact</h1>
            <Link className="text-3xl font-medium " to={""}>
              +919309778157
            </Link>
          </div>
          <div>
            <h1>Email</h1>
            <Link className="text-3xl font-medium " to={""}>
              contact@fund.in
            </Link>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            src={hands}
            alt=""
            className="h-full w-full object-cover object-center rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
