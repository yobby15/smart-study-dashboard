const ClassService = require('../services/postgres/ClassService');
const ClassesValidator = require('../utils/validator/classes');

const classesService = new ClassService();

const postClassHandler = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    if (Array.isArray(req.body)) {
      ClassesValidator.validateClassesArrayPayload(req.body);

      const insertPromises = req.body.map((item) => {
        return classesService.addClass({ 
            user_id, 
            title: item.title, 
            percentage: item.percentage 
        });
      });

      const classIds = await Promise.all(insertPromises);

      return res.status(201).json({
        status: 'success',
        message: `${classIds.length} Classes berhasil ditambahkan`,
        data: { classIds },
      });

    } else {
      ClassesValidator.validateClassPayload(req.body);
      const { title, percentage } = req.body;
      const class_id = await classesService.addClass({ user_id, title, percentage });

      return res.status(201).json({
        status: 'success',
        message: 'Class berhasil ditambahkan',
        data: { class_id },
      });
    }

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