const ClassService = require('../services/postgres/ClassService');
const ClassesValidator = require('../utils/validator/classes');

const classesService = new ClassService();

const postClassHandler = async (req, res, next) => {
  try {
    ClassesValidator.validateClassPayload(req.body);

    const user_id = req.user.id
    const { title, percentage } = req.body;
    
    if (!user_id) {
      return res.status(401).json({ error: 'User tidak dikenal' })
    }

    const class_id = await classesService.addClass({ user_id, title, percentage });

    return res.status(201).json({
      status: 'success',
      message: 'Class berhasil ditambahkan',
      data: {
        class_id
      },
    });
  } catch (error) {
    next(error);
  }
};

const getClassHandler = async (req, res, next) => {
  try {
    const classes =  await classesService.getClasses();

    return res.json({
      status: 'succes',
      data: {
        classes,
      }
    })
  } catch (error) {
    next(error);
  }
};

const getClassHandlerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Class = await classesService.getClassById(id);

    return res.json({
      status: 'success',
      data: {
        Class,
      }
    })
  } catch (error) {
    next(error);
  }
};

const deleteClassHandlerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await classesService.verifyClassOwner(id, credentialId);
    
    await classesService.deleteClassById(id);

    return res.json({
      status: 'success',
      message: 'Class berhasil dihapus',
    });
  } catch (error) {
    next(error)
  }
};

module.exports = { postClassHandler, getClassHandler, getClassHandlerById, deleteClassHandlerById }