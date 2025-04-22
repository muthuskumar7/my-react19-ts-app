'use client';
import React, { memo } from 'react';

type ButtonProps = {
  onClick: () => void;
  text: string;
  type?: string;
};

/**
 * React.memo
 * ==========
 * ✅ Use React.memo when:
 * The button receives props that rarely change (e.g., a static label).
 * The button is inside a component that re-renders frequently but doesn't need to update.
 * The button has expensive logic inside (e.g., conditional styling, animations).
 * ❌ Avoid React.memo when:
 * The button is simple and lightweight (just rendering text or an icon).
 * The button’s props change often, making memoization useless (e.g., dynamic styling based on state).
 * The parent component itself rarely re-renders.
 */

// Note: Using Typescript Generics instead of assigning type to `props`
const Button: React.FC<ButtonProps> = memo(({ text, onClick }) => {
  // console.log('Button - render', text);
  // Add type to button. primary, secondary, error etc.
  const btnClass = `px-4 py-2 bg-blue-500 text-white font-bold rounded-full cursor-pointer hover:bg-blue-600`;
  return (
    <button className={btnClass} onClick={onClick}>
      {text}
    </button>
  );
});

export default Button;
