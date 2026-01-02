const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError'); 

class TasksService {
  constructor() {
    this._pool = new Pool();
  }

  async addTask({ user_id, title, status, score }) {
    const id = `task-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO tasks VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, user_id, title, status, score],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Task gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getTasks(user_id) {
    const query = {
      text: 'SELECT id, title, status, score FROM tasks WHERE user_id = $1',
      values: [user_id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getTaskById(id) {
    const query = {
      text: 'SELECT id, title, status, score FROM tasks WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Task tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteTaskById(id) {
    const query = {
      text: 'DELETE FROM tasks WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Task tidak ditemukan');
    }
  }

  async verifyTaskOwner(id, user_id) {
    const query = {
      text: 'SELECT user_id FROM tasks WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Task tidak ditemukan');
    }

    const task = result.rows[0];

    if (task.user_id !== user_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = TasksService;