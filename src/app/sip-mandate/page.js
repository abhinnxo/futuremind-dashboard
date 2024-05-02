'use client';

import Table from '@/components/Table';
import SearchBar from '@/components/SearchBar';
import Toggle from '@/components/Toggle';
import TopBar from '@/components/TopBar';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';

const query = gql`
  {
    getMandates {
      data {
        bankAccountNumber
        bankBranch
        bankName
        amount
        clientcode
        clientName
        mandateStatus
        startDate
        endDate
        UMRN
        approvedDate
        registrationDate
      }
    }
  }
`;

const columnDef = [
  {
    accessorFn: (row) => row.clientName,
    header: 'Client Name',
  },
  {
    accessorFn: (row) => row.clientcode,
    header: 'Client Code',
  },
  {
    accessorFn: (row) => row.startDate,
    header: 'Start Date',
  },
  {
    accessorFn: (row) => row.endDate,
    header: 'End Date',
  },
  {
    accessorFn: (row) => row.amount,
    header: 'Amount',
  },
  {
    accessorFn: (row) => row.mandateStatus,
    header: 'Mandate Status',
    cell: (props) => <Badge type="normal" text={props.getValue()} />,
  },
  {
    accessorFn: (row) => row.approvedDate,
    header: 'Approved Date',
  },
  {
    accessorFn: (row) => row.registrationDate,
    header: 'Registration Date',
  },
  {
    accessorFn: (row) => [row.bankName, row.bankAccountNumber, row.bankBranch],
    header: 'Bank',
    cell: (props) => (
      <Modal
        comp={<span className="text-blue-600 underline">Show Details</span>}
        heading="Bank Details"
        body={
          <>
            <div>
              <strong>Name:</strong> {props.getValue()?.[0]}
            </div>
            <div>
              <strong>A/C No.:</strong> {props.getValue()?.[1]}
            </div>
            <div>
              <strong>Branch Name:</strong> {props.getValue()?.[2]}
            </div>
          </>
        }
      />
    ),
  },
  {
    accessorFn: (row) => row.UMRN,
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
  if (data.getMandates) {
    return (
      <>
        <TopBar heading="SIP Mandate">
          <Toggle text="Show All" />
          <SearchBar text="Search" placeholder="Search Client Name" />
        </TopBar>
        <Table
          dataJSON={data.getMandates.data}
          columnDef={columnDef}
          customClasses={'h-[900px]'}
        />
      </>
    );
  }
  return <div>Loading....</div>;
}
