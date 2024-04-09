import { mission } from "../assets";

const Mission = () => {
  return (
    <div className="h-screen flex max-md:flex-col-reverse bg-white md:px-20 px-6 gap-5 max-md:gap-10 justify-center items-center max-md:py-10">
      <div className="md:w-1/2 max-md:h-1/2 flex flex-col justify-center gap-10 ">
        <div>
          <h4 className="text-xs text-light-gray">HUMANITARIAN MISSION</h4>
          <h1 className="text-3xl font-bold">
            Help the Affected by <br />
            <span className="text-green"> Disasters</span>,{" "}
            <span className="text-green"> Shortages</span>, and <br />
            <span className="text-green"> Emergency Relief</span>.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 gap-y-4 max-md:text-sm">
          <div className="w-[48%]">
            <span className="text-green">1 </span>
            Donations have been verified and still active.
          </div>
          <div className="w-[48%]">
            <span className="text-green">10,517 </span>
            donations have been distributed to the needy.
          </div>
          <div className="w-[48%]">
            <span className="text-green">6,450 </span>
            Donations have been distributed to disaster-affected areas.
          </div>
          <div className="w-[48%]">
            <span className="text-green">5,058 </span>
            donations were distributed to social foundations and orphanages.
          </div>
          <div className="w-[48%]">
            <span className="text-green">1.4 Billion </span>
            total funds raised so far.
          </div>
          <div className="w-[48%]">
            <span className="text-green">4,803 </span>
            donations have been distributed to people in emergency situations.
          </div>
        </div>
      </div>
      <div className="md:w-1/2 max-md:h-1/2 h-[70%]">
        <img src={mission} alt="" className="w-full object-contain h-full" />
      </div>
    </div>
  );
};

export default Mission;
