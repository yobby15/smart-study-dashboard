exports.up = (pgm) => {
  pgm.createTable('modules', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    class_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"classes"',
      onDelete: 'CASCADE', 
    },
    title: { type: 'VARCHAR(255)', notNull: true },
    status: { type: 'VARCHAR(50)', default: 'uncompleted' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('modules');
};