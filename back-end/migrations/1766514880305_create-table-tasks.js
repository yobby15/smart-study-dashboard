exports.up = (pgm) => {
  pgm.createTable('tasks', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    title: { type: 'TEXT', notNull: true },
    status: { type: 'VARCHAR(50)', notNull: true },
    score: { type: 'INTEGER' }, 
  });
};

exports.down = (pgm) => {
  pgm.dropTable('tasks');
};