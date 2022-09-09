const bcrypt = require('bcrypt')

exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Root',
      username: 'root',
      password: bcrypt.hashSync('root', Number(process.env.SALT))
    },
    {
      name: 'Admin',
      username: 'admin',
      password: bcrypt.hashSync('admin', Number(process.env.SALT))
    },
    {
      name: 'User 1',
      username: 'user1',
      password: bcrypt.hashSync('user1', Number(process.env.SALT))
    },
    {
      name: 'User 2',
      username: 'user2',
      password: bcrypt.hashSync('user2', Number(process.env.SALT))
    },
    {
      name: 'User 3',
      username: 'user3',
      password: bcrypt.hashSync('user3', Number(process.env.SALT))
    },
    {
      name: 'User 4',
      username: 'user4',
      password: bcrypt.hashSync('user4', Number(process.env.SALT))
    }
  ])
}
