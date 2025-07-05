'use client'; // Add this since Clerk components require client-side interactivity

import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();

  // Optional: Redirect if already signed in
  useEffect(() => {
    if (window.Clerk?.user) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignIn 
            path="/signin"
            routing="path"
            signUpUrl="/signup"
            redirectUrl="/"
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none w-full',
                headerTitle: 'text-lg font-medium',
                headerSubtitle: 'text-sm',
                socialButtonsBlockButton: 'border-gray-300',
                formFieldInput: 'focus:ring-blue-500 focus:border-blue-500',
                footerActionLink: 'text-blue-600 hover:text-blue-500'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}