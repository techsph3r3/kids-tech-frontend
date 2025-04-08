import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login error – check console");
    }
  };

  return <button onClick={handleLogin}>Login and Get OneNote Data</button>;
};

export default LoginButton;

