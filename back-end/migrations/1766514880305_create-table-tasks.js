exports.up = (pgm) => {
  pgm.createTable('tasks', {
    id: { type: 'SERIAL', primaryKey: true },
    user_id: {
      type: 'INTEGER',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    title: { type: 'TEXT', notNull: true },
    status: { type: 'VARCHAR(50)', notNull: true },
    score: { type: 'INTEGER' }, // Bisa NULL jika belum dinilai
  });
};

exports.down = (pgm) => {
  pgm.dropTable('tasks');
};