import Table from '@/components/Table';
import Button from '@/components/Button';
import SingleSelectDropdown from '@/components/SingleSelectDropdown';
import TopBar from '@/components/TopBar';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function RecommendedFunds() {
  return (
    <>
      <TopBar heading="Recommended Funds">
        <SingleSelectDropdown
          text="Fund Types"
          options={[
            { id: 0, name: 'Show All' },
            { id: 1, name: 'Debt' },
            { id: 2, name: 'Open Ended' },
            { id: 3, name: 'Equity' },
            { id: 4, name: 'Hybrid' },
          ]}
        />
        <Button
          text="Add"
          image={<PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />}
        />
      </TopBar>
      <Table
        // dataJSON={}
        // columnDef={}
        enablePagination={true}
        enableSorting={true}
        rowsToShow={22}
        customClasses={'h-[900px]'}
      />
    </>
  );
}
