exports.up = (pgm) => {
  pgm.createTable('classes', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    title: { type: 'VARCHAR(100)', notNull: true },
    percentage: { type: 'INTEGER', default: 0 },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('classes');
};