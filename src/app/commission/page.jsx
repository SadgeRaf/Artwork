"use client"

import { useState, useEffect, useRef } from 'react';
import { fadeInUp, scaleIn } from '../../lib/animations';
import { toast } from 'react-toastify';
import { useTheme } from '../../components/ThemeProvider';

export default function CommissionPage() {
  const { theme } = useTheme(); // Get theme from your context
  const isDark = theme === 'dark';
  
  const formRef = useRef(null);
  const titleRef = useRef(null);
  
  useEffect(() => {
    if (titleRef.current) fadeInUp(titleRef.current);
    if (formRef.current) scaleIn(formRef.current, 0.2);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    budget: '',
    deadline: ''
  });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading('Submitting your commission request...');

    try {
      const response = await fetch('/api/commission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.update(loadingToast, {
          render: '✓ Commission submitted successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });

        setFormData({
          name: '',
          email: '',
          projectType: '',
          description: '',
          budget: '',
          deadline: ''
        });
      } else {
        toast.update(loadingToast, {
          render: `Error: ${data.error || 'Something went wrong'}`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.update(loadingToast, {
        render: 'Error submitting commission. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 ref={titleRef} className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Request a Commission
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Tell me about your project and I'll get back to you within 24 hours
          </p>
        </div>

        {/* Form */}
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className={`shadow-xl rounded-2xl p-6 md:p-8 space-y-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 outline-none ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 outline-none ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Project Type
            </label>
            <div className="relative">
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl appearance-none
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="" className={isDark ? 'bg-gray-700' : 'bg-white'}>Select a project type</option>
                <option value="character" className={isDark ? 'bg-gray-700' : 'bg-white'}>Character Design</option>
                <option value="illustration" className={isDark ? 'bg-gray-700' : 'bg-white'}>Illustration</option>
                <option value="logo" className={isDark ? 'bg-gray-700' : 'bg-white'}>Logo Design</option>
                <option value="web" className={isDark ? 'bg-gray-700' : 'bg-white'}>Web Design</option>
                <option value="other" className={isDark ? 'bg-gray-700' : 'bg-white'}>Other</option>
              </select>
              <div className={`absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 outline-none resize-none ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Describe your project in detail... Include references, style preferences, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Budget
              </label>
              <div className="relative">
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>$</span>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter your budget"
                  className={`w-full pl-8 pr-4 py-3 border rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 outline-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 outline-none ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                     text-white font-semibold py-4 px-6 rounded-xl 
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                     shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Commission Request'
            )}
          </button>

          {/* Form Footer Note */}
          <p className={`text-sm text-center mt-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="text-red-500">*</span> Required fields
          </p>
        </form>
      </div>
    </div>
  );
}