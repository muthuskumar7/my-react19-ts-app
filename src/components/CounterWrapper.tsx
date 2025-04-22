'use client';
/**
 * This wrapper class is created to test component mount and unmount of Counter.
 * Reason:
 * ======
 * If not for this wrapper, page.tsx would have to be declared as 'use client'.
 * What happens when you set page.tsx as client component?
 *  Since the page would no longer be server-rendered, it may result in slower initial loading compared to a server-rendered page because the client has to wait for JavaScript to load and hydrate the page.
 */
import React, { ReactNode, useCallback, useState } from 'react';
import Counter from './Counter';
import Button from './Button';
import { useTheme } from './ThemeContext';
import CounterClass from './CounterClass';

const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-xl font-bold">{children}</h1>;
};

type ModuleProps = {
  title: string;
  children: ReactNode;
};
const Module = ({ title, children }: ModuleProps) => {
  return (
    <div className="my-4 flex flex-col gap-4 border p-4">
      <Title>{title}</Title>
      {children}
    </div>
  );
};

const CounterWrapper: React.FC = () => {
  // console.log('CounterWrapper - render');
  const [showCounter, setShowCounter] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const btnText = `${showCounter ? 'Hide' : 'Show'} Counter`;
  /**
   * useCallback:
   * ============
   * `handleShowCounter` remains the same between renders unless dependencies change.
   * Best Practices:
   * ✅ Use when passing functions to React.memo components.
   * ✅ Do not use if function re-creation is trivial.
   */
  const handleShowCounter = useCallback(() => setShowCounter((prev) => !prev), [showCounter]);
  const handleToggleTheme = useCallback(() => toggleTheme(), [theme]);

  return (
    <div className="flex flex-col gap-3">
      <Module title="Counter">
        <Button onClick={handleShowCounter} text={btnText} />
        {showCounter && <Counter />}
      </Module>
      {/* Theme */}
      <Module title={`Theme: ${theme}`}>
        <Button onClick={handleToggleTheme} text="Toggle Theme" />
      </Module>
    </div>
  );
};

export default CounterWrapper;
