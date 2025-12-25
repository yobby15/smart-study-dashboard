const ModulesService = require('../services/postgres/ModulesService');
const ModulesValidator = require('../utils/validator/modules');

const modulesService = new ModulesService();

const postModuleHandler = async (req, res, next) => {
  try {
    ModulesValidator.validateModulePayload(req.body);

    const user_id = req.user.id
    const { title, status, class_id } = req.body;
    
    if (!user_id) {
      return res.status(401).json({ error: 'User tidak dikenal' })
    }

    const module_id = await modulesService.addModule({ class_id, title, status });

    return res.status(201).json({
      status: 'success',
      message: 'module berhasil ditambahkan',
      data: {
        module_id
      },
    });
  } catch (error) {
    next(error);
  }
};

const getModuleHandler = async (req, res, next) => {
  try {
    const modules =  await modulesService.getModules();

    return res.json({
      status: 'success',
      data: {
        modules,
      }
    })
  } catch (error) {
    next(error);
  }
};

const getModuleHandlerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const module = await modulesService.getModuleById(id);

    return res.json({
      status: 'success',
      data: {
        module,
      }
    })
  } catch (error) {
    next(error);
  }
};

const deleteModuleHandlerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await modulesService.verifyModuleOwner(id, credentialId);
    
    await modulesService.deleteModuleById(id);

    return res.json({
      status: 'success',
      message: 'Class berhasil dihapus',
    });
  } catch (error) {
    next(error)
  }
};

module.exports = { postModuleHandler, getModuleHandler, getModuleHandlerById, deleteModuleHandlerById }