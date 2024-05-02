'use client';

import Table from '@/components/Table';
import Button from '@/components/Button';
import SingleSelectDropdown from '@/components/SingleSelectDropdown';
import TopBar from '@/components/TopBar';
import { PlusIcon } from '@heroicons/react/24/outline';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

const query = gql`
  {
    getRecommendedFunds {
      data {
        id
        name
        type
        category
        rtaCode
        isActive
        recommended {
          rank
        }
      }
    }
  }
`;

const columnDef = [
  {
    accessorFn: (row) => row.name,
    header: 'Name',
  },
  {
    accessorFn: (row) => row.type,
    header: 'Type',
  },
  {
    accessorFn: (row) => row.category,
    header: 'Category',
  },
  {
    accessorFn: (row) => row.rtaCode,
    header: 'RTA Code',
  },
  {
    accessorFn: (row) => row.isActive,
    header: 'Is Active',
  },
  {
    accessorFn: (row) => row.recommended.rank,
    header: 'Rank',
  },
];

export default function RecommendedFunds() {
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
  if (data.getRecommendedFunds) {
    return (
      <>
        <TopBar heading="Recommended Funds">
          <SingleSelectDropdown
            text="Fund Types"
            options={[
              { id: 0, name: 'Show All' },
              { id: 1, name: 'Debt' },
              { id: 2, name: 'Open Ended' },
              { id: 3, name: 'Equity' },
              { id: 4, name: 'Hybrid' },
            ]}
          />
          <Button
            text="Add"
            image={
              <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
            }
          />
        </TopBar>
        {!isLoading && (
          <Table
            dataJSON={data.getRecommendedFunds.data}
            columnDef={columnDef}
            customClasses={'h-[900px]'}
          />
        )}
      </>
    );
  }
  return <div>Loading....</div>;
}
