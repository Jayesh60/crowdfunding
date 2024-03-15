import { useStateContext } from "../context";
import { facebook, linkedin, whatsapp, x } from "../assets";

const ShareBtn = ({ description }) => {
  const url = window.location.href;
  const { activeTheme } = useStateContext();

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`${
          activeTheme ? "text-white" : "text-black"
        } font-epilogue font-semibold uppercase`}
      >
        Share on
      </div>
      <div className="flex items-center gap-1">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
        >
          <img src={facebook} alt="facebook-new" className="h-8" />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
            description
          )}`}
          target="_blank"
        >
          <img src={x} alt="" className="h-8" />
        </a>

        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
        >
          <img src={linkedin} alt="" className="h-8" />
        </a>

        {/* Whatsapp */}
        <a
          href={`whatsapp://send?text=${url} ${description}`}
          data-action="share/whatsapp/share"
          target="_blank"
        >
          <img src={whatsapp} alt="" className="h-8" />
        </a>
        {/* Whatsapp */}
      </div>
    </div>
  );
};

export default ShareBtn;
