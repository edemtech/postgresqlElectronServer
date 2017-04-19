
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('permission').notNullable();
    table.string('password_digest').notNullable();

    table.string('camcon');
    table.string('camconPass');
    table.string('imlive');
    table.string('imlivePass');
    table.string('streamate');
    table.string('streamatePass');
    table.string('streamray');
    table.string('streamrayPass');

    table.string('mfc');
    table.string('mfcPass');
    table.string('f4f');
    table.string('f4fPass');
    table.string('jasmin');
    table.string('jasminPass');

    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
