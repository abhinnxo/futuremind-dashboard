'use client';

import Button from '@/components/Button';
import SingleSelectDropdown from '@/components/SingleSelectDropdown';
import { PlusIcon } from '@heroicons/react/24/outline';

const TopBar = () => {
  return (
    <div className="md:flex justify-between items-center">
      <h1 className="font-semibold text-lg">Recommended Funds</h1>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center max-sm:mt-4 gap-4 sm:gap-10">
        <SingleSelectDropdown
          text="Fund Types"
          options={[
            { id: 1, name: 'Debt' },
            { id: 2, name: 'Open Ended' },
            { id: 4, name: 'DEBT' },
            { id: 5, name: 'Equity' },
            { id: 6, name: 'null' },
            { id: 7, name: 'Hybrid' },
            { id: 8, name: 'test' },
          ]}
        />
        <Button
          text="Add"
          image={<PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />}
        />
      </div>
    </div>
  );
};

export default function RecommendedFunds() {
  return (
    <>
      <TopBar />
    </>
  );
}
