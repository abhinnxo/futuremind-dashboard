import React from 'react';

function Badge({ type, text }) {
  if (type === 'GOLD')
    return (
      <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded-xl bg-opacity-55">
        {text}
      </span>
    );
  if (type === 'PREMIUM')
    return (
      <span className="bg-blue-400 text-blue-800 px-2 py-1 rounded-xl bg-opacity-75">
        {text}
      </span>
    );
  if (type === 'BASIC')
    return (
      <span className="bg-purple-400 text-purple-800 px-2 py-1 rounded-xl bg-opacity-75">
        {text}
      </span>
    );
  if (type === 'normal')
    return (
      <span className="bg-gray-300 text-gray-800 px-2 py-1 rounded-xl bg-opacity-75">
        {text}
      </span>
    );
}

export default Badge;
