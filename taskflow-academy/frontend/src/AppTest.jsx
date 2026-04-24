import React from 'react';

function AppTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">TaskFlow Academy</h1>
        <p className="text-slate-600 mb-6">Application is working!</p>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <p className="font-semibold">✅ Frontend is running successfully</p>
          <p className="text-sm mt-1">All components are loading properly</p>
        </div>
      </div>
    </div>
  );
}

export default AppTest;
