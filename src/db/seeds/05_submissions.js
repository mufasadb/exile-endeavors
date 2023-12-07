exports.seed = function(knex) {
  return knex('submissions').del()
  .then(function () {
    return knex.raw('ALTER SEQUENCE challenges_id_seq RESTART WITH 1');
  })
    .then(function () {
      return knex('submissions').insert([
        {user_id: 1, challenge_id: 1, status: 'pending'},
        {user_id: 2, challenge_id: 2, status: 'accepted'}
      ]);
    });
};
