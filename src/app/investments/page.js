import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';

const TopBar = () => {
  return (
    <div className="md:flex justify-between items-center">
      <h1 className="font-semibold text-lg">Investments</h1>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center max-sm:mt-4 gap-4 sm:gap-10">
        <Toggle text="Show Inactive" />
        <SearchBar text="Search" placeholder="Search Scheme Name" />
      </div>
    </div>
  );
};

export default function Investments() {
  return (
    <>
      <TopBar />
    </>
  );
}
