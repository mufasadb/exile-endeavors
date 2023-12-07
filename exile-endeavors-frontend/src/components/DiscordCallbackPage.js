import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const DiscordCallbackPage = () => {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function

  useEffect(() => {
    const exchangeCodeForToken = async (code) => {
      try {
        // Call your back-end endpoint to exchange the code for a token
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/discord/callback?code=${code}`);
        // Store the token in localStorage or handle it as needed
        localStorage.setItem('token', response.data.token);
        // Redirect to a logged-in page
        navigate('/home'); // Use navigate instead of history.push
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        // Handle errors, e.g., by showing a message or redirecting to an error page
        navigate('/error'); // Use navigate instead of history.push
      }
    };

    // Extract the 'code' from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeCodeForToken(code);
    }
  }, [navigate]); // Add navigate to the dependency array

  return (
    <div>
      Exchanging code for token...
    </div>
  );
};

export default DiscordCallbackPage;
