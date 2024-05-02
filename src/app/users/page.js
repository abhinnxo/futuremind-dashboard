'use client';

import React from 'react';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import Table from '@/components/Table';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';

const query = gql`
  {
    getUsers {
      data {
        name
        clientCode
        joiningDate
        subscription {
          plan
          status
        }
        pancard {
          panCardNumber
          kycStatus
        }
        riskProfile
        pancard {
          dateOfBirth
          gender
        }
        contactDetails {
          mobile
          email
        }
        primaryBank {
          name
          branch
          accountNumber
          ifsc
        }
        nominee {
          name
        }
        address {
          completeAddress
        }
        basicDetail {
          annualIncome
        }
      }
    }
  }
`;

const columnDef = [
  {
    accessorFn: (row) => row.name,
    header: 'Client Name',
  },
  {
    accessorFn: (row) => row.clientCode,
    header: 'Client Code',
  },
  {
    accessorFn: (row) => row.joiningDate,
    header: 'Joining Date',
  },
  {
    accessorFn: (row) => row.subscription?.plan,
    header: 'Plan',
    cell: (props) => <Badge text={props.getValue()} type={props.getValue()} />,
  },
  {
    accessorFn: (row) => row.pancard?.panCardNumber,
    header: 'PAN Card Number',
  },
  {
    accessorFn: (row) => row.riskProfile,
    header: 'Risk Profile',
    cell: (props) =>
      props.getValue() === null ? (
        'null'
      ) : (
        <Badge text={props.getValue()} type="normal" />
      ),
  },
  {
    accessorFn: (row) => row.pancard?.dateOfBirth,
    header: 'Date of Birth',
  },
  {
    accessorFn: (row) => row.pancard?.gender,
    header: 'Gender',
  },
  {
    accessorFn: (row) => row.contactDetails?.mobile,
    header: 'Mobile',
  },
  {
    accessorFn: (row) => row.contactDetails?.email,
    header: 'Email',
    cell: (props) => <span className="text-blue-600">{props.getValue()}</span>,
  },
  {
    accessorFn: (row) => row.primaryBank,
    header: 'Bank Details',
    cell: (props) => (
      <Modal
        comp={<span className="text-blue-600 underline">Show Details</span>}
        heading="Bank Details"
        body={
          <>
            <div>
              <strong>Name:</strong> {props.getValue()?.name}
            </div>
            <div>
              <strong>A/C No.:</strong> {props.getValue()?.accountNumber}
            </div>
            <div>
              <strong>IFSC Code:</strong> {props.getValue()?.ifsc}
            </div>
            <div>
              <strong>Branch Name:</strong> {props.getValue()?.branch}
            </div>
          </>
        }
      />
    ),
  },
  {
    accessorFn: (row) => row.nominee?.name,
    header: 'Nominee',
  },
  {
    accessorFn: (row) => row.address?.completeAddress,
    header: 'Address',
  },
  {
    accessorFn: (row) => row.basicDetail?.annualIncome,
    header: 'Income',
  },
  {
    accessorFn: (row) => row.subscription?.status,
    header: 'Status',
    cell: (props) =>
      props.getValue() === 'ACTIVE' ? (
        <span className="text-green-600">{props.getValue()}</span>
      ) : (
        <span className="text-red-600">{props.getValue()}</span>
      ),
  },
  {
    accessorFn: (row) => row.pancard?.kycStatus,
    header: 'KYC Status',
  },
];

export default function Users() {
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
        <TopBar heading="Users">
          <Toggle key="toggle" text="Show Active" />
          <SearchBar
            key="searchbar"
            text="Search"
            placeholder="Search PAN Number"
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
          dataJSON={data.getUsers.data}
          columnDef={columnDef}
          customClasses={'h-[900px]'}
        />
      </>
    );
  }
  return <div>Loading....</div>;
}
