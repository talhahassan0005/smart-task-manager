import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="container py-5 d-flex justify-content-center">
      <SignUp redirectUrl="/" />
    </div>
  );
}
// This code defines a SignUp page using Clerk's SignUp component.
// It centers the SignUp form within a container and redirects users to the home page upon successful