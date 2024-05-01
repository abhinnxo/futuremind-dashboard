'use client';

import Table from '@/components/Table';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import TopBar from '@/components/TopBar';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

const query = gql`
  {
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
  }
`;

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
  if (data.getUsers) {
    return (
      <>
        <TopBar heading="Subscriptions">
          <SearchBar text="Search" placeholder="Search Client Name" />
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
          customClasses={'h-[900px]'}
        />
      </>
    );
  }
  return <div>Loading....</div>;
}
