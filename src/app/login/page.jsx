// frontend/app/login/page.jsx
'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { authClient } from '@/src/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

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

    // if errer found, stop submission
    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      console.log('Login result:', result);

      // Better Auth returns an error object on failure, not an exception
      if (result?.error) {
        toast.error(result.error.message || 'Invalid credentials');
        setErrors({ general: result.error.message });
        setIsLoading(false);
        return;
      }

      // If we reach here, login was successful
      toast.success('Logged in successfully!');
      router.push('/my-profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
      setErrors({ general: error.message || 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  // Social login handlers
  const handleSocialLogin = async (provider) => {
    try {
      const result = await authClient.signIn.social({
        provider: provider,
        callbackURL: '/my-profile',
      });
      // Better Auth automatically redirects
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`Failed to login with ${provider}`);
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
              className='w-full rounded-lg border px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Password field with eye toggle */}
          <div className='relative'>
            <input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='w-full rounded-lg border px-4 py-2 pr-10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-2.5 text-gray-500 hover:text-cyan-600'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className='text-red-500 text-sm text-center'>{errors.general}</p>
          )}

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center cursor-pointer'>
              <input
                type='checkbox'
                name='rememberMe'
                className='mr-2 rounded border-gray-300 cursor-pointer'
              />
              <span className='text-gray-600'>Remember me</span>
            </label>
            <Link
              href='/forgot-password'
              className='text-cyan-600 hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className='mt-6 space-y-3'>
          <button
            onClick={() => handleSocialLogin('google')}
            type='button'
            className='w-full rounded-lg border px-4 py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-cyan-50 transition'
          >
            <FcGoogle className='size-6' />
            Sign In with Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            type='button'
            className='w-full rounded-lg border px-4 py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-cyan-50 transition'
          >
            <FaGithub className='size-6' />
            Sign In with GitHub
          </button>
        </div>

        <p className='mt-4 text-center text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='text-cyan-600 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
