import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";

const LoginButton = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = async () => {
    try {
      const loginResp = await instance.loginPopup(loginRequest);

      const tokenResp = await instance.acquireTokenSilent({
        ...loginRequest,
        account: loginResp.account,
      });

      const accessToken = tokenResp.accessToken;

      const response = await fetch("https://kids-tech-backend.vercel.app/api/onenote", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log("Graph API Response:", data);
      alert("Check console for OneNote data");
    } catch (err) {
      console.error("Auth or fetch error:", err);
      alert("Something went wrong (check console)");
    }
  };

  return <button onClick={handleLogin}>Login and Get OneNote Data</button>;
};

export default LoginButton;
