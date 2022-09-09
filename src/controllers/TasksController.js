const knex = require('../database')

module.exports = {
  // Index
  async index(req, res) {
    const tasks = await knex
      .select(
        'tasks.id',
        'user_id',
        'users.name',
        'description',
        'due_date',
        'draft',
        'tasks.created_at'
      )
      .from('tasks')
      .innerJoin('users', 'tasks.user_id', 'users.id')
      .where('users.id', req.user.id)
    return res.json(tasks)
  },
  // Show
  async show(req, res) {
    const { id } = req.params
    const task = await knex
      .select(
        'tasks.id',
        'user_id',
        'users.name',
        'description',
        'due_date',
        'draft',
        'tasks.created_at'
      )
      .from('tasks')
      .innerJoin('users', 'tasks.user_id', 'users.id')
      .where('tasks.id', id)
      .andWhere('users.id', req.user.id)
      .first()
    return res.json(task)
  },
  // Create
  async create(req, res) {
    const { description, due_date, draft = false } = req.body

    try {
      await knex('tasks').insert({
        user_id: req.user.id,
        description,
        due_date,
        draft
      })
      return res.json({
        success: true,
        message: 'task.create.ok'
      })
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: 'task.create.nok'
      })
    }
  },
  // Update
  async update(req, res) {
    const { id } = req.params
    const { description, due_date, draft } = req.body

    try {
      await knex('tasks')
        .update({
          description,
          due_date,
          draft
        })
        .where({ id, user_id: req.user.id })
      return res.status(200).send({
        success: true,
        msg: 'task.update.ok'
      })
    } catch (err) {
      console.log(err)
      return res.status(404).send({
        success: false,
        msg: 'task.update.nok'
      })
    }
  },
  // DELETE
  async delete(req, res) {
    const { id } = req.params
    try {
      await knex('tasks').where({ id, user_id: req.user.id }).del()
      return res.status(200).send({
        success: true,
        msg: 'task.delete.ok'
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        msg: 'task.delete.nok'
      })
    }
  }
}
