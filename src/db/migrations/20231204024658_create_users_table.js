exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary(); // Unique identifier for the user
    table.string('username').notNullable(); // Username
    table
      .string('email')
      .unique()
      .notNullable(); // Email address
    table.string('discord_id').unique(); // Discord ID
    table
      .string('role')
      .notNullable()
      .defaultTo('player'); // Role in the application
    table.timestamps(true, true); // `created_at` and `updated_at` timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
