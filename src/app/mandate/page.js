import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import dataJSON from '../../data/data.json';
import { columnDef } from '../../data/columns';

export default function Mandate() {
  return (
    <>
      <TopBar heading="SIP Mandate">
        <Toggle text="Show All" />
        <SearchBar text="Search" placeholder="Search Client Name" />
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
