'use client';

import React, { useMemo, useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  useResizeColumns,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const Table = ({ dataJSON, columnDef, enablePagination, enableSorting }) => {
  const finalData = useMemo(() => dataJSON, [dataJSON]);
  const finalColumnDef = useMemo(() => columnDef, [columnDef]);

  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    useResizeColumns,
    getPaginationRowModel: getPaginationRowModel(),
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
      {enablePagination && (
        <div className="flex justify-center gap-2 mt-2">
          <button
            className={`font-bold border py-1 px-2 rounded-sm hover:bg-nav-hover ${tableInstance.getCanPreviousPage() ? '' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => tableInstance.setPageIndex(0)}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            &lt;&lt;
          </button>
          <button
            className={`font-bold border py-1 px-2 rounded-sm hover:bg-nav-hover ${tableInstance.getCanPreviousPage() ? '' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            &lt;
          </button>
          <span className="border px-2 py-1">
            {tableInstance.options.state.pagination.pageIndex + 1}
          </span>
          <button
            className={`font-bold border py-1 px-2 rounded-sm hover:bg-nav-hover ${tableInstance.getCanNextPage() ? '' : 'opacity-30 cursor-not-allowed'}`}
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          >
            &gt;
          </button>
          <button
            className={`font-bold border py-1 px-2 rounded-sm hover:bg-nav-hover ${tableInstance.getCanNextPage() ? '' : 'opacity-30 cursor-not-allowed'}`}
            onClick={() =>
              tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
            }
            disabled={!tableInstance.getCanNextPage()}
          >
            &gt;&gt;
          </button>
          <select
            value={tableInstance.options.state.pagination.pageSize}
            onChange={(e) => tableInstance.setPageSize(e.target.value)}
            className="border rounded-sm"
          >
            {[10, 25, 50].map((pageSizeEl) => {
              return (
                <option key={pageSizeEl} value={pageSizeEl}>
                  {pageSizeEl}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default Table;
