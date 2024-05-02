'use client';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

const query = gql`
  {
    getInvestments {
      data {
        investments {
          individual {
            name
            clientCode
            pancard {
              panCardNumber
            }
            mandate {
              amount
            }
          }
        }
      }
    }
  }
`;

const columnDef = [
  {
    accessorFn: (row) => row.individual.pancard.panCardNumber,
    header: 'PAN Card No.',
  },
  {
    accessorFn: (row) => row.individual.name,
    header: 'Client Name',
  },
  {
    accessorFn: (row) => row.individual.clientCode,
    header: 'Client Code',
  },
  {
    accessorFn: (row) => row.individual.equity,
    header: 'Equity',
  },
  {
    accessorFn: (row) => row.individual.debt,
    header: 'Debt',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'Hybrid',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'Gold',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'Investment Amount',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'Current Market Valuer',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'Profit/Loss',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'Absolute RETURNS (%)',
  },
  {
    accessorFn: (row) => row.individual.hybrid,
    header: 'XIRR(%)',
  },
];

export default function Investments() {
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
  if (data.getInvestments) {
    return (
      <>
        <TopBar heading="Investments">
          <Toggle text="Show Active" />
          <SearchBar text="Search" placeholder="Search Scheme Name" />
        </TopBar>
        <Table
          dataJSON={data.getInvestments.data.investments}
          columnDef={columnDef}
          customClasses={'h-[900px]'}
        />
      </>
    );
  }
  return <div>Loading....</div>;
}
