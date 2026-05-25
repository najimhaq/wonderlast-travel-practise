// frontend/app/signup/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/src/app/lib/auth-client';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleSocialLogin = async (provider) => {
    try {
      const result = await authClient.signIn.social({
        provider: provider,
        callbackURL: '/my-profile',
      });
      console.log(`${provider} login result:`, result);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`Failed to login with ${provider}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validation
    const newErrors = {};
    if (!data.fullName || data.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!data.password || data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { data: signUpData, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
        image: data.imageUrl || undefined,
      });

      console.log(signUpData);

      if (error) {
        throw new Error(error.message || 'Signup failed');
      }

      toast.success('Account created successfully!');
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-cyan-600'>
          Create Account
        </h2>
        <p className='text-center text-gray-600 mt-2'>
          Start your journey with us
        </p>

        <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
          <div>
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none'
            />
            {errors.fullName && (
              <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type='url'
              name='imageUrl'
              placeholder='Profile Image URL (optional)'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none'
            />
          </div>

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent pr-10 outline-none'
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

          <div className='relative'>
            <input
              type={showConfirm ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent pr-10 outline-none'
            />
            <button
              type='button'
              onClick={() => setShowConfirm(!showConfirm)}
              className='absolute right-3 top-2.5 text-gray-500 hover:text-cyan-600'
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <button
              type='button'
              onClick={() => handleSocialLogin('google')}
              className='flex items-center justify-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition'
            >
              <FcGoogle className='size-5' /> Google
            </button>
            <button
              type='button'
              onClick={() => handleSocialLogin('github')}
              className='flex items-center justify-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition'
            >
              <FaGithub className='size-5' /> GitHub
            </button>
          </div>
        </div>

        <p className='text-center text-sm text-gray-600 mt-6'>
          Already have an account?{' '}
          <Link href='/login' className='text-cyan-600 hover:underline'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
