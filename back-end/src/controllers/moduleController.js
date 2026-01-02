const ModulesService = require('../services/postgres/ModulesService');
const ModulesValidator = require('../utils/validator/modules');

const modulesService = new ModulesService();

const postModuleHandler = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(401).json({ error: 'User tidak dikenal' });
    }

    if (Array.isArray(req.body)) {
      ModulesValidator.validateModulesArrayPayload(req.body);

      const insertPromises = req.body.map((item) => {
        return modulesService.addModule({ 
            class_id: item.class_id, 
            title: item.title, 
            status: item.status 
        });
      });

      const moduleIds = await Promise.all(insertPromises);

      return res.status(201).json({
        status: 'success',
        message: `${moduleIds.length} modules berhasil ditambahkan`,
        data: { moduleIds },
      });

    } else {
      ModulesValidator.validateModulePayload(req.body);
      
      const { title, status, class_id } = req.body;
      const module_id = await modulesService.addModule({ class_id, title, status });

      return res.status(201).json({
        status: 'success',
        message: 'module berhasil ditambahkan',
        data: {
          module_id
        },
      });
    }

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