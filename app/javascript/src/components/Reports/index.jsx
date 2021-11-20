import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";

import attemptApi from "apis/attempt";
import reportsApi from "apis/reports";

import Table from "./Table";

import Wrapper from "../Common/Wrapper";

const Reports = () => {
  const [attempts, setAttempts] = useState([]);
  // const [fileUrl, setFileUrl] = useState("");
  const fetchData = async () => {
    const { data } = await attemptApi.all();
    const formatedData = data.map(attempt => ({
      ...attempt,
      user_name: `${attempt.first_name} ${attempt.last_name}`,
    }));
    setAttempts(formatedData);
    logger.info(attempts);
  };

  const generateReport = async () => {
    try {
      const { data } = await reportsApi.generate();
      logger.info(data);
    } catch (e) {
      logger.error(e);
    }
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
      <div className="flex flex-row my-6 justify-between items-center">
        <div className="font-bold text-2xl">Reports</div>
        <button
          className="flex items-center px-5 py-3 bg-gray-200 rounded-lg font-semibold"
          onClick={generateReport}
        >
          Download
          <Download size="15" className="ml-2" />
        </button>
      </div>
      <div className="w-full mb-10">
        <Table columns={columns} data={attempts} />
      </div>
    </Wrapper>
  );
};

export default Reports;
