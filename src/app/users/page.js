'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import Table from '@/components/Table';
import Toggle from '@/components/Toggle';
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
        name
        clientCode
        pancard {
          panCardNumber
          gender
          dateOfBirth
        }
        active
        application {
          plan
          basicDetail {
            annualIncome
          }
          mobile
          email
          nominee {
            name
          }
          currentStep
          kycVerified
          agreement {
            eSigned
          }
          documents {
            name
            type
          }
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
    accessorKey: 'clientCode',
    header: 'Client Code',
  },
  {
    accessorKey: 'pancard.panCardNumber',
    header: 'PAN Card Number',
  },
  {
    accessorKey: 'active',
    header: 'Active',
  },
  {
    accessorKey: 'application.plan',
    header: 'Plan',
  },
  {
    accessorKey: 'application.basicDetail.annualIncome',
    header: 'Income',
  },
  {
    accessorKey: 'pancard.dateOfBirth',
    header: 'Date of Birth',
  },
  {
    accessorKey: 'pancard.gender',
    header: 'Gender',
  },
  {
    accessorKey: 'application.mobile',
    header: 'Mobile',
  },
  {
    accessorKey: 'application.email',
    header: 'Email',
  },
  {
    accessorKey: 'application.nominee.name',
    header: 'Nominee',
  },
  {
    accessorKey: 'application.currentStep',
    header: 'Current Step',
  },
  {
    accessorKey: 'application.kycVerified',
    header: 'KYC Status',
  },
  {
    accessorKey: 'application.pancard.kycStatus',
    header: 'Verified',
  },
  {
    accessorKey: 'application.documents',
    header: 'AOf uploaded',
    cell: (data) => (data.length > 0 ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'application.address.completeAddress',
    header: 'Address',
  },
  {
    accessorKey: 'application.primaryBank.name',
    header: 'Bank',
  },
];

export default function Users() {
  const [filterWord, setFilterWord] = useState('');
  const [toggleState, setToggleState] = useState(false);

  const receiveDataFromChild = (data) => {
    setFilterWord(data);
  };

  const handleToggleChange = (enabled) => {
    setToggleState(enabled);
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
      <TopBar heading="Users">
        <Toggle
          key="toggle"
          text="Show Active"
          toggleEnabled={handleToggleChange}
        />
        <SearchBar
          key="searchbar"
          text="Search"
          placeholder="Search PAN Number"
          sendDataToParent={receiveDataFromChild}
        />
        <Button
          key="button"
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
        dataJSON={data.getUsers?.data}
        columnDef={columnDef}
        enablePagination={true}
        enableSorting={true}
        rowsToShow={22}
        customClasses={'h-[900px]'}
        filterWord={filterWord}
        toggleState={toggleState}
        route="users"
      />
    </>
  );
}
