/* eslint-disable react/jsx-key */
import React from "react";

import { Up, Down } from "@bigbinary/neeto-icons";
import PropTypes from "prop-types";
import { useTable, useSortBy } from "react-table";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="text-left h-10 px-6 py-2 font-semibold bg-gray-500 select-none"
              >
                {column.render("Header")}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <span className="w-6">
                      <Down size="20" className="float-right" />
                    </span>
                  ) : (
                    <span className="w-6">
                      <Up size="20" className="float-right" />
                    </span>
                  )
                ) : (
                  <span className="w-5 float-right" />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="bg-gray-200 px-4">
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} className="px-6 py-4 border-b">
                    {cell.render("Cell")}
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
Table.PropTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
