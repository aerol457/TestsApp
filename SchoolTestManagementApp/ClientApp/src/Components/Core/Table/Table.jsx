import React from "react";
import { useSelector } from "react-redux";

import "./Table.css";

import Spinner from "../Spinner/Spinner";

const Table = () => {
  const tests = useSelector((state) => state.student.tests);
  const loading = useSelector((state) => state.student.loading);

  return (
    <div className="table">
      {loading ? (
        <p style={{ color: "white" }}>
          <Spinner />
        </p>
      ) : tests.length == 0 ? (
        <p style={{ fontSize: "25px", color: "white" }}>
          No tests have been found.
        </p>
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
            {tests.map((test, index) => {
              const dateDistributeFormatter = test.idTestNavigation.dateOfDistribution
                .toString()
                .replaceAll("-", "/")
                .split("T")[0];
              const dateSubmittedFormatter = test.idTestNavigation.dateOfSubmission
                .toString()
                .replaceAll("-", "/")
                .split("T")[0];
              return (
                <tr key={index}>
                  <td>{test.idTestNavigation.name}</td>
                  <td>{test.idTestNavigation.professionName}</td>
                  <td>{test.idTestNavigation.idTeacherNavigation.name}</td>
                  <td style={{ width: "15%" }}>{dateDistributeFormatter}</td>
                  <td style={{ width: "15%" }}>{dateSubmittedFormatter}</td>
                  <td style={{ width: "10%" }}>{test.grade}</td>
                  <td>{test.isDone.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
