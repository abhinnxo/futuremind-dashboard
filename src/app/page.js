'use client';

import Table from '@/components/Table';
import LineChart from '@/components/LineChart';
import TopBar from '@/components/TopBar';
import dataJSON from '../data/data.json';
import { columnDef } from '../data/columns';

export default function Home() {
  return (
    <div>
      <TopBar heading="Dashboard" />
      <div className="grid grid-cols-5 gap-2">
        <div className="lg:col-span-3 bg-gray-100 h-[500px] overflow-y-scroll">
          <LineChart />
        </div>
        <div className="lg:col-span-2 h-[500px] overflow-y-scroll">
          <Table
            dataJSON={dataJSON}
            columnDef={[
              {
                accessorKey: 'id',
                enableResizing: true,
                header: 'ID',
                enableSorting: false,
              },
              {
                accessorKey: 'first_name',
                enableResizing: true,
                header: 'First Name',
              },
            ]}
            enablePagination={false}
          />
        </div>
        <div className="lg:col-span-5">
          <Table
            dataJSON={dataJSON}
            columnDef={columnDef}
            enablePagination={true}
            enableSorting={true}
          />
        </div>
      </div>
    </div>
  );
}
