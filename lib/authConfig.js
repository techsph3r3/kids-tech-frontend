export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: process.env.NEXT_PUBLIC_MSAL_SCOPES?.split(" ") || ["User.Read", "Notes.Read"],
};
