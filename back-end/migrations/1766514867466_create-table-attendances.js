exports.up = (pgm) => {
  pgm.createTable('attendances', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',  
    },
    date: { type: 'DATE', notNull: true },
    emoji: { type: 'VARCHAR(10)' },
    note: { type: 'TEXT' },
    timestamp: { type: 'VARCHAR(10)' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('attendances');
};