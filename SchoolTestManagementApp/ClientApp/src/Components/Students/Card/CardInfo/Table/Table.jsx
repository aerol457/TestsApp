import React from "react";
import { useSelector } from "react-redux";
import { GiCancel } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";

import "./Table.css";

import Spinner from "../../../../Core/Spinner/Spinner";

const Table = () => {
  const tests = useSelector((state) => state.student.tests);
  const loading = useSelector((state) => state.student.loading);

  return (
    <div className="table">
      {loading ? (
        <span className="table-spinner">
          <Spinner />
        </span>
      ) : tests.length == 0 ? (
        <p className="table-tests-empty">No tests have been found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Profession</th>
              <th>Teacher</th>
              <th>Date Of Distribution</th>
              <th>Date Of Submission</th>
              <th>Grade</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
                <td>{test.name}</td>
                <td>{test.professionName}</td>
                <td>{test.idUserNavigation.name}</td>
                <td>
                  {
                    test.dateOfDistribution
                      .toString()
                      .replaceAll("-", "/")
                      .split("T")[0]
                  }
                </td>
                <td>
                  {
                    test.dateOfSubmission
                      .toString()
                      .replaceAll("-", "/")
                      .split("T")[0]
                  }
                </td>
                <td>{test.studentTest[0].grade}</td>
                <td>
                  {test.studentTest[0].isDone ? (
                    <FaRegCheckCircle className="isDone-check" />
                  ) : (
                    <GiCancel className="isDone-false" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
