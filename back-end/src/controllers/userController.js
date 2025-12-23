const UsersService = require('../services/postgres/UsersService');
const UsersValidator = require('../utils/validator/users');

const usersService = new UsersService();

const postUserHandler = async (req, res, next) => {
  try {
    UsersValidator.validateUserPayload(req.body);

    const { email, password, name } = req.body;
    const userId = await usersService.addUser({ email, password, name });

    return res.status(201).json({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { 
        userId
      },
    });
  } catch (error) {
    next(error); 
  }
};

const getUserHandler = async (req, res, next) => {
  try {
    const users =  await usersService.getUsers();

    return res.json({
      status: 'succes',
      data: {
        users,
      }
    })
  } catch (error) {
    next(error);
  }
};

const getUserHandlerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersService.getUserById(id);

    return res.status.json({
      status: 'success',
      data: {
        user,
      }
    })
  } catch (error) {
    next(error);
  }
};

const deleteUserHandlerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user  = await usersService.deleteUserById(id);

    return res.json({
      status: 'success',
      message: 'User berhasil dihapus',
    });
  } catch (error) {
    next(error)
  }
};

module.exports = { postUserHandler, getUserHandler, getUserHandlerById, deleteUserHandlerById };