exports.seed = function (knex) {
  return knex('challenges')
    .del() // Ensure no challenges reference the competitions to be deleted
    .then(function () {
      return knex.raw('ALTER SEQUENCE challenges_id_seq RESTART WITH 1');
    })
    .then(() => knex('teams').del()) // Ensure no teams reference the competitions to be deleted
    .then(function () {
      return knex.raw('ALTER SEQUENCE teams_id_seq RESTART WITH 1');
    })
    .then(() => knex('competitions').del())
    .then(function () {
      return knex.raw('ALTER SEQUENCE competitions_id_seq RESTART WITH 1');
    })
    .then(() => {
      return knex('competitions').insert([
        {
          name: 'Spring Fling',
          start_date: '2023-04-01',
          end_date: '2023-06-30',
          status: 'active'
        },
        {
          name: 'Summer Showdown',
          start_date: '2023-07-01',
          end_date: '2023-09-30',
          status: 'planned'
        }
      ]);
    });
};
