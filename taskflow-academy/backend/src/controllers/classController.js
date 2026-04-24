const Class = require('../models/Class');
const User = require('../models/User');

// @desc    Get all available classes
// @route   GET /api/classes
// @access  Public
const getClasses = async (req, res) => {
  try {
    const { search, grade } = req.query;
    
    let query = { status: 'active' };
    
    if (grade) {
      query.grade = grade;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { subjects: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const classes = await Class.find(query)
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Join a class
// @route   POST /api/classes/join
// @access  Private
const joinClass = async (req, res) => {
  try {
    const { classCode } = req.body;
    const userId = req.user.id;

    // Find class by code
    const classToJoin = await Class.findOne({ code: classCode.toUpperCase() });
    
    if (!classToJoin) {
      return res.status(404).json({
        message: 'Invalid class code'
      });
    }

    // Check if class is full
    if (classToJoin.isFull) {
      return res.status(400).json({
        message: 'This class is already full'
      });
    }

    // Check if user is already enrolled
    if (classToJoin.enrolledStudents.includes(userId)) {
      return res.status(400).json({
        message: 'You are already enrolled in this class'
      });
    }

    // Add user to class
    classToJoin.enrolledStudents.push(userId);
    classToJoin.currentStudents += 1;
    await classToJoin.save();

    // Add class to user's enrolled classes
    const user = await User.findById(userId);
    user.enrolledClasses.push(classToJoin._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Successfully joined the class',
      data: classToJoin
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's enrolled classes
// @route   GET /api/classes/enrolled
// @access  Private
const getEnrolledClasses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: 'enrolledClasses',
      populate: {
        path: 'teacher',
        select: 'name email'
      }
    });

    res.status(200).json({
      success: true,
      count: user.enrolledClasses.length,
      data: user.enrolledClasses
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create a new class (teacher only)
// @route   POST /api/classes
// @access  Private (Teacher/ClassTeacher/Admin)
const createClass = async (req, res) => {
  try {
    const { name, code, grade, section, description, roomNumber, schedule, maxStudents, subjects } = req.body;

    // Check if class code already exists
    const existingClass = await Class.findOne({ code: code.toUpperCase() });
    if (existingClass) {
      return res.status(400).json({
        message: 'Class code already exists'
      });
    }

    const classData = {
      name,
      code: code.toUpperCase(),
      grade,
      section,
      description,
      roomNumber,
      schedule,
      maxStudents,
      subjects,
      teacher: req.user.id
    };

    const newClass = await Class.create(classData);

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: newClass
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getClasses,
  joinClass,
  getEnrolledClasses,
  createClass
};
