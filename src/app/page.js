// export default function Home() {
//   return (
//     <>
//       <h1>Dashboard</h1>
//     </>
//   );
// }

'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

// const people = [
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     name1: 'Lindsay Walton',
//     title1: 'Front-end Developer',
//     email1: 'lindsay.walton@example.com',
//     role1: 'Member',
//   },
//   // More people...
// ];

const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
];

export default function Example() {
  const [data] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        scope="col"
                        className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ${index === 0 ? 'sm:pl-6 lg:pl-8' : ''}`}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
                {/* <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                </tr> */}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr className="even:bg-gray-50" key={row.id}>
                    {row.getVisibleCells().map((cell, index) => (
                      <td
                        className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 ${index === 0 ? 'sm:pl-6 lg:pl-8' : ''}`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* {people.map((person) => (
                  <tr key={person.email} className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 lg:pl-8">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.role}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {person.name1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.title1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.email1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.role1}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
