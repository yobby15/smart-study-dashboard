const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')

class ModulesService {
  constructor() {
    this._pool = new Pool();
  }

  async addModule({ class_id, title, status }) {
    const id = `user-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO modules VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, class_id, title, status],
    };

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Module gagal ditambahkan')
    }
    return result.rows[0].id;
  }

  async getModules() {
    const result = await this._pool.query('SELECT id, title, status FROM modules');

    return result.rows;
  }

  async getModuleById(module_id) {
    const query = {
      text: 'SELECT id, title, status FROM modules WHERE id = $1',
      values: [module_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Module tidak ditemukan')
    }

    return result.rows[0];
  }

  async deleteModuleById(id) {
    const query = {
      text: 'DELETE FROM modules WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ditemukan')
    }
  }

  async verifyModuleOwner(module_id, user_id) {
    const query = {
      text: `SELECT modules.id FROM modules JOIN classes ON modules.class_id = classes.id WHERE modules.id = $1 AND classes.user_id = $2`,
      values: [module_id, user_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Module tidak ditemukan');
    }

    const moduleItem = result.rows[0];

    if (moduleItem.class_id != class_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
};

module.exports = ModulesService;