import React from 'react';

function Button({ image, text }) {
  return (
    <div className="w-fit py-1 px-6 rounded bg-btn-primary hover:bg-btn-hover flex justify-center items-center gap-2 cursor-pointer">
      {image}
      <span className="text-white">{text}</span>
    </div>
  );
}

export default Button;
