const knex = require('../database')
const bcrypt = require('bcrypt')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const users = await knex.select('id', 'username', 'name').from('users')
    return res.json(users)
  },

  // Show
  async show(req, res) {
    const { id } = req.params
    
    const user = await knex
      .select('id', 'username', 'name')
      .from('users')
      .where('id', id)
      .first()

    return res.json(user)
  },

  // Create
  async create(req, res) {
    try {
      let { name, username, password } = req.body
      password = bcrypt.hashSync(password, Number(process.env.SALT))

      const [id] = await knex('users')
        .insert({
          name,
          username,
          password
        })
        .returning('id')

      return res.json({ id })
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'user.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { id } = req.params
    let { name, username, password } = req.body

    try {
      await knex('users')
        .update({
          name,
          username,
          password
        })
        .where('id', id)

      return res.status(200).send({
        success: true,
        msg: 'user.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        msg: 'Atualizado'
      })
    }
  },

  // DELETE
  async delete(req, res) {
    const { id } = req.params

    try {
      await knex('users').where('id', id).del()

      return res.status(200).send({
        success: true,
        msg: 'user.delete.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'user.delete.nok'
      })
    }
  }
}
