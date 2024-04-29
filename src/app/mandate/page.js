'use client';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

const query = gql`GetMandates {
  getMandates {
    status
    message
    data {
      id
      amount
      startDate
      endDate
      mandateStatus
      uploadDate
      registrationDate
      approvedDate
      UMRN
    }
  }
}`;

const columnDef = [
  {
    accessorKey: 'clientName',
    header: 'Client Name',
  },
  {
    accessorKey: 'clientCode',
    header: 'Client Code',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'mandateStatus',
    header: 'Mandate Status',
  },
  {
    accessorKey: 'uploadDate',
    header: 'Upload Date',
  },
  {
    accessorKey: 'registrationDate',
    header: 'Registration Date',
  },
  {
    accessorKey: 'approvedDate',
    header: 'Approved Date',
  },
  {
    accessorKey: 'bank.name',
    header: 'Bank',
  },
  {
    accessorKey: 'UMRN',
    header: 'UMRN',
  },
];

export default function Mandate() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['abc'],
    queryFn: () => fetchClientData(query),
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div className="text-red-500">Something went Wrong...</div>;
  }
  return (
    <>
      <TopBar heading="SIP Mandate">
        <Toggle text="Show All" />
        <SearchBar text="Search" placeholder="Search Client Name" />
      </TopBar>
      <Table
        dataJSON={data.getMandates.data}
        columnDef={columnDef}
        enablePagination={true}
        enableSorting={true}
        rowsToShow={22}
        customClasses={'h-[900px]'}
      />
    </>
  );
}
