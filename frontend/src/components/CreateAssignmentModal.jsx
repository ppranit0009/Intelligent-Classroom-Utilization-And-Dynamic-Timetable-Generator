import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Upload, FileText, Image as ImageIcon, File, Trash2,
  Plus, Minus, CheckCircle, Brain, Puzzle, BookOpen,
  FolderOpen, ChevronRight, AlertCircle
} from 'lucide-react';

const CreateAssignmentModal = ({ isOpen, onClose, onCreateAssignment }) => {
  const [step, setStep] = useState(1); // 1: Type Selection, 2: Details & Upload
  const [assignmentType, setAssignmentType] = useState('standard');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('100');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  // Quiz-specific state
  const [quizQuestions, setQuizQuestions] = useState([
    { id: 1, question: '', type: 'multiple-choice', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  // Puzzle-specific state
  const [puzzleConfig, setPuzzleConfig] = useState({
    difficulty: 'medium',
    timeLimit: 30,
    hints: 3
  });

  const assignmentTypes = [
    {
      id: 'standard',
      name: 'Standard Assignment',
      description: 'Traditional assignment with file attachments',
      icon: FileText,
      color: 'indigo'
    },
    {
      id: 'quiz',
      name: 'Quiz',
      description: 'Multiple choice and short answer questions',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      id: 'puzzle',
      name: 'Puzzle',
      description: 'Interactive puzzle-based learning',
      icon: Puzzle,
      color: 'purple'
    },
    {
      id: 'essay',
      name: 'Essay',
      description: 'Long-form written assignment',
      icon: BookOpen,
      color: 'blue'
    },
    {
      id: 'project',
      name: 'Project',
      description: 'Multi-part project submission',
      icon: FolderOpen,
      color: 'amber'
    }
  ];

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return (isImage || isPDF) && isValidSize;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const addQuizQuestion = () => {
    setQuizQuestions(prev => [...prev, {
      id: Date.now(),
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  const removeQuizQuestion = (questionId) => {
    if (quizQuestions.length > 1) {
      setQuizQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };

  const updateQuizQuestion = (questionId, field, value) => {
    setQuizQuestions(prev => prev.map(q =>
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const updateQuizOption = (questionId, optionIndex, value) => {
    setQuizQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (!points || points <= 0) newErrors.points = 'Points must be greater than 0';

    if (assignmentType === 'quiz') {
      quizQuestions.forEach((q, index) => {
        if (!q.question.trim()) {
          newErrors[`question_${index}`] = 'Question is required';
        }
        if (q.type === 'multiple-choice') {
          const hasEmptyOption = q.options.some(opt => !opt.trim());
          if (hasEmptyOption) {
            newErrors[`options_${index}`] = 'All options must be filled';
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newAssignment = {
      id: Date.now(),
      title,
      description,
      type: assignmentType,
      dueDate,
      points: parseInt(points),
      files: uploadedFiles,
      ...(assignmentType === 'quiz' && { questions: quizQuestions }),
      ...(assignmentType === 'puzzle' && { puzzleConfig }),
      createdAt: new Date().toISOString()
    };

    onCreateAssignment(newAssignment);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setAssignmentType('standard');
    setTitle('');
    setDescription('');
    setDueDate('');
    setPoints('100');
    setUploadedFiles([]);
    setQuizQuestions([{ id: 1, question: '', type: 'multiple-choice', options: ['', '', '', ''], correctAnswer: 0 }]);
    setPuzzleConfig({ difficulty: 'medium', timeLimit: 30, hints: 3 });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Assignment</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Step {step} of 2: {step === 1 ? 'Choose Type' : 'Add Details'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
            initial={{ width: '0%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Select Assignment Type
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assignmentTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = assignmentType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setAssignmentType(type.id)}
                        className={`
                          relative p-6 rounded-xl border-2 transition-all text-left
                          ${isSelected
                            ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20 shadow-lg shadow-${type.color}-500/20`
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                          }
                        `}
                      >
                        {isSelected && (
                          <div className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-${type.color}-500 flex items-center justify-center`}>
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <Icon className={`w-8 h-8 mb-3 ${isSelected ? `text-${type.color}-600 dark:text-${type.color}-400` : 'text-slate-400'}`} />
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1">{type.name}</h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{type.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Basic Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border ${errors.title ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                      placeholder="e.g., Advanced React Patterns"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border ${errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition-all`}
                      placeholder="Provide detailed instructions for this assignment..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.dueDate ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                      />
                      {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.dueDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Points *
                      </label>
                      <input
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.points ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                        placeholder="100"
                      />
                      {errors.points && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.points}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Upload Files (Images/PDFs)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      border-2 border-dashed rounded-xl p-8 text-center transition-all
                      ${isDragging
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600'
                      }
                    `}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-3 ${isDragging ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-sm text-slate-400">
                      Supports: JPG, PNG, GIF, PDF (Max 10MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="mt-4 inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      Browse Files
                    </label>
                  </div>

                  {/* Uploaded Files Preview */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="relative group bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700"
                        >
                          <button
                            onClick={() => removeFile(file.id)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {file.type.startsWith('image/') ? (
                            <img
                              src={file.data}
                              alt={file.name}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                          ) : (
                            <div className="w-full h-24 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded mb-2">
                              <File className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                          )}
                          <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quiz Builder */}
                {assignmentType === 'quiz' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold text-slate-900 dark:text-white">Quiz Questions</h5>
                      <button
                        onClick={addQuizQuestion}
                        className="flex items-center px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Question
                      </button>
                    </div>

                    {quizQuestions.map((question, qIndex) => (
                      <div
                        key={question.id}
                        className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Question {qIndex + 1}
                          </label>
                          {quizQuestions.length > 1 && (
                            <button
                              onClick={() => removeQuizQuestion(question.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(question.id, 'question', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${errors[`question_${qIndex}`] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                          placeholder="Enter your question..."
                        />
                        {errors[`question_${qIndex}`] && (
                          <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`question_${qIndex}`]}
                          </p>
                        )}

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Options</label>
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={question.correctAnswer === oIndex}
                                onChange={() => updateQuizQuestion(question.id, 'correctAnswer', oIndex)}
                                className="text-emerald-600 focus:ring-emerald-500"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateQuizOption(question.id, oIndex, e.target.value)}
                                className="flex-1 px-3 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder={`Option ${oIndex + 1}`}
                              />
                            </div>
                          ))}
                          {errors[`options_${qIndex}`] && (
                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors[`options_${qIndex}`]}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Puzzle Configuration */}
                {assignmentType === 'puzzle' && (
                  <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h5 className="font-semibold text-slate-900 dark:text-white flex items-center">
                      <Puzzle className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      Puzzle Configuration
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={puzzleConfig.difficulty}
                          onChange={(e) => setPuzzleConfig({ ...puzzleConfig, difficulty: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Time Limit (min)
                        </label>
                        <input
                          type="number"
                          value={puzzleConfig.timeLimit}
                          onChange={(e) => setPuzzleConfig({ ...puzzleConfig, timeLimit: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Hints Available
                        </label>
                        <input
                          type="number"
                          value={puzzleConfig.hints}
                          onChange={(e) => setPuzzleConfig({ ...puzzleConfig, hints: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-between">
          <button
            onClick={step === 1 ? handleClose : () => setStep(1)}
            className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={step === 1 ? () => setStep(2) : handleSubmit}
            className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/30 flex items-center"
          >
            {step === 1 ? (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              'Create Assignment'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateAssignmentModal;
