import { StateContextProvider } from "./context";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
// import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import App from "./App";
import "./index.css";

// import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
// import { defineChain } from "thirdweb";
// import { ThirdwebProvider } from "thirdweb/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// create the client with your clientId, or secretKey if in a server environment
// export const client = createThirdwebClient({
//   clientId: "ffae7d98c07e329537e812b35eb85545",
// });

// // connect to your contract
// export const contract = getContract({
//   client,
//   chain: defineChain(80002),
//   address: "0xf5dFfcc558d05211fb46A701183e8aF241AD07f8",
// });



root.render(
  <ThirdwebProvider
  activeChain={ChainId.AvalancheFujiTestnet}
  clientId="ffae7d98c07e329537e812b35eb85545"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
