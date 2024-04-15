import Image from 'next/image';
import React from 'react';

function Button({ image, text }) {
  return (
    <div className="py-1 px-6 rounded bg-tm-blue hover:bg-tm-blue1 flex justify-center items-center gap-2 cursor-pointer">
      <Image
        src={image}
        alt={text}
        width="30px"
        className="text-white font-xl text-white"
      />
      {text}
    </div>
  );
}

export default Button;
