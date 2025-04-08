import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";

export default function Home() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const callBackend = async () => {
      if (accounts.length === 0) return;

      try {
        const tokenResponse = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });

        const response = await fetch("https://kids-tech-backend.vercel.app/api/onenote", {
          headers: {
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          },
        });

        const data = await response.json();
        console.log("OneNote Data:", data);
        alert("Notebook data retrieved — check the console!");
      } catch (err) {
        console.error("Token fetch or backend call failed:", err);
        alert("Something went wrong — check the console.");
      }
    };

    callBackend();
  }, [accounts]);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Kids Tech Frontend</h1>
      <p>If you're not signed in yet, click below:</p>
      <button onClick={() => instance.loginRedirect(loginRequest)}>
        Login and Get OneNote Data
      </button>
    </main>
  );
}
