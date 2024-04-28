import React from 'react';

function Badge({ type, text }) {
  if (text !== '') {
    if (type === 'primary')
      return (
        <span className="bg-blue-500 text-white px-2 py-1 rounded-xl bg-opacity-55">
          {text}
        </span>
      );
    if (type === 'danger')
      return (
        <span className="bg-red-400 text-white px-2 py-1 rounded-xl bg-opacity-75">
          {text}
        </span>
      );
    if (type === 'warning')
      return (
        <span className="bg-yellow-400 text-white px-2 py-1 rounded-xl bg-opacity-75">
          {text}
        </span>
      );
    if (type === 'success')
      return (
        <span className="bg-green-400 text-white px-2 py-1 rounded-xl bg-opacity-75">
          {text}
        </span>
      );
  }
}

export default Badge;
