const UsersService = require('../services/postgres/UsersService');
const UsersValidator = require('../utils/validator/users');

const usersService = new UsersService();

const postUserHandler = async (req, res, next) => {
  try {
    UsersValidator.validateUserPayload(req.body);

    const userId = await usersService.addUser(req.body);

    res.status(201).json({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { userId },
    });
  } catch (error) {
    next(error); 
  }
};

module.exports = { postUserHandler };