import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

const FocusZone = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            // Switch mode automatically or alert
            if (mode === 'focus') {
              setMode('break');
              setMinutes(5);
            } else {
              setMode('focus');
              setMinutes(25);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
          <Coffee className="w-5 h-5 mr-2 text-indigo-500" />
          Focus Zone
        </h2>
        <span className={`text-xs px-2 py-1 rounded-full ${mode === 'focus' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'}`}>
          {mode === 'focus' ? 'Deep Work' : 'Break Time'}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="text-6xl font-mono font-bold text-slate-900 dark:text-white mb-8 tracking-wider">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTimer}
            className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-lg shadow-indigo-500/30"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <button 
            onClick={resetTimer}
            className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusZone;
