import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';

export default function Mandate() {
  return (
    <>
      <TopBar heading="SIP Mandate">
        <Toggle text="Show All" />
        <SearchBar text="Search" placeholder="Search Client Name" />
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
