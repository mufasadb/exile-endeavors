// models/User.js
const knex = require('../db/client');

const findByDiscordId = async (discordId) => {
  return knex('users').where({ discord_id: discordId }).first();
};

const create = async (userData) => {
  return knex('users').insert(userData).returning('*');
};

module.exports = {
  findByDiscordId,
  create,
  // Add more user-related queries here
};
