import Table from '@/components/Table';
import Button from '@/components/Button';
import SingleSelectDropdown from '@/components/SingleSelectDropdown';
import TopBar from '@/components/TopBar';
import { PlusIcon } from '@heroicons/react/24/outline';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function RecommendedFunds() {
  return (
    <>
      <TopBar heading="Recommended Funds">
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
      </TopBar>
      <Table
        dataJSON={dataJSON}
        columnDef={columnDef}
        enablePagination={true}
        enableSorting={true}
      />
    </>
  );
}
