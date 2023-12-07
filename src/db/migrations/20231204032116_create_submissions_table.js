exports.up = function(knex) {
    return knex.schema.createTable('submissions', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('challenge_id').unsigned().references('id').inTable('challenges');
      table.timestamp('submission_date').defaultTo(knex.fn.now());
      table.string('status'); // e.g., pending, accepted, rejected
      // Include additional columns for submission data if required
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('submissions');
  };
  