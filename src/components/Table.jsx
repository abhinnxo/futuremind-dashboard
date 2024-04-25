'use client';

import React, { useMemo } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  useResizeColumns,
} from '@tanstack/react-table';

const Table = ({ dataJSON, columnDef }) => {
  const finalData = useMemo(() => dataJSON, [dataJSON]);
  const finalColumnDef = useMemo(() => columnDef, [columnDef]);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    useResizeColumns,
  });

  return (
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
                    className="font-semibold text-md cursor-pointer hover:bg-btn-selected"
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
            <tr key={rowEl.id} className="border-b-2 hover:bg-btn-selected">
              {rowEl.getVisibleCells().map((cellEl) => {
                return (
                  <td key={cellEl.id}>
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
  );
};

export default Table;
