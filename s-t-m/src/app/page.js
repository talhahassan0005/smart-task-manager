'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import MainPage from '@/components/Homepage';

export default function Home() {
  return (
    <>
      <SignedIn>
        <MainPage />
      </SignedIn>

      <SignedOut>
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-light">
          <div
            className="card border-0 shadow-lg rounded-3 text-center"
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <div className="card-body p-5">
              {/* 🔴 Jeeny Logo Circle */}
              <div className="mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle shadow"
                  style={{
                    backgroundColor: '#ff4da6',
                    width: '64px',
                    height: '64px',
                  }}
                >
                  <span className="text-white fw-bold fs-4">Jeeny</span>
                </div>
              </div>

              <h2 className="h4 mb-3 fw-bold">Welcome to Smart Task Manager</h2>
              <p className="text-muted mb-4">
                Please sign in with your account to manage your tasks efficiently.
              </p>

              <SignInButton mode="modal">
                <button className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-log-in"
                  >
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
