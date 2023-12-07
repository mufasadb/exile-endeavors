exports.seed = function(knex) {
  return knex('users').del()
  .then(function () {
    return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  })
    .then(function () {
      return knex('users').insert([
        {username: 'user1', email: 'user1@example.com', discord_id: 'discord1', role: 'player'},
        {username: 'user2', email: 'user2@example.com', discord_id: 'discord2', role: 'admin'}
        // ... add more users as needed
      ]);
    });
};
