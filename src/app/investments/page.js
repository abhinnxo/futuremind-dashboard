import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';

export default function Investments() {
  return (
    <>
      <TopBar heading="Investments">
        <Toggle text="Show Inactive" />
        <SearchBar text="Search" placeholder="Search Scheme Name" />
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
