'use client';
import React, { FormEvent, useRef } from 'react';
import Button from './Button';
import { useAuth } from './AuthContext';

const LoggedOutView = () => {
  const { login } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  //. console.log('userRef', userRef);

  const handleLogin = (e: FormEvent) => {
    /**
     * ensures that React takes control of the form submission instead of letting the browser handle it.
     * without this, in the browser console you get
     *  - "Form submission is canceled because form is not connected"
     */
    e.preventDefault();
    const user = userRef.current?.value.trim();
    if (!user) {
      // return error.
      return;
    }
    login(user);
  };
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label>
          Username:
          <input
            className="m-2 rounded-md border border-gray-700 p-2"
            type="text"
            name="username"
            ref={userRef}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            className="m-2 rounded-md border border-gray-700 p-2"
          />
        </label>
        <Button type="submit" text="Login" onClick={() => {}} />
      </form>
    </div>
  );
};

const Login = () => {
  const { user, isLoggedIn, logout } = useAuth();
  //. console.log('rendering login form', { user, isLoggedIn: isLoggedIn });
  return (
    <div className="m-4 flex flex-col rounded-md bg-gray-100 p-4 shadow-md">
      {isLoggedIn && (
        <div className="flex flex-col gap-4 text-xl font-bold">
          Welcome {user}! <Button text="logout" onClick={logout} />
        </div>
      )}
      {!isLoggedIn && <LoggedOutView />}
    </div>
  );
};

export default Login;
