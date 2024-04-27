import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import Table from '@/components/Table';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function Users() {
  return (
    <>
      <TopBar heading="Users">
        <Toggle key="toggle" text="Show All" />
        <SearchBar
          key="searchbar"
          text="Search"
          placeholder="Search PAN Name"
        />
        <Button
          key="button"
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
