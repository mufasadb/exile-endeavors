exports.up = function(knex) {
    return knex.schema.createTable('challenges', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.integer('point_value').notNullable();
      table.string('type').notNullable(); // e.g., Per Challenge, Per Team, Per Player, Repeatable
      table.integer('competition_id').unsigned().references('id').inTable('competitions');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('challenges');
  };
  