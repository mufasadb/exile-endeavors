const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token';
const DISCORD_API_URL = 'https://discord.com/api/users/@me';
const User = require('../models/User');
require('dotenv').config();

// Helper function to validate user data
const validateUserData = (username, email, password) => {
  // Add your validation logic here (e.g., regex for email, password length check)
  // Return true if valid, false otherwise
};

// Registration endpoint
const register = async (req, res) => {
  const { username, email, password, discord_id } = req.body;

  if (!validateUserData(username, email, password)) {
    return res.status(400).json({ error: 'Invalid user data' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const [userId] = await knex('users').insert({
      username,
      email,
      password: hashedPassword,
      discord_id
    });

    res.status(201).json({ message: 'User created', userId });
  } catch (error) {
    if (error.code === '23505') {
      // Unique constraint violation
      res.status(409).json({ error: 'User already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Login endpoint
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex('users')
      .where({ email })
      .first();

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const redirectToDiscord = (req, res) => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.DISCORD_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.DISCORD_REDIRECT_URI
  )}&response_type=code&scope=identify`;
  res.redirect(discordAuthUrl);
};

const discordCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.error('Discord Callback Error: No code provided');
    return res.status(400).send('No code provided');
  }

  try {
    console.log('Exchanging code for access token...');
    const tokenResponse = await axios.post(
      DISCORD_TOKEN_URL,
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
        scope: 'identify email'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log('Access token received, fetching user details from Discord...');

    const userResponse = await axios.get(DISCORD_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log('User details received, finding or creating user in the database...');
    const { id: discordId, username, email } = userResponse.data;

    try {
      let user = await User.findByDiscordId(discordId);

      if (!user) {
        console.log(`Creating new user: ${username}`);
        const userData = {
          discord_id: discordId,
          username,
          email
        };
        user = await User.create(userData);
        console.log('New user created:', user);
      } else {
        console.log(`User found: ${user.username}`);
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      console.log('JWT token generated, sending response to client...');
      res.json({ token });
    } catch (innerError) {
      console.error('Error during user database operation:', innerError);
      res.status(500).json({ error: 'Error during user database operation' });
    }
  } catch (outerError) {
    console.error('Error during Discord authentication:', outerError);
    res.status(500).json({ error: 'Error during Discord authentication' });
  }
};

module.exports = {
  register,
  login,
  redirectToDiscord,
  discordCallback
};
