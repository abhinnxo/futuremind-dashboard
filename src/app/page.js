'use client';

import Table from '@/components/Table';
import LineChart from '@/components/LineChart';
import TopBar from '@/components/TopBar';
import fetchClientData from '@/services/getData';
import { useQuery } from '@tanstack/react-query';

const query = `
    query {
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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'application.currentStep',
    header: 'Current Step',
  },

  {
    accessorKey: 'application.mandate.type',
    header: 'Mandate',
  },
  {
    accessorKey: 'pancard.panCardNumber',
    header: 'PAN Card Number',
  },
  {
    accessorKey: 'application.plan',
    header: 'Plan',
  },

  {
    accessorKey: 'application.email',
    header: 'Email',
  },
  {
    accessorKey: 'application.mobile',
    header: 'Mobile',
  },
  {
    accessorKey: 'application.kycVerified',
    header: 'KYC Verified',
  },
  {
    accessorKey: 'application.bank.verified',
    header: 'Bank Verified',
  },
  {
    accessorKey: 'application.completed',
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
                  accessorKey: 'application.currentStep',
                  header: 'Current Step',
                },
                {
                  accessorKey: '',
                  header: 'Users',
                },
              ]}
              customClasses="h-[366px]"
              route="dashboard"
            />
          </div>
        </div>
        <div className="md:h-2/3 md:mt-24">
          <Table
            dataJSON={data.getUsers.data}
            columnDef={columnDef}
            enableSorting={true}
            customClasses="h-[650px]"
            route="dashboard"
          />
        </div>
      </div>
    </div>
  );
}
