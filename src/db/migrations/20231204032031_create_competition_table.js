exports.up = function(knex) {
    return knex.schema.createTable('competitions', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.date('start_date');
      table.date('end_date');
      table.string('status'); // e.g., active, completed
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('competitions');
  };
  