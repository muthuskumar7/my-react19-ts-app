import React from 'react';

type GreetingProps = {
  name: string;
};

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1 className="text-2xl font-bold text-green-600">Hello, {name}! Welcome to React 19.</h1>;
};

export default Greeting;
