'use client';

import React, { useMemo } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  useResizeColumns,
  getPaginationRowModel,
} from '@tanstack/react-table';

const Table = ({ dataJSON, columnDef }) => {
  const finalData = useMemo(() => dataJSON, [dataJSON]);
  const finalColumnDef = useMemo(() => columnDef, [columnDef]);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    useResizeColumns,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="overflow-x-scroll">
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
                        className="font-semibold text-nowrap	 text-md cursor-pointer hover:bg-btn-selected"
                      >
                        {flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext(),
                        )}
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
    </div>
  );
};

export default Table;
