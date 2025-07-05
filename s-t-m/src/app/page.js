// app/page.js
'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import HomePage from "@/app/pages/Homepage/page";

export default function MainPage() {
  return (
    <>
      <SignedIn>
        <HomePage />
      </SignedIn>

      <SignedOut>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="text-center p-4 shadow rounded bg-white" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="mb-3">Welcome to Smart Task Manager</h2>
            <p className="text-muted mb-4">Please sign in with your account to manage your tasks efficiently.</p>
            <SignInButton mode="modal">
              <button className="btn btn-primary w-100">🔐 Sign In </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
