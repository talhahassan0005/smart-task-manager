import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="container py-5 d-flex justify-content-center">
      <SignIn redirectUrl="/" />
    </div>
  );
}

// This code defines a SignIn page using Clerk's SignIn component.
// It centers the SignIn form within a container and redirects users to the home page upon successful sign-in.
