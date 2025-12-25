exports.up = (pgm) => {
  pgm.createTable('schedules', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    date: { type: 'DATE', notNull: true },
    title: { type: 'TEXT', notNull: true },
    start_time: { type: 'VARCHAR(20)' },
    end_time: { type: 'VARCHAR(20)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('schedules');
};