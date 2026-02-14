"use client"

import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate sending email with a delay
    const loadingToast = toast.loading('Sending your message...')

    try {
      // Fake API call - simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Log to console for demonstration
      console.log('📧 Fake email sent:', {
        to: 'contact@artstudio.com',
        from: formData.email,
        ...formData,
        timestamp: new Date().toISOString()
      })

      // Success message
      toast.update(loadingToast, {
        render: '✓ Message sent successfully! (Demo)',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

    } catch (error) {
      toast.update(loadingToast, {
        render: '❌ Failed to send message',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Send me a message and I'll get back to you within 24 hours.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ⚡ This is a demo form - no actual emails are sent
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white font-medium">art@studio.demo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Studio</p>
                    <p className="text-gray-900 dark:text-white font-medium">123 Art Street, Design City</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                    <p className="text-gray-900 dark:text-white font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Follow me</h4>
                <div className="flex gap-3">
                  {['Twitter', 'Instagram', 'GitHub'].map((social) => (
                    <button
                      key={social}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => toast.info(`📱 ${social} profile (Demo)`, { autoClose: 2000 })}
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5 bg-current opacity-75 rounded"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 outline-none"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project inquiry, collaboration, etc."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, ideas, or just say hi!"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 outline-none resize-none"
                  />
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
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Demo Notice */}
                <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                  🎨 This is a demo contact form. Messages are not actually sent.
                  Check the browser console to see the simulated email data.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section (Optional) */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Prefer email? <button 
              onClick={() => {
                navigator.clipboard.writeText('art@studio.demo')
                toast.info('📋 Email copied to clipboard!', { autoClose: 2000 })
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              art@studio.demo
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}