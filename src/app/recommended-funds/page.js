'use client';

import { useState } from 'react';
import Table from '@/components/Table';
import Button from '@/components/Button';
import SingleSelectDropdown from '@/components/SingleSelectDropdown';
import TopBar from '@/components/TopBar';
import { PlusIcon } from '@heroicons/react/24/outline';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

const query = gql`GetFunds {
  getFunds {
    status
    message
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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'rtaCode',
    header: 'RTA Code',
  },
  {
    accessorKey: 'isActive',
    header: 'Is Active',
  },
  {
    accessorKey: 'recommended.rank',
    header: 'Rank',
  },
];

export default function RecommendedFunds() {
  const [selectOption, setSelectOption] = useState('Show All');

  const handleSelectOption = (option) => {
    setSelectOption(option.name);
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
          onSelectOption={handleSelectOption}
        />
        <Button
          text="Add"
          image={<PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />}
        />
      </TopBar>
      {!isLoading && (
        <Table
          dataJSON={data.getFunds.data}
          columnDef={columnDef}
          enablePagination={true}
          enableSorting={true}
          rowsToShow={22}
          customClasses={'h-[900px]'}
          selectedOption={selectOption}
          route="recommended_funds"
        />
      )}
    </>
  );
}
