'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import ArrowHead from '../app/assets/icons/up-arrow.svg';
import Cross from '../app/assets/icons/cross.svg';

function SingleSelectDropdown({ text, options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <span className="flex gap-2 items-center w-fit">
      <p className="font-medium text-md">{text}</p>
      <div className="w-full relative">
        <span
          className="rounded-full p-1 bg-secondary-500 absolute right-8 top-3 z-10 cursor-pointer"
          onClick={() => setSelectedOption(options[0])}
        >
          <Image src={Cross} alt="up-arrow" width={10} height={10} />
        </span>
        <Listbox value={setSelectedOption} onChange={setSelectedOption}>
          {({ open }) => (
            <>
              <Listbox.Button className="py-2 px-3 border rounded-lg flex items-center justify-between gap-2 w-64">
                <span>{selectedOption.name}</span>
                <span
                  className={`transform transition-transform duration-200 ${open ? 'rotate-0' : 'rotate-180'}`}
                >
                  <Image
                    src={ArrowHead}
                    alt="up-arrow"
                    width={10}
                    height={10}
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute border mt-2 z-10 w-fit rounded-md shadow-lg bg-white">
                {options.map((obj) => (
                  <Listbox.Option
                    key={obj.id}
                    value={obj}
                    className={`${selectedOption === obj ? 'bg-secondary-100 hover:bg-secondary-300' : ''} cursor-pointer py-1 px-4 hover:bg-gray-100`}
                  >
                    {obj.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
      </div>
    </span>
  );
}

export default SingleSelectDropdown;
