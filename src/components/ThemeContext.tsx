'use client';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// 1. Create context to be used across the app.
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Provider - a wrapper component to make context available for all the children.
type ThemeProviderProps = {
  children: ReactNode;
};
/**
 * Or you can use the shortcut below to avoid explicitly definig props type.
 * const ThemeProvider = (({ children }: { children: ReactNode }) => {
 */
export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    // setTheme function of useState take function as arg so, we can access existing value before changing to new value
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  //. console.log('ThemeProvider rendered');
  // const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>
  );
};

/**
 * 3. export the context so it is accessbile for all the children.
 * exporting `useTheme` is optional, the children can use `useContext` directly.
 * But every children has to handle error explicitly. This is more of a best practice and optimistic approach.
 * Less code at child components.
 */
export const useTheme = () => {
  const context: ThemeContextType | undefined = useContext(ThemeContext);
  // For components that are not children of ThemeProvider, ThemeContext won't be avaialble and is undefined.
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
