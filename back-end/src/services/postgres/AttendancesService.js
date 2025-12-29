const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class AttendancesService {
  constructor() {
    this._pool = new Pool();
  }

  async addAttendance({ user_id, date, emoji, note, timestamp }) {
    const id = `attendance-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO attendances VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, user_id, date, emoji, note, timestamp],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Attendance gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getAttendances(user_id) {
    const query = {
      text: 'SELECT id, date, emoji, note, timestamp FROM attendances WHERE user_id = $1',
      values: [user_id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getAttendanceById(id) {
    const query = {
      text: 'SELECT id, date, emoji, note, timestamp FROM attendances WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Attendance tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteAttendanceById(id) {
    const query = {
      text: 'DELETE FROM attendances WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Attendance tidak ditemukan');
    }
  }

  async verifyAttendanceOwner(id, user_id) {
    const query = {
      text: 'SELECT user_id FROM attendances WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Attendance tidak ditemukan');
    }

    const attendance = result.rows[0];

    if (attendance.user_id !== user_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = AttendancesService;