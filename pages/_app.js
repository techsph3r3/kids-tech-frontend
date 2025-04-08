import { useEffect } from "react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../lib/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// Optional: handle redirect to close the popup
if (typeof window !== "undefined") {
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  });
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      msalInstance
        .handleRedirectPromise()
        .catch((err) => console.error("MSAL redirect error:", err));
    }
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

export default MyApp;
