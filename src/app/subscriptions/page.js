import Table from '@/components/Table';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function Subscriptions() {
  return (
    <>
      <div className="md:flex justify-between items-center mb-4">
        <h1 className="font-semibold text-lg">Subscriptions</h1>
        <div className="flex max-sm:flex-col sm:justify-between sm:items-center max-sm:mt-4 gap-4 sm:gap-10">
          <SearchBar text="Search" placeholder="Search Client Name" />
          <Button
            text="Export"
            image={
              <ArrowDownTrayIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            }
          />
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
