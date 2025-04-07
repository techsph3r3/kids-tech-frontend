console.log("🟢 CLIENT_ID:", import.meta.env.VITE_CLIENT_ID);
console.log("🟢 TENANT_ID:", import.meta.env.VITE_TENANT_ID);
console.log("🟢 REDIRECT_URI:", import.meta.env.VITE_REDIRECT_URI);

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Notes.Read.All", "openid", "profile", "offline_access"],
};
