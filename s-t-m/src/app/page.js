'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import MainPage from "@/components/Homepage";

export default function Home() {
  return (
    <>
      <SignedIn>
        <MainPage />
      </SignedIn>

      <SignedOut>
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-light">
          <div className="card border-0 shadow-lg rounded-3" style={{ width: '100%', maxWidth: '400px' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-4">
                <div className="bg-primary bg-opacity-10 d-inline-flex p-3 rounded-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <h2 className="h4 mb-3 fw-bold">Welcome to Smart Task Manager</h2>
              <p className="text-muted mb-4">Please sign in with your account to manage your tasks efficiently.</p>
              <SignInButton mode="modal">
                <button className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}