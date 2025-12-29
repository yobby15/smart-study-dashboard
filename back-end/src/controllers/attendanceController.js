const AttendancesService = require('../services/postgres/AttendancesService');
const AttendancesValidator = require('../utils/validator/attendances'); // Pastikan file validator ini ada

const attendancesService = new AttendancesService();

const postAttendanceHandler = async (req, res, next) => {
  try {
    AttendancesValidator.validateAttendancePayload(req.body);

    const { id: credentialId } = req.user; 
    
    const { date, emoji, note, timestamp } = req.body; 

    const attendanceId = await attendancesService.addAttendance({ 
      user_id: credentialId, 
      date, 
      emoji, 
      note, 
      timestamp 
    });

    return res.status(201).json({
      status: 'success',
      message: 'Attendance berhasil ditambahkan',
      data: {
        attendanceId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAttendancesHandler = async (req, res, next) => {
  try {
    const { id: credentialId } = req.user;

    const attendances = await attendancesService.getAttendances(credentialId);

    return res.json({
      status: 'success', 
      data: {
        attendances,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await attendancesService.verifyAttendanceOwner(id, credentialId);

    const attendance = await attendancesService.getAttendanceById(id);

    return res.json({
      status: 'success',
      data: {
        attendance,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAttendanceByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await attendancesService.verifyAttendanceOwner(id, credentialId);
    
    await attendancesService.deleteAttendanceById(id);

    return res.json({
      status: 'success',
      message: 'Attendance berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postAttendanceHandler, getAttendancesHandler, getAttendanceByIdHandler, deleteAttendanceByIdHandler };