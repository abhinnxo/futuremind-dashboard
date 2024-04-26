import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function Mandate() {
  return (
    <>
      <div className="md:flex justify-between items-center mb-4">
        <h1 className="font-semibold text-lg">SIP Mandate</h1>
        <div className="flex max-sm:flex-col sm:justify-between sm:items-center max-sm:mt-4 gap-4 sm:gap-10">
          <Toggle text="Show All" />
          <SearchBar text="Search" placeholder="Search Client Name" />
        </div>
      </div>
      <Table
        dataJSON={dataJSON}
        columnDef={columnDef}
        enablePagination={true}
        enableSorting={true}
      />
    </>
  );
}
