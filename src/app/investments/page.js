'use client';

import React, { useState } from 'react';
import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';

const query = `query {
  getInvestments {
    status
    message
    data {
      current_page
      last_page
      per_page
      lastEvaluatedKey
      investments {
        id
        rtaCode
        schemeName
        folio
        units
        status
        investmentAmount
        investmentValue
        nature
        classification
        amc
      }
    }
  }
}`;

const columnDef = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'rtaCode',
    header: 'RTA Code',
  },
  {
    accessorKey: 'schemeName',
    header: 'Scheme Name',
  },
  {
    accessorKey: 'folio',
    header: 'Folio',
  },
  {
    accessorKey: 'units',
    header: 'Units',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'investmentAmount',
    header: 'Investment Amount',
  },
  {
    accessorKey: 'investmentValue',
    header: 'Investment Value',
  },
  {
    accessorKey: 'nature',
    header: 'Nature',
  },
  {
    accessorKey: 'classification',
    header: 'Classification',
  },
  {
    accessorKey: 'amc',
    header: 'AMC',
  },
];

export default function Investments() {
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
      <TopBar heading="Investments">
        <Toggle text="Show Inactive" />
        <SearchBar
          text="Search"
          placeholder="Search Scheme Name"
          sendDataToParent={receiveDataFromChild}
        />
      </TopBar>
      <Table
        dataJSON={data.getInvestments.data.investments}
        columnDef={columnDef}
        enablePagination={true}
        enableSorting={true}
        rowsToShow={22}
        customClasses={'h-[900px]'}
        filterWord={filterWord}
        route="investments"
      />
    </>
  );
}
