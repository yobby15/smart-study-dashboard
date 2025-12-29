const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')

class ClassService {
  constructor() {
    this._pool = new Pool();
  }

  async addClass({ user_id, title, percentage }) {
    const id = `user-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO classes VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, user_id, title, percentage],
    };

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Class gagal ditambahkan')
    }
    return result.rows[0].id;
  }

  async getClasses() {
    const result = await this._pool.query('SELECT id, title, percentage FROM classes');

    return result.rows;
  }

  async getClassById(class_id) {
    const query = {
      text: 'SELECT id, title, percentage FROM classes WHERE id = $1',
      values: [class_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Class tidak ditemukan')
    }

    return result.rows[0];
  }

  async deleteClassById(id) {
    const query = {
      text: 'DELETE FROM classes WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan')
    }
  }

  async verifyClassOwner(id, user_id) {
    const query = {
      text: 'SELECT user_id FROM classes WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Class tidak ditemukan');
    }

    const classItem = result.rows[0];

    if (classItem.user_id != user_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
};

module.exports = ClassService;