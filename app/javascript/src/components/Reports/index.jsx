import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { saveAs } from "file-saver";
import { isEmpty } from "ramda";

import attemptApi from "apis/attempt";
import reportsApi from "apis/reports";
import TitleBar from "components/Common/TitleBar";
import Wrapper from "components/Common/Wrapper";

import Table from "./Table";

import { AddButton } from "../Common/Buttons";

const Reports = () => {
  const [attempts, setAttempts] = useState([]);
  const [requested, setRequested] = useState(false);
  const [fileBlob, setFileBlob] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data } = await attemptApi.all();
      const formatedData = data.map(attempt => ({
        quiz_name: attempt.quiz.name,
        email: attempt.user.email,
        correct_answers: attempt.correct_answers_count,
        incorrect_answers: attempt.incorrect_answers_count,
        user_name: `${attempt.user?.first_name ?? ""} ${
          attempt.user?.last_name ?? ""
        }`,
      }));
      setAttempts(formatedData);
      logger.info(attempts);
    } catch (error) {
      logger.info(error);
    }
    setLoading(false);
  };

  const generateReport = async () => {
    try {
      const { data } = await reportsApi.generate();
      waitForFile(data.file_name);
    } catch (e) {
      logger.error(e);
    }
    setRequested(true);
  };

  const waitForFile = async file => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await reportsApi.download(file);
        if (response.status != 204) {
          setFileBlob(response.data);
          clearInterval(pollInterval);
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
      setRequested(false);
      setFileBlob({});
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

  if (loading) {
    return (
      <Wrapper>
        <div className="h-full">
          <PageLoader />
        </div>
      </Wrapper>
    );
  }

  if (requested && isEmpty(fileBlob)) {
    return (
      <Wrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <PageLoader text="Your file is getting ready." />
        </div>
      </Wrapper>
    );
  }

  if (!isEmpty(fileBlob)) {
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
      <TitleBar title="Reports">
        <AddButton handleClick={generateReport}>
          Download
          <Download size="15" className="ml-2" />
        </AddButton>
      </TitleBar>
      <div className="w-full mb-10">
        <Table columns={columns} data={attempts} />
      </div>
    </Wrapper>
  );
};

export default Reports;
