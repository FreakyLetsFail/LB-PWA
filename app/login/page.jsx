"use client"; 
import React from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleSignIn = (provider) => {
    signIn(provider);
  };
  
  return (
    <div className="main">
      <div className="gradient">
        <div className="app">
          <h1 className="head_text">Login</h1>
          <div className="button-group mt-4">
            <button
              onClick={() => handleSignIn('google')}
              className="black_btn"
            >
              Login with Google
            </button>
            <button
              onClick={() => handleSignIn('email')}
              className="outline_btn mt-2"
            >
              Login with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
