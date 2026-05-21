const Schedule = require('../models/Schedule');
const Room = require('../models/Room');
const Subject = require('../models/Subject');
const User = require('../models/User');

// Algorithmic scheduling system
class ScheduleOptimizer {
  static async generateOptimalSchedule(constraints) {
    const { subjects, teachers, rooms, semester, year } = constraints;
    
    // Define time slots
    const timeSlots = this.generateTimeSlots();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    // Initialize schedule
    const schedule = [];
    const conflicts = [];
    
    // Sort subjects by priority (credits, difficulty, etc.)
    const sortedSubjects = subjects.sort((a, b) => b.credits - a.credits);
    
    for (const subject of sortedSubjects) {
      const assignedSlots = await this.assignSubjectToSlots(
        subject, teachers, rooms, timeSlots, days, schedule, semester, year
      );
      
      if (assignedSlots.length > 0) {
        schedule.push(...assignedSlots);
      } else {
        conflicts.push({
          type: 'no_available_slot',
          subject: subject._id,
          reason: 'No suitable time slot available'
        });
      }
    }
    
    return { schedule, conflicts };
  }
  
  static generateTimeSlots() {
    const slots = [];
    const startTimes = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30'];
    
    for (let i = 0; i < startTimes.length - 1; i++) {
      slots.push({
        start: startTimes[i],
        end: startTimes[i + 1]
      });
    }
    
    return slots;
  }
  
  static async assignSubjectToSlots(subject, teachers, rooms, timeSlots, days, existingSchedule, semester, year) {
    const assignedSlots = [];
    const requiredHours = subject.weeklyHours.lecture + subject.weeklyHours.lab + subject.weeklyHours.tutorial;
    
    // Find available teachers for this subject
    const availableTeachers = teachers.filter(teacher => 
      teacher.subjects && teacher.subjects.includes(subject._id)
    );
    
    if (availableTeachers.length === 0) {
      return [];
    }
    
    // Find suitable rooms based on subject type and capacity
    const suitableRooms = rooms.filter(room => {
      if (subject.weeklyHours.lab > 0 && room.type !== 'lab') return false;
      if (room.capacity < subject.maxStudents) return false;
      return room.status === 'available';
    });
    
    if (suitableRooms.length === 0) {
      return [];
    }
    
    let hoursAssigned = 0;
    
    for (const day of days) {
      for (const timeSlot of timeSlots) {
        if (hoursAssigned >= requiredHours) break;
        
        // Check for conflicts
        const hasConflict = await this.checkTimeConflict(
          day, timeSlot.start, timeSlot.end, existingSchedule
        );
        
        if (!hasConflict) {
          // Find available teacher and room for this slot
          const availableTeacher = await this.findAvailableTeacher(
            availableTeachers, day, timeSlot.start, timeSlot.end, existingSchedule
          );
          
          const availableRoom = await this.findAvailableRoom(
            suitableRooms, day, timeSlot.start, timeSlot.end, existingSchedule
          );
          
          if (availableTeacher && availableRoom) {
            assignedSlots.push({
              subject: subject._id,
              teacher: availableTeacher._id,
              room: availableRoom._id,
              dayOfWeek: day,
              startTime: timeSlot.start,
              endTime: timeSlot.end,
              semester,
              year,
              type: subject.weeklyHours.lab > 0 ? 'lab' : 'lecture'
            });
            
            hoursAssigned++;
          }
        }
      }
      
      if (hoursAssigned >= requiredHours) break;
    }
    
    return assignedSlots;
  }
  
  static async checkTimeConflict(day, startTime, endTime, existingSchedule) {
    return existingSchedule.some(slot => 
      slot.dayOfWeek === day && 
      this.timeOverlaps(startTime, endTime, slot.startTime, slot.endTime)
    );
  }
  
  static async findAvailableTeacher(teachers, day, startTime, endTime, existingSchedule) {
    for (const teacher of teachers) {
      const hasConflict = existingSchedule.some(slot =>
        slot.teacher.toString() === teacher._id.toString() &&
        slot.dayOfWeek === day &&
        this.timeOverlaps(startTime, endTime, slot.startTime, slot.endTime)
      );
      
      if (!hasConflict) return teacher;
    }
    
    return null;
  }
  
  static async findAvailableRoom(rooms, day, startTime, endTime, existingSchedule) {
    for (const room of rooms) {
      const hasConflict = existingSchedule.some(slot =>
        slot.room.toString() === room._id.toString() &&
        slot.dayOfWeek === day &&
        this.timeOverlaps(startTime, endTime, slot.startTime, slot.endTime)
      );
      
      if (!hasConflict && room.isAvailableAt(day.toLowerCase(), startTime, endTime)) {
        return room;
      }
    }
    
    return null;
  }
  
  static timeOverlaps(start1, end1, start2, end2) {
    const toMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const s1 = toMinutes(start1);
    const e1 = toMinutes(end1);
    const s2 = toMinutes(start2);
    const e2 = toMinutes(end2);
    
    return (s1 < e2 && s2 < e1);
  }
}

// Conflict detection system
class ConflictDetector {
  static async detectConflicts(scheduleData) {
    const conflicts = [];
    const schedules = Array.isArray(scheduleData) ? scheduleData : [scheduleData];
    
    for (let i = 0; i < schedules.length; i++) {
      const schedule1 = schedules[i];
      
      // Check teacher conflicts
      const teacherConflicts = await this.findTeacherConflicts(schedule1, schedules, i);
      conflicts.push(...teacherConflicts);
      
      // Check room conflicts
      const roomConflicts = await this.findRoomConflicts(schedule1, schedules, i);
      conflicts.push(...roomConflicts);
      
      // Check class conflicts
      const classConflicts = await this.findClassConflicts(schedule1, schedules, i);
      conflicts.push(...classConflicts);
    }
    
    return conflicts;
  }
  
  static async findTeacherConflicts(schedule, allSchedules, currentIndex) {
    const conflicts = [];
    
    for (let i = 0; i < allSchedules.length; i++) {
      if (i === currentIndex) continue;
      
      const otherSchedule = allSchedules[i];
      
      if (schedule.teacher.toString() === otherSchedule.teacher.toString() &&
          schedule.dayOfWeek === otherSchedule.dayOfWeek &&
          ScheduleOptimizer.timeOverlaps(
            schedule.startTime, schedule.endTime,
            otherSchedule.startTime, otherSchedule.endTime
          )) {
        conflicts.push({
          type: 'teacher_conflict',
          teacher: schedule.teacher,
          schedule1: schedule._id,
          schedule2: otherSchedule._id,
          message: `Teacher conflict: ${schedule.dayOfWeek} ${schedule.startTime}-${schedule.endTime}`
        });
      }
    }
    
    return conflicts;
  }
  
  static async findRoomConflicts(schedule, allSchedules, currentIndex) {
    const conflicts = [];
    
    for (let i = 0; i < allSchedules.length; i++) {
      if (i === currentIndex) continue;
      
      const otherSchedule = allSchedules[i];
      
      if (schedule.room.toString() === otherSchedule.room.toString() &&
          schedule.dayOfWeek === otherSchedule.dayOfWeek &&
          ScheduleOptimizer.timeOverlaps(
            schedule.startTime, schedule.endTime,
            otherSchedule.startTime, otherSchedule.endTime
          )) {
        conflicts.push({
          type: 'room_conflict',
          room: schedule.room,
          schedule1: schedule._id,
          schedule2: otherSchedule._id,
          message: `Room conflict: ${schedule.dayOfWeek} ${schedule.startTime}-${schedule.endTime}`
        });
      }
    }
    
    return conflicts;
  }
  
  static async findClassConflicts(schedule, allSchedules, currentIndex) {
    const conflicts = [];
    
    for (let i = 0; i < allSchedules.length; i++) {
      if (i === currentIndex) continue;
      
      const otherSchedule = allSchedules[i];
      
      if (schedule.class.toString() === otherSchedule.class.toString() &&
          schedule.dayOfWeek === otherSchedule.dayOfWeek &&
          ScheduleOptimizer.timeOverlaps(
            schedule.startTime, schedule.endTime,
            otherSchedule.startTime, otherSchedule.endTime
          )) {
        conflicts.push({
          type: 'class_conflict',
          class: schedule.class,
          schedule1: schedule._id,
          schedule2: otherSchedule._id,
          message: `Class conflict: ${schedule.dayOfWeek} ${schedule.startTime}-${schedule.endTime}`
        });
      }
    }
    
    return conflicts;
  }
}

// Controller methods
exports.createSchedule = async (req, res) => {
  try {
    const scheduleData = req.body;
    
    // Check for conflicts before creating
    const conflicts = await ConflictDetector.detectConflicts(scheduleData);
    
    if (conflicts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Schedule conflicts detected',
        conflicts
      });
    }
    
    const schedule = new Schedule(scheduleData);
    await schedule.save();
    
    res.status(201).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.generateAutoSchedule = async (req, res) => {
  try {
    const { semester, year, subjects, teachers, rooms, constraints } = req.body;
    
    // Get all required data
    const subjectsData = await Subject.find({ _id: { $in: subjects } });
    const teachersData = await User.find({ _id: { $in: teachers }, role: 'teacher' });
    const roomsData = await Room.find({ _id: { $in: rooms }, status: 'available' });
    
    // Generate optimal schedule
    const { schedule: generatedSchedule, conflicts } = await ScheduleOptimizer.generateOptimalSchedule({
      subjects: subjectsData,
      teachers: teachersData,
      rooms: roomsData,
      semester,
      year,
      constraints
    });
    
    // Save generated schedules
    const savedSchedules = await Schedule.insertMany(generatedSchedule);
    
    res.status(201).json({
      success: true,
      data: {
        schedules: savedSchedules,
        conflicts,
        totalGenerated: savedSchedules.length,
        totalConflicts: conflicts.length
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.detectConflicts = async (req, res) => {
  try {
    const { scheduleIds } = req.body;
    
    const schedules = await Schedule.find({ _id: { $in: scheduleIds } })
      .populate('teacher')
      .populate('room')
      .populate('class')
      .populate('subject');
    
    const conflicts = await ConflictDetector.detectConflicts(schedules);
    
    res.status(200).json({
      success: true,
      data: conflicts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const { semester, year, teacher, room, class: classId, dayOfWeek } = req.query;
    
    const filter = {};
    if (semester) filter.semester = semester;
    if (year) filter.year = parseInt(year);
    if (teacher) filter.teacher = teacher;
    if (room) filter.room = room;
    if (classId) filter.class = classId;
    if (dayOfWeek) filter.dayOfWeek = dayOfWeek;
    
    const schedules = await Schedule.find(filter)
      .populate('teacher', 'name email')
      .populate('room', 'name number building capacity')
      .populate('class', 'name code section')
      .populate('subject', 'name code credits')
      .sort({ dayOfWeek: 1, startTime: 1 });
    
    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('teacher')
      .populate('room')
      .populate('class')
      .populate('subject');
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('teacher room class subject');
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }
    
    // Check for conflicts after update
    const conflicts = await ConflictDetector.detectConflicts(schedule);
    
    res.status(200).json({
      success: true,
      data: {
        schedule,
        conflicts
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getTimetableGrid = async (req, res) => {
  try {
    const { semester, year, class: classId } = req.query;
    
    const schedules = await Schedule.find({ 
      semester, 
      year: parseInt(year), 
      class: classId,
      status: 'active'
    })
      .populate('teacher', 'name')
      .populate('room', 'name number')
      .populate('subject', 'name code')
      .sort({ dayOfWeek: 1, startTime: 1 });
    
    // Transform into grid format
    const timeSlots = ScheduleOptimizer.generateTimeSlots();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    const grid = days.map(day => {
      const daySchedule = {
        day,
        slots: []
      };
      
      timeSlots.forEach(slot => {
        const schedule = schedules.find(s => 
          s.dayOfWeek === day && 
          s.startTime === slot.start && 
          s.endTime === slot.end
        );
        
        daySchedule.slots.push({
          time: `${slot.start}-${slot.end}`,
          schedule: schedule || null
        });
      });
      
      return daySchedule;
    });
    
    res.status(200).json({
      success: true,
      data: {
        grid,
        summary: {
          totalSchedules: schedules.length,
          timeSlots: timeSlots.length,
          days: days.length
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
