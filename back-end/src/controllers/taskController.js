const TasksService = require('../services/postgres/TasksService');
const TasksValidator = require('../utils/validator/tasks');

const tasksService = new TasksService();

const postTaskHandler = async (req, res, next) => {
  try {
    const { id: credentialId } = req.user; 

    if (Array.isArray(req.body)) {
      TasksValidator.validateTasksArrayPayload(req.body);

      const insertPromises = req.body.map((item) => {
        return tasksService.addTask({ 
          user_id: credentialId, 
          title: item.title, 
          status: item.status, 
          score: item.score 
        });
      });

      const taskIds = await Promise.all(insertPromises);

      return res.status(201).json({
        status: 'success',
        message: `${taskIds.length} Tasks berhasil ditambahkan`,
        data: { taskIds },
      });

    } else {
      TasksValidator.validateTaskPayload(req.body);
      
      const { title, status, score } = req.body; 

      const taskId = await tasksService.addTask({ 
        user_id: credentialId, 
        title, 
        status, 
        score 
      });

      return res.status(201).json({
        status: 'success',
        message: 'Task berhasil ditambahkan',
        data: {
          taskId,
        },
      });
    }

  } catch (error) {
    next(error);
  }
};

const getTasksHandler = async (req, res, next) => {
  try {
    const { id: credentialId } = req.user;

    const tasks = await tasksService.getTasks(credentialId);

    return res.json({
      status: 'success', 
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTaskByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await tasksService.verifyTaskOwner(id, credentialId);

    const task = await tasksService.getTaskById(id);

    return res.json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await tasksService.verifyTaskOwner(id, credentialId);
    
    await tasksService.deleteTaskById(id);

    return res.json({
      status: 'success',
      message: 'Task berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postTaskHandler, getTasksHandler, getTaskByIdHandler, deleteTaskByIdHandler };