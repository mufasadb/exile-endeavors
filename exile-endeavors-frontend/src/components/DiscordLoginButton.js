import React from 'react';

const DiscordLoginButton = () => {
  const handleLogin = () => {
    // Construct the Discord OAuth URL with your client ID and redirect URI
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20email`;
    // Redirect to Discord for authentication
    window.location.href = discordAuthUrl;
  };

  return (
    <button onClick={handleLogin}>
      Login with Discord
    </button>
  );
};

export default DiscordLoginButton;
