exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)', 
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(255)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    id_program: { type: 'VARCHAR(50)' },
    program: { type: 'VARCHAR(100)' },
    university: { type: 'VARCHAR(100)' },
    semester: { type: 'INTEGER' },
    mentor: { type: 'VARCHAR(100)' },
    lecturer: { type: 'VARCHAR(100)' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};