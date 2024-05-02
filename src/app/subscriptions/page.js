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
      data {
        name
        clientCode
        pancard {
          panCardNumber
        }
        subscription {
          startDate
          endDate
          credits
          plan
        }
      }
    }
  }
`;

const columnDef = [
  {
    accessorFn: (row) => row.pancard?.panCardNumber,
    header: 'PAN Card No.',
  },
  {
    accessorFn: (row) => row.name,
    header: 'Client Name',
  },
  {
    accessorFn: (row) => row.clientCode,
    header: 'Client Code',
  },
  {
    accessorFn: (row) => row.subscription.amount,
    header: 'Amount',
  },
  {
    accessorFn: (row) => row.subscription.plan,
    header: 'Plan',
  },
  {
    accessorFn: (row) => row.subscription.credits,
    header: 'Credits',
  },
  {
    accessorFn: (row) => row.subscription.registrationDate,
    header: 'Registration Date',
  },
  {
    accessorFn: (row) => row.subscription.startDate,
    header: 'Start Date',
  },
  {
    accessorFn: (row) => row.subscription.endDate,
    header: 'End Date',
  },
  {
    accessorFn: (row) => row.subscription.renewalDate,
    header: 'Renewal Date',
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
