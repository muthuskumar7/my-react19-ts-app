'use client';
// Note: When using hooks, the component needs to be declared as Client component ('use client'). In Next15 all components are SC by default.
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import Button from './Button';
import { useTheme } from './ThemeContext';

/**
 * React.memo
 * Best Practices:
 * Use it only for components with expensive re-renders.
 * Do not use if:
 *  - Component renders quickly.
 *  - Props frequently change (overhead of comparison outweighs benefit).
 */
const ChildComponent: React.FC<{ count: number }> = memo(({ count }) => {
  //. console.log('Child component rendered', count);
  return <h1>Child Component - {count}</h1>;
});

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);
  const { theme } = useTheme();

  /**
   * useRef:
   * ======
   * This just initializes `prevCountRef` value to the initial value of count.
   * But it doesn't automatically update. You need to explicitly update it in useEffect.
   */
  const prevCountRef = useRef(count);

  // Lifecycle actions
  // Empty array - Component Did mount
  useEffect(() => {
    //. console.log('Counter FC - Component Mounted');
    // Component will unmount
    return () => {
      //. console.log('Counter FC - Component Unmounted');
      // Perform any cleanup tasks here when component unmounts.
    };
  }, []); // Note: Empty array means, it runs only on mount

  // Component Update
  useEffect(() => {
    //. console.log({ count, prevCount: prevCountRef.current });
    // Update prevCountRef to track `count` value
    prevCountRef.current = count;
    //. console.log('Counter FC - Component `count` Updated');
    return () => {
      /**
       * This is called when component unmounts.
       * The order of calling is, the clean up fn(return function) of `useEffect` used for component mount (empty array), is called first
       */
      //. console.log('Counter FC - Component `count` unmounted');
    };
  }, [count]); // Runs only when `count` is changed
  //. console.log('Counter - render');
  const updateCount = useCallback(() => setCount(count + 1), [count]);
  const updateSecond = useCallback(() => setSecond(second + 1), [second]);
  return (
    <div className="flex flex-col gap-4 rounded-md border p-4 text-center">
      <h2>Class Component Counter</h2>
      <p>
        Count: {count} | Second : {second} | Theme: {theme}
      </p>
      <Button onClick={updateCount} text="Increment - FC" />
      <Button onClick={updateSecond} text="Increment - FC -  counter 2" />
      <ChildComponent count={count} />
    </div>
  );
};

export default Counter;
