import { useStateContext } from "../context";
import { facebook, linkedin, whatsapp, x } from "../assets";
import toast from "react-hot-toast";

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

        {/* <a
          href={`https://www.linkedin.com/sharing/share-offsite/url=${url}?mini=true&`}
          target="_blank"
        >
          <img src={linkedin} alt="" className="h-8" />
        </a> */}

        {/* Whatsapp */}
        <a
          href={`whatsapp://send?text=${url} ${description}`}
          data-action="share/whatsapp/share"
          target="_blank"
        >
          <img src={whatsapp} alt="" className="h-8" />
        </a>
        {/* Whatsapp */}

        <div
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast.success('copied')
          }}
        >
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/color/32/copy-link.png"
            alt="copy-link"
          />
        </div>
      </div>
    </div>
  );
};

export default ShareBtn;
