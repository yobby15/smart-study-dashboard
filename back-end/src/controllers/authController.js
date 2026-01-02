const AuthenticationsService = require('../services/postgres/AuthenticationsService');
const UsersService = require('../services/postgres/UsersService');
const TokenManager = require('../utils/tokenize/TokenManager');
const AuthenticationsValidator = require('../utils/validator/authentications'); 

const authenticationsService = new AuthenticationsService();
const usersService = new UsersService();

const postAuthenticationHandler = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePostAuthenticationPayload(req.body);

    const { email, password } = req.body;

    const id = await usersService.verifyUserCredential(email, password);

    const accessToken = TokenManager.generateAccessToken({ id });
    const refreshToken = TokenManager.generateRefreshToken({ id });
    await authenticationsService.addRefreshToken(refreshToken);

    return res.status(201).json({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putAuthenticationHandler = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePutAuthenticationPayload(req.body);

    const { refreshToken } = req.body;

    await authenticationsService.verifyRefreshToken(refreshToken);

    const { id } = TokenManager.verifyRefreshToken(refreshToken);

    const accessToken = TokenManager.generateAccessToken({ id });

    return res.json({
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthenticationHandler = async (req, res, next) => {
  try {
    AuthenticationsValidator.validateDeleteAuthenticationPayload(req.body);

    const { refreshToken } = req.body;

    await authenticationsService.verifyRefreshToken(refreshToken);
    
    await authenticationsService.deleteRefreshToken(refreshToken);

    return res.json({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postAuthenticationHandler, putAuthenticationHandler, deleteAuthenticationHandler };