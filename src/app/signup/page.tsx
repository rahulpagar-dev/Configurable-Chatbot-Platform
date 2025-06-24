'use client' // Use client directive for useState and event handlers

import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react' // Import icons for password visibility

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Dummy handleSubmit for demonstration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sign Up form submitted (dummy)!');
    // In a real application, you'd handle form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        {/* Top Branding Area (similar to Intuit logo section) */}
        <div className="text-center mb-8">
          {/* Replace with your Wizly logo or more styled text */}
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Wizly</h1>
          {/* If you had sub-brand icons like Intuit, they would go here.
              For Wizly, we might just omit this for simplicity or add a tag-line. */}
          {/* Example placeholder if you want sub-brands:
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="text-blue-500 font-semibold text-sm">Wizly Finance</span>
            <span className="text-green-500 font-semibold text-sm">Wizly Pro</span>
            <span className="text-purple-500 font-semibold text-sm">Wizly Creative</span>
          </div>
          */}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Create a Wizly account</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          One account for everything Wizly. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label> {/* Screen reader only label */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="sr-only">Phone (recommended)</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone"
              placeholder="Phone (recommended)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1 px-1">
              Standard call, message, or data rates may apply.
            </p>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 pr-10" // pr-10 for icon space
              required
            />
            <button
              type="button" // Important to prevent form submission
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Lock size={18} /> Create Account
          </button>
        </form>

        {/* Legal Disclaimers */}
        <div className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
          <p>By selecting Create Account, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and have read and acknowledge our <a href="#" className="text-blue-600 hover:underline">Global Privacy Statement</a>.</p>
          <p className="mt-4">
            Invisible reCAPTCHA by Google <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>.
          </p>
        </div>
      </div>
    </div>
  )
}