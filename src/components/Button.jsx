import React from 'react';

function Button({ image, text, onClick }) {
  return (
    <button
      className="w-fit py-1 px-6 rounded bg-btn-primary hover:bg-btn-hover flex justify-center items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {image}
      <span className="text-white">{text}</span>
    </button>
  );
}

export default Button;
