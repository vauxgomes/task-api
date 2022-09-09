exports.up = function (knex) {
  console.log('Migration: TASKS')

  return knex.schema.createTable('tasks', function (table) {
    table.increments('id').primary()

    table.integer('user_id').unique().notNullable()
    table.string('description').unique().notNullable()
    table.timestamp('due_date', 255)
    table.boolean('draft').notNullable().defaultTo(false)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.foreign('user_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
}
