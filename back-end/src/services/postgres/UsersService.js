const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ email, password, name, university }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users(email, password, name, university) VALUES($1, $2, $3, $4) RETURNING id',
      values: [email, hashedPassword, name, university],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0].id;
  }
}

module.exports = UsersService;