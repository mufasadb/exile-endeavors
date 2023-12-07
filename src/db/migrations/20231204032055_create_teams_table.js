exports.up = function(knex) {
    return knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('competition_id').unsigned().references('id').inTable('competitions');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('teams');
  };
  