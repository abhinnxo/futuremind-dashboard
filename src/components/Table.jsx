'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  const [visibleRows, setVisibleRows] = useState(15);

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

  return (
    <div
      className="bg-white border p-2 rounded-md"
      style={{ height: '500px', overflowY: 'auto' }}
      ref={tableRef}
    >
      <div>
        <table>
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
            {tableInstance
              .getRowModel()
              .rows.slice(0, visibleRows)
              .map((rowEl) => {
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
