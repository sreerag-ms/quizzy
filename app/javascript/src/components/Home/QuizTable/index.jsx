import React, { useMemo } from "react";

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
    logger.info("QuizTable.handleQuizClick", row);
    history.push(`/my_quiz/${row.original.id}`);
  };
  return (
    <div className="py-6 px-4 shadow-xl  rounded-lg w-full">
      <table {...getTableProps()} className="py-20 rounded-lg w-full ">
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={i.toString() + "row"}
                className={`h-12 cursor-pointer hover:bg-gray-100`}
                onClick={() => {
                  handleQuizClick(row);
                }}
              >
                {row.cells.map((cell, j) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={j.toString() + "cell"}
                      className={`font-medium align-middle px-4 ${
                        j > 0 ? "text-right w-24" : "text-lg"
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {/* </button> */}
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
