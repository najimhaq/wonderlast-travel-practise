'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());


    console.log(data)

    let newErrors = {};

    // Email validation
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', data);
      // এখানে তুমি backend এ পাঠাতে পারো
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-cyan-50'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-lg'>
        <h2 className='text-2xl font-bold text-cyan-600'>Welcome Back</h2>
        <p className='mt-2 text-sm text-gray-600'>
          Resume your adventure with Wanderlust
        </p>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <div>
            <input
              name='email'
              type='email'
              placeholder='Email Address'
              className='w-full rounded-lg border px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email}</p>
            )}
          </div>

          {/* Password field with eye toggle */}
          <div className='relative'>
            <input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='w-full rounded-lg border px-4 py-2 pr-10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-2.5 text-gray-500 hover:text-cyan-600'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password}</p>
            )}
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center'>
              <input type='checkbox' className='mr-2 rounded border-gray-300' />
              Remember me
            </label>
            <a href='#' className='text-cyan-600 hover:underline'>
              Forgot password?
            </a>
          </div>

          <button
            type='submit'
            className='w-full rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700'
          >
            Sign In
          </button>
        </form>

        <div className='mt-6 space-y-3'>
          <button className='w-full rounded-lg border px-4 py-2 flex items-center justify-center gap-2 hover:bg-cyan-50'>
            <FcGoogle className='size-6' />
            Sign In with Google
          </button>
          <button className='w-full rounded-lg border px-4 py-2 flex items-center justify-center gap-2 hover:bg-cyan-50'>
            <FaGithub className='size-6' />
            Sign In with GitHub
          </button>
        </div>

        <p className='mt-4 text-center text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <a href='/signup' className='text-cyan-600 hover:underline'>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
