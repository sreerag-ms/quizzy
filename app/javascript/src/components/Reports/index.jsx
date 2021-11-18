import React, { useEffect, useState } from "react";

import attemptApi from "apis/attempt";

import Table from "./Table";

import Wrapper from "../Common/Wrapper";

const Reports = () => {
  const [attempts, setAttempts] = useState([]);

  const fetchData = async () => {
    const { data } = await attemptApi.all();
    const formatedData = data.map(attempt => ({
      ...attempt,
      user_name: `${attempt.first_name} ${attempt.last_name}`,
    }));
    setAttempts(formatedData);
    logger.info(attempts);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Name",
        accessor: "user_name",
      },
      {
        Header: "Correct Answers",
        accessor: "correct_answers",
      },
      {
        Header: "Incorrect Answers",
        accessor: "incorrect_answers",
      },
    ],
    []
  );

  return (
    <Wrapper>
      <div className="flex flex-row my-6">
        <div className="font-bold text-2xl">Reports</div>
      </div>
      <div className="w-full">
        <Table columns={columns} data={attempts} />
      </div>
    </Wrapper>
  );
};

export default Reports;
