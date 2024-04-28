import Table from '@/components/Table';
import LineChart from '@/components/LineChart';
import TopBar from '@/components/TopBar';

export default function Home() {
  return (
    <div className="flex flex-col md:h-screen">
      <TopBar heading="Dashboard" />
      <div className="flex flex-col gap-2">
        <div className="md:flex h-1/4 gap-2">
          <div className="w-full md:w-3/4">
            <LineChart />
          </div>
          <div className="w-full md:w-1/3">
            <Table
              // dataJSON={}
              // columnDef={}
              customClasses="h-[366px]"
            />
          </div>
        </div>
        <div className="md:h-2/3 md:mt-24">
          <Table
            // dataJSON={}
            // columnDef={}
            enableSorting={true}
            customClasses="h-[650px]"
          />
        </div>
      </div>
    </div>
  );
}
