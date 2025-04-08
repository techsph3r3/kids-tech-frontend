import { useEffect } from "react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../lib/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    msalInstance
      .handleRedirectPromise()
      .then((response) => {
        if (response?.account) {
          msalInstance.setActiveAccount(response.account);
        }
      })
      .catch((err) => console.error("Redirect error:", err));
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

export default MyApp;

