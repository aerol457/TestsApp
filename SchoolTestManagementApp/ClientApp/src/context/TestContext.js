import React, { useEffect, useState } from "react";

export const TestContext = React.createContext({
  questions: [],
  initQuestions: () => {},
});

const TestContextProvider = (props) => {
  const [questions, setQuestions] = useState([]);

  const handleInitQuestions = (questionsTest) => {
    setQuestions(questionsTest);
  };

  return (
    <TestContext.Provider
      value={{
        questions,
        initQuestions: handleInitQuestions,
      }}
    >
      {props.children}
    </TestContext.Provider>
  );
};

export default TestContextProvider;
