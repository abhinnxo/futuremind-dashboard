import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function Investments() {
  return (
    <>
      <TopBar heading="Investments">
        <Toggle text="Show Inactive" />
        <SearchBar text="Search" placeholder="Search Scheme Name" />
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
