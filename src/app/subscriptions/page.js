import Table from '@/components/Table';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import TopBar from '@/components/TopBar';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function Subscriptions() {
  return (
    <>
      <TopBar heading="Subscriptions">
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
