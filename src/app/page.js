'use client';

import Table from '@/components/Table';
import LineChart from '@/components/LineChart';
import TopBar from '@/components/TopBar';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import Badge from '@/components/Badge';
import { CheckIcon } from '@heroicons/react/24/outline';

const query = gql`
  {
    getUsers {
      data {
        name
        pancard {
          panCardNumber
        }
        application {
          email
          mobile
          kycVerified
          bank {
            verified
          }
          completed
          currentStep
          mandate {
            type
          }
          plan
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
    accessorFn: (row) => row.application?.currentStep,
    header: 'Current Step',
    cell: (props) =>
      props.getValue() ? <Badge text={props.getValue()} type="normal" /> : '',
  },
  {
    accessorFn: (row) => row.application?.mandate?.type,
    header: 'Mandate',
  },
  {
    accessorFn: (row) => row.pancard?.panCardNumber,
    header: 'PAN Card Number',
  },
  {
    accessorFn: (row) => row.application?.plan,
    header: 'Plan',
    cell: (props) => <Badge text={props.getValue()} type={props.getValue()} />,
  },
  {
    accessorFn: (row) => row.application?.email,
    header: 'Email',
  },
  {
    accessorFn: (row) => row.application?.mobile,
    header: 'Mobile',
  },
  {
    accessorFn: (row) => row.application?.kycVerified,
    header: 'KYC Verified',
    cell: (props) =>
      props.getValue() ? (
        <CheckIcon className="text-blue-600" width={30} />
      ) : (
        ''
      ),
  },
  {
    accessorFn: (row) => row.application?.bank?.verified,
    header: 'Bank Verified',
  },
  {
    accessorFn: (row) => row.application?.completed,
    header: 'Completed',
  },
];

export default function Home() {
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
      <div className="flex flex-col md:h-screen">
        <TopBar heading="Dashboard" />
        <div className="flex flex-col gap-2">
          <div className="md:flex h-1/4 gap-2">
            <div className="w-full md:w-3/4">
              <LineChart />
            </div>
            <div className="w-full md:w-1/3">
              <Table
                dataJSON={data.getUsers.data}
                columnDef={[
                  {
                    accessorFn: (row) => row.application?.currentStep,
                    header: 'Current Step',
                    cell: (props) =>
                      props.getValue() ? (
                        <Badge text={props.getValue()} type="normal" />
                      ) : (
                        ''
                      ),
                  },
                  {
                    accessorKey: '',
                    header: 'Users',
                  },
                ]}
                customClasses="h-[366px]"
              />
            </div>
          </div>
          <div className="md:h-2/3 md:mt-24">
            <Table
              dataJSON={data.getUsers.data}
              columnDef={columnDef}
              customClasses="h-[650px]"
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading....</div>;
}
