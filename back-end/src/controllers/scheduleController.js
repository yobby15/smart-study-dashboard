const SchedulesService = require('../services/postgres/SchedulesService');
const SchedulesValidator = require('../utils/validator/schedules');

const schedulesService = new SchedulesService();

const postScheduleHandler = async (req, res, next) => {
  try {
    const { id: credentialId } = req.user; 

    if (Array.isArray(req.body)) {
      SchedulesValidator.validateSchedulesArrayPayload(req.body);

      const insertPromises = req.body.map((item) => {
        return schedulesService.addSchedule({ 
          user_id: credentialId, 
          title: item.title, 
          date: item.date, 
          start_time: item.start_time, 
          end_time: item.end_time 
        });
      });

      const scheduleIds = await Promise.all(insertPromises);

      return res.status(201).json({
        status: 'success',
        message: `${scheduleIds.length} Schedules berhasil ditambahkan`,
        data: { scheduleIds },
      });

    } else {
      SchedulesValidator.validateSchedulePayload(req.body);
      
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
    }

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