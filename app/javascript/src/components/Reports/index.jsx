import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { saveAs } from "file-saver";

import attemptApi from "apis/attempt";
import reportsApi from "apis/reports";

import Table from "./Table";

import Wrapper from "../Common/Wrapper";

const Reports = () => {
  const [attempts, setAttempts] = useState([]);
  const [requested, setRequested] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [fileBlob, setFileBlob] = useState({});
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
      setRequested(true);
      waitForFile(data.file_name);
    } catch (e) {
      logger.error(e);
    }
  };

  const waitForFile = async file => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await reportsApi.download(file);
        if (response.status != 204) {
          setFileBlob(response.data);
          setFileReady(true);
          clearInterval(pollInterval);
          setFileReady(true);
        } else {
          logger.info(response);
        }
      } catch (e) {
        logger.error(e);
        clearInterval(pollInterval);
      }
    }, 1000);
  };

  const downloadFile = async () => {
    try {
      saveAs(fileBlob, `Reports.xlsx`);
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

  if (requested && !fileReady) {
    return (
      <Wrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <PageLoader text="Your file is getting ready." />
        </div>
      </Wrapper>
    );
  }

  if (fileReady) {
    return (
      <Wrapper>
        <div className="flex flex-col h-full items-center justify-center">
          <button
            className="flex flex-row px-6 py-3 bg-gray-200 rounded-md mb-10 font-semibold"
            onClick={downloadFile}
          >
            Save File <Download size="15" className="ml-2" />
          </button>
        </div>
      </Wrapper>
    );
  }

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
        {fileReady && <button onClick={downloadFile}>Clock to download</button>}
      </div>
      <div className="w-full mb-10">
        <Table columns={columns} data={attempts} />
      </div>
    </Wrapper>
  );
};

export default Reports;
