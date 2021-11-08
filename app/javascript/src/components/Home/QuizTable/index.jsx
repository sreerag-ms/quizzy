import React, { useMemo } from "react";

import PropTypes from "prop-types";
import { useTable } from "react-table";

import DeleteQuiz from "./DeleteQuizButton";
import EditNameButton from "./EditNameButton";

const QuizTable = ({
  tableData: data,
  setSelectedQuiz,
  setShowQuizNameModal,
  setShowDeletePrompt,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        width: "100%",
      },
      {
        Header: "",
        accessor: "edit",
        Cell: ({ row }) => {
          return (
            <EditNameButton
              setSelectedQuiz={setSelectedQuiz}
              setShowQuizNameModal={setShowQuizNameModal}
              quiz={{ name: row.original.name, id: row.original.id }}
            />
          );
        },
      },
      {
        Header: "",
        accessor: "delete",
        Cell: ({ row }) => {
          return (
            <DeleteQuiz
              setSelectedQuiz={setSelectedQuiz}
              quiz={{ name: row.original.name, id: row.original.id }}
              setShowDeletePrompt={setShowDeletePrompt}
            />
          );
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <table {...getTableProps()}>
      <thead className="h-6">
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i.toString()}>
            {headerGroup.headers.map((column, j) => (
              <th
                {...column.getHeaderProps()}
                key={j.toString()}
                className="text-left"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={i.toString() + "row"}
              className="h-10 py-2"
            >
              {row.cells.map((cell, j) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={j.toString() + "cell"}
                    className="font-medium"
                  >
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
QuizTable.propTypes = {
  tableData: PropTypes.array.isRequired,
};

export default QuizTable;
