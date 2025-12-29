const SchedulesService = require('../services/postgres/SchedulesService');
const SchedulesValidator = require('../utils/validator/schedules');

const schedulesService = new SchedulesService();

const postScheduleHandler = async (req, res, next) => {
  try {
    SchedulesValidator.validateSchedulePayload(req.body);

    const { id: credentialId } = req.user; 
    const { title, date, start_time, end_time } = req.body; 

    const scheduleId = await schedulesService.addSchedule({ 
      user_id: credentialId, 
      title, 
      date, 
      start_time, 
      end_time 
    });

    return res.status(201).json({
      status: 'success',
      message: 'Schedule berhasil ditambahkan',
      data: {
        scheduleId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSchedulesHandler = async (req, res, next) => {
  try {
    const { id: credentialId } = req.user;

    const schedules = await schedulesService.getSchedules(credentialId);

    return res.json({
      status: 'success', 
      data: {
        schedules,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getScheduleByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await schedulesService.verifyScheduleOwner(id, credentialId);

    const schedule = await schedulesService.getScheduleById(id);

    return res.json({
      status: 'success',
      data: {
        schedule,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteScheduleByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await schedulesService.verifyScheduleOwner(id, credentialId);
    
    await schedulesService.deleteScheduleById(id);

    return res.json({
      status: 'success',
      message: 'Schedule berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postScheduleHandler, getSchedulesHandler, getScheduleByIdHandler, deleteScheduleByIdHandler };