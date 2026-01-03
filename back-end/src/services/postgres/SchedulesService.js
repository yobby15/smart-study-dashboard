const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class SchedulesService {
  constructor() {
    this._pool = new Pool();
  }

  async addSchedule({ user_id, title, date, start_time, end_time }) {
    const id = `schedule-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO schedules VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, user_id, date, title, start_time, end_time],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Schedule gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getSchedules(user_id) {
    const query = {
      text: 'SELECT id, title, date, start_time, end_time FROM schedules WHERE user_id = $1',
      values: [user_id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getScheduleById(id) {
    const query = {
      text: 'SELECT id, title, date, start_time, end_time FROM schedules WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    return result.rows[0];
  }

  async editScheduleById(id, { title, date, start_time, end_time }) {
    const query = {
      text: 'UPDATE schedules SET title = $1, date = $2, start_time = $3, end_time = $4 WHERE id = $5 RETURNING id',
      values: [title, date, start_time, end_time, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui schedule. Id tidak ditemukan');
    }
  }

  async deleteScheduleById(id) {
    const query = {
      text: 'DELETE FROM schedules WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }
  }

  async verifyScheduleOwner(id, user_id) {
    const query = {
      text: 'SELECT user_id FROM schedules WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    const schedule = result.rows[0];

    if (schedule.user_id !== user_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = SchedulesService;