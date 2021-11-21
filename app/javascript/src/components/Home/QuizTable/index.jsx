/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";

import classNames from "classnames";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTable } from "react-table";

import DeleteQuiz from "./Buttons/DeleteQuiz";
import EditNameButton from "./Buttons/EditName";

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

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });
  const history = useHistory();

  const handleQuizClick = row => {
    history.push(`/quiz/${row.original.id}`);
  };
  return (
    <div className="py-6 px-4 shadow-xl  rounded-lg w-full">
      <table {...getTableProps()} className="py-20 rounded-lg w-full ">
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const rowClass = classNames({
              "h-12 cursor-pointer hover:bg-gray-100 py-2": true,
              "border-b border-gray-100": i !== rows.length - 1,
            });
            return (
              <tr
                {...row.getRowProps()}
                className={rowClass}
                onClick={() => {
                  handleQuizClick(row);
                }}
              >
                {row.cells.map((cell, j) => {
                  const cellClass = classNames({
                    "font-medium align-middle px-4 ": true,
                    "text-right w-24": j > 0,
                    " text-lg": j === 0,
                  });
                  return (
                    <td {...cell.getCellProps()} className={cellClass}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
QuizTable.propTypes = {
  tableData: PropTypes.array.isRequired,
};

export default QuizTable;
