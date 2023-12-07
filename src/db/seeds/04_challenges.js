exports.seed = function(knex) {
  return knex('challenges').del()
    .then(function () {
      return knex('challenges').insert([
        {name: 'Challenge 1', description: 'First challenge description', point_value: 10, type: 'Per Player', competition_id: 1},
        {name: 'Challenge 2', description: 'Second challenge description', point_value: 20, type: 'Per Team', competition_id: 1}
      ]);
    });
};
