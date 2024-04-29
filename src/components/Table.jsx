'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { ArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline';
import Badge from './Badge';

const Table = ({
  dataJSON,
  columnDef,
  enableSorting,
  customClasses,
  rowsToShow,
  filterWord,
  toggleState,
  selectedOption,
  route,
}) => {
  const finalData = useMemo(() => dataJSON, [dataJSON]);
  const finalColumnDef = useMemo(() => columnDef, [columnDef]);

  const [sorting, setSorting] = useState([]);
  const [visibleRows, setVisibleRows] = useState(rowsToShow || 15);

  const emailColumnIndex = finalColumnDef.findIndex(
    (column) => column.accessorKey === 'application.email',
  );
  const currStepColumnIndex = finalColumnDef.findIndex(
    (column) => column.accessorKey === 'application.currentStep',
  );
  const kycVerifiedColumnIndex = finalColumnDef.findIndex(
    (column) => column.accessorKey === 'application.kycVerified',
  );
  const planColumnIndex = finalColumnDef.findIndex(
    (column) => column.accessorKey === 'application.plan',
  );

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const tableRef = useRef(null);

  // Function to handle scroll event
  const handleScroll = () => {
    const table = tableRef.current;
    if (table) {
      const bottom =
        Math.ceil(table.scrollTop + table.clientHeight) >= table.scrollHeight;
      if (bottom) {
        setVisibleRows((prevVisibleRows) => prevVisibleRows + 10); // Increase the number of visible rows by 10
      }
    }
  };

  // Effect to attach scroll event listener to the table
  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      table.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (table) {
        table.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  let filter = '';

  // Route based filters
  if (route === 'users') {
    filter = tableInstance
      .getRowModel()
      .rows.slice(0, visibleRows)
      .filter((rowEl) => {
        const panCardNumber =
          rowEl.original &&
          rowEl.original.pancard &&
          rowEl.original.pancard.panCardNumber;

        return (
          (!filterWord ||
            (panCardNumber &&
              panCardNumber
                .toUpperCase()
                .includes(filterWord.toUpperCase()))) &&
          (!toggleState || (rowEl.original && rowEl.original.active))
        );
      });
  } else if (route === 'recommended_funds') {
    if (selectedOption === 'Show All') {
      filter = tableInstance.getRowModel().rows.slice(0, visibleRows);
    } else {
      filter = tableInstance
        .getRowModel()
        .rows.slice(0, visibleRows)
        .filter((rowEl) => {
          const filterRows = rowEl.original && rowEl.original.category;
          return filterRows.includes(selectedOption.toUpperCase());
        });
    }
  } else if (route === 'subscriptions') {
    filter = tableInstance
      .getRowModel()
      .rows.slice(0, visibleRows)
      .filter((rowEl) => {
        const filterRows = rowEl.original && rowEl.original.name;

        return (
          filterRows &&
          filterRows.toUpperCase().includes(filterWord.toUpperCase())
        );
      });
  } else if (route === 'investments') {
    if (toggleState) {
      filter = tableInstance
        .getRowModel()
        .rows.slice(0, visibleRows)
        .filter((rowEl) => {
          const filterRows = rowEl.original && rowEl.original.schemeName;
          const status = rowEl.original && rowEl.original.status;
          return (
            status === 'ACTIVE' && // Only show rows with 'ACTIVE' status
            filterRows &&
            filterRows.toUpperCase().includes(filterWord.toUpperCase())
          );
        });
    } else {
      filter = tableInstance
        .getRowModel()
        .rows.slice(0, visibleRows)
        .filter((rowEl) => {
          const filterRows = rowEl.original && rowEl.original.schemeName;
          return (
            filterRows &&
            filterRows.toUpperCase().includes(filterWord.toUpperCase())
          );
        });
    }
  } else filter = tableInstance.getRowModel().rows.slice(0, visibleRows);

  return (
    <div
      className={`${customClasses} bg-white border p-2 rounded-md overflow-y-auto`}
      ref={tableRef}
    >
      <div>
        <table className="w-full table-auto">
          <thead>
            {tableInstance.getHeaderGroups().map((headerEl) => {
              return (
                <tr key={headerEl.id}>
                  {headerEl.headers.map((columnEl) => {
                    return (
                      <th
                        key={columnEl.id}
                        colSpan={columnEl.colSpan}
                        onClick={
                          enableSorting
                            ? () => columnEl.column.toggleSorting()
                            : undefined
                        }
                        className="font-semibold text-nowrap px-4 py-2 text-md cursor-pointer hover:bg-secondary-300"
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext(),
                          )}
                          {enableSorting &&
                            {
                              asc: <ArrowDownIcon width="18px" />,
                              desc: <ArrowUpIcon width="18px" />,
                            }[columnEl.column.getIsSorted() ?? null]}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {filter.map((rowEl) => {
              return (
                <tr
                  key={rowEl.id}
                  className="border-b-2 hover:bg-btn-selected text-nowrap"
                >
                  {rowEl.getVisibleCells().map((cellEl, index) => {
                    const isEmailColumn = index === emailColumnIndex;
                    const isCurrStepColumn = index === currStepColumnIndex;
                    const isKycVerifiedColumn =
                      index === kycVerifiedColumnIndex;
                    const isPlanColumn = index === planColumnIndex;

                    // Conditionally render the Badge component
                    const badgeText = flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext(),
                    );

                    if (isEmailColumn) {
                      return (
                        <td key={cellEl.id} className="p-2 text-blue-500">
                          {flexRender(
                            cellEl.column.columnDef.cell,
                            cellEl.getContext(),
                          )}
                        </td>
                      );
                    }

                    if (isCurrStepColumn) {
                      if (cellEl.getValue()) {
                        return (
                          <td key={cellEl.id} className="p-2 text-blue-500">
                            <Badge text={badgeText} type="primary" />
                          </td>
                        );
                      }
                    }

                    if (isPlanColumn) {
                      if (cellEl.getValue()) {
                        return (
                          <td key={cellEl.id} className="p-2 text-blue-500">
                            <Badge text={badgeText} type="primary" />
                          </td>
                        );
                      }
                    }

                    if (isKycVerifiedColumn) {
                      if (cellEl.getValue()) {
                        return (
                          <td key={cellEl.id} className="p-2 text-blue-700">
                            <CheckIcon width="22px" />
                          </td>
                        );
                      }
                    }

                    return (
                      <td key={cellEl.id} className="p-2">
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
