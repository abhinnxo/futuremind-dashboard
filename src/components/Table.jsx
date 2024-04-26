'use client';

import React, { useMemo, useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const Table = ({ dataJSON, columnDef, enableSorting }) => {
  const finalData = useMemo(() => dataJSON, [dataJSON]);
  const finalColumnDef = useMemo(() => columnDef, [columnDef]);

  const [sorting, setSorting] = useState([]);

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

  return (
    <div className="bg-white border p-2 rounded-md">
      <div className="overflow-x-scroll">
        <table className="w-full">
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
                        className="font-semibold text-nowrap p-2 text-md cursor-pointer hover:bg-btn-selected"
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext(),
                          )}
                          {enableSorting &&
                            {
                              asc: (
                                <ArrowDownIcon className="py-1" width="22px" />
                              ),
                              desc: (
                                <ArrowUpIcon className="py-1" width="22px" />
                              ),
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
            {tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                <tr
                  key={rowEl.id}
                  className="border-b-2 py-4 hover:bg-btn-selected text-nowrap"
                >
                  {rowEl.getVisibleCells().map((cellEl) => {
                    return (
                      <td key={cellEl.id} className="py-2">
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
