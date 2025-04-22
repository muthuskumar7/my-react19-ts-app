import React from 'react';
import Greeting from '@/components/Greeting';
import CounterClass from '@/components/CounterClass';
import CounterWrapper from '@/components/CounterWrapper';
import { ThemeProvider } from '@/components/ThemeContext';
import { AuthProvider } from '@/components/AuthContext';
import Login from '@/components/Login';

export default function Home() {
  console.log('page.tsx - render');
  return (
    <AuthProvider>
      <ThemeProvider>
        <main className="flex min-h-screen flex-col items-center justify-center space-y-6">
          <Greeting name="Muthu" />
          <Login />
          <CounterWrapper />
          <CounterClass />
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}
