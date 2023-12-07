exports.seed = function(knex) {
  // No need to delete from 'teams' here if '02_competitions.js' already handles it
  return knex('teams').insert([
    { name: 'Team Alpha', competition_id: 1 }, // Assuming '1' is a valid 'competition_id' from 'competitions' seed
    { name: 'Team Beta', competition_id: 1 }  // Adjust the 'competition_id' as needed
  ]);
};
