import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

function App() {
  const { instance, accounts } = useMsal();
  const [pages, setPages] = useState([]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(console.error);
  };

  const handleLogout = () => {
    instance.logoutPopup().then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  const fetchNotebookPages = async () => {
    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      const token = tokenResponse.accessToken;

      const res = await fetch("https://kids-tech-backend-production.up.railway.app/api/pages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPages(data || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    if (accounts.length > 0) {
      fetchNotebookPages();
    }
  }, [accounts]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {accounts.length > 0 ? (
        <>
          <h1>Welcome, {accounts[0].username}!</h1>
          <button onClick={handleLogout}>Log out</button>
          <h2>Your OneNote Pages:</h2>
          {pages.length === 0 ? (
            <p>No pages found.</p>
          ) : (
            <ul>
              {pages.map((page) => (
                <li key={page.id}>
                  <a href={page.url} target="_blank" rel="noopener noreferrer">
                    {page.title || "Untitled Page"}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <p>Please sign in to access your OneNote pages.</p>
          <button onClick={handleLogin}>Sign in with Microsoft</button>
        </>
      )}
    </div>
  );
}

export default App;
