import React, { useState } from 'react';
import { User, Mail, Phone, Lock, School, GraduationCap, ArrowLeft, CheckCircle, AlertCircle, Shield } from 'lucide-react';

const RegistrationForm = ({ onRegister, onBackToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [successData, setSuccessData] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password.length < 3) {
            setError('Password must be at least 3 characters');
            return;
        }

        // Call parent handler
        const result = onRegister(formData);

        if (result.success) {
            setSuccessData({
                id: result.id,
                ...formData
            });
        } else {
            setError(result.message || 'Registration failed');
        }
    };

    if (successData) {
        return (
            <div className="text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Registration Successful!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Your account has been created successfully.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8 max-w-sm mx-auto text-left">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-4">Credentials Sent To:</p>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 text-slate-400 mr-3" />
                            <span className="text-slate-700 dark:text-slate-300">{successData.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 text-slate-400 mr-3" />
                            <span className="text-slate-700 dark:text-slate-300">{successData.phone}</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30 text-center">
                        <p className="text-sm text-slate-500 mb-1">Your User ID</p>
                        <p className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider select-all">
                            {successData.id}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onBackToLogin}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all"
                >
                    Proceed to Login
                </button>
            </div>
        );
    }

    return (
        <div className="animate-in slide-in-from-right-10 fade-in duration-300">
            <button
                onClick={onBackToLogin}
                className="flex items-center text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
            </button>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
                <p className="text-slate-500 dark:text-slate-400">Join TaskFlow Academy today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="flex items-center p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {/* Role Selection */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'student' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${formData.role === 'student'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500/50'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                    >
                        <GraduationCap className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Student</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'teacher' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${formData.role === 'teacher'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500/50'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                    >
                        <School className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Teacher</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'classTeacher' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${formData.role === 'classTeacher'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500/50'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                    >
                        <User className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Class Teacher</span>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create Password"
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all mt-6"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
