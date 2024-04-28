'use client';

import { useState } from 'react';
import Table from '@/components/Table';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import TopBar from '@/components/TopBar';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';

const query = `query GetClients {
 getUsers {
    status
    message
    data {
      id
      name
      clientCode
      subscription {
        plan
        credits
        status
        mandate {
          startDate
          endDate
          mandateStatus
        }
      }
    }
  }
}`;

const columnDef = [
  {
    accessorKey: 'name',
    header: 'Client Name',
  },
  {
    accessorKey: 'clientCode',
    header: 'Client Code',
  },
  {
    accessorKey: 'subscription.amount',
    header: 'Amount',
  },
  {
    accessorKey: 'subscription.plan',
    header: 'Plan',
  },
  {
    accessorKey: 'subscription.credits',
    header: 'Credits',
  },
  {
    accessorKey: 'subscription.status',
    header: 'Status',
  },
  {
    accessorKey: 'subscription.registrationDate',
    header: 'Registration Date',
  },
  {
    accessorKey: 'subscription.mandate.uploadDate',
    header: 'Upload Date',
  },
  {
    accessorKey: 'subscription.mandate.approvedDate',
    header: 'Approved Date',
  },
  {
    accessorKey: 'subscription.mandate.startDate',
    header: 'Start Date',
  },
  {
    accessorKey: 'subscription.mandate.endDate',
    header: 'End Date',
  },
  {
    accessorKey: 'subscription.mandate.mandateStatus',
    header: 'Mandate Status',
  },
];

export default function Subscriptions() {
  const [filterWord, setFilterWord] = useState('');

  const receiveDataFromChild = (data) => {
    setFilterWord(data);
  };

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
      <TopBar heading="Subscriptions">
        <SearchBar
          text="Search"
          placeholder="Search Client Name"
          sendDataToParent={receiveDataFromChild}
        />
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
        dataJSON={data.getUsers.data}
        columnDef={columnDef}
        enablePagination={true}
        enableSorting={true}
        rowsToShow={22}
        customClasses={'h-[900px]'}
        filterWord={filterWord}
        route="subscriptions"
      />
    </>
  );
}
