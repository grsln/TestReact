import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "../../interface/interface";
import Question from "../../components/Question";
import Footer from "../../components/Footer/Footer";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import s from "./TestPage.module.scss";
import {
  answerQuestion,
  endLoading,
  getQuestions,
  getTestInfo,
  startLoading,
  startTest,
} from "../../redux/slice";
import { navigate } from "hookrouter";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";

const TestPage: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) navigate("login");

  const testState = useSelector<IState, IState["toolkit"]>(
    (state) => state.toolkit
  );

  // const questions = useSelector<IState, QuestionProps[]>(
  //   (state) => state.toolkit.questions
  // );
  // const testStarted = useSelector<IState, boolean>(
  //   (state) => state.toolkit.testStarted
  // );
  // const isLoading = useSelector<IState, boolean>(
  //   (state) => state.toolkit.isLoading
  // );
  // const isResult = useSelector<IState, boolean>(
  //   (state) => state.toolkit.isResult
  // );

  // const currentQuestion = useSelector<IState, number>(
  //   (state) => state.toolkit.currentQuestion
  // );

  // const isError = useSelector<IState, boolean>(
  //   (state) => state.toolkit.isError
  // );
  // const errorMessage = useSelector<IState, string>(
  //   (state) => state.toolkit.errorMessage
  // );

  const dispatch = useDispatch();

  const handleAnswerClick = (e: React.MouseEvent<HTMLElement>) => {
    if (testState.currentQuestion > -1 && !testState.isResult) {
      const currentAnswer = +(e.target as HTMLElement).id;
      if (testState.currentQuestion > -1) {
        testState.questions[testState.currentQuestion].selectedAnswer ===
        currentAnswer
          ? dispatch(answerQuestion(-1))
          : dispatch(answerQuestion(currentAnswer));
      }
    }
  };

  const startTestClick = (e: React.MouseEvent<HTMLElement>) => {
    if (currentUser && !testState.isLoading) {
      dispatch(startLoading());
      UserService.refreshToken(currentUser.token.refresh)
        .then((response) => {
          if (response.data.access) {
            const user = {
              ...currentUser,
              token: response.data,
            };
            localStorage.setItem("user", JSON.stringify(user));
          }

          UserService.createTest()
            .then((response) => {
              dispatch(getQuestions(response.data.SimpleTest.questions));
              dispatch(
                getTestInfo({
                  id: response.data.SimpleTest.id,
                  simpletestresult: response.data.SimpleTest.simpletestresult,
                })
              );
              dispatch(startTest());
            })
            .finally(() => dispatch(endLoading()));
        })
        .catch((error) => {
          if (error.response?.status === 401) AuthService.logout();
          dispatch(endLoading());
          toast.error("Ошибка создания теста", toastOptions);
        });
    }
  };

  return (
    <>
      {testState.testStarted || testState.isResult ? (
        <div className={s.root}>
          {!(testState.currentQuestion === -1) ? (
            <div className={s.main}>
              <label className={s.label}>{testState.currentQuestion+1}/{testState.questions.length}</label>
              <Question
                id={testState.questions[testState.currentQuestion].id}
                question={
                  testState.questions[testState.currentQuestion].question
                }
              />
              <div>
                {testState.questions[testState.currentQuestion].answers?.map(
                  (answer) => (
                    <h2
                      className={cn(
                        s.answer,
                        testState.testStarted &&
                          answer.id ===
                            testState.questions[testState.currentQuestion]
                              .selectedAnswer &&
                          s.selectedAnswer,
                        testState.isResult &&
                          answer.id ===
                            testState.questions[testState.currentQuestion][
                              "right_answer"
                            ] &&
                          s.rightAnswer,
                        testState.isResult &&
                          answer.id ===
                            testState.questions[testState.currentQuestion]
                              .selectedAnswer &&
                          answer.id !==
                            testState.questions[testState.currentQuestion][
                              "right_answer"
                            ] &&
                          s.wrongAnswer
                      )}
                      key={answer.id}
                      id={answer.id.toString()}
                      onClick={handleAnswerClick}
                    >
                      {answer.answer}
                    </h2>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {testState.isLoading ? <Loader /> : <h2>В тесте нет вопросов</h2>}
            </>
          )}
          <Footer />
        </div>
      ) : (
        <div className={s.main}>
          <button className={s.buttonTest} onClick={startTestClick}>
            ТЕСТ
          </button>
          {testState.isLoading && <Loader />}
        </div>
      )}
    </>
  );
};

export default TestPage;
