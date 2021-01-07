import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";
import { IState, IQuestionProps, ITestResult } from "../../interface/interface";
import { closeResult, endTest, getResult, nextQuestion, prevQuestion } from "../../redux/slice";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import s from "./Footer.module.scss";

const Footer = () => {
  const currentQuestion = useSelector<IState, number>(
    (state) => state.toolkit.currentQuestion
  );
  const questions = useSelector<IState, IQuestionProps[]>(
    (state) => state.toolkit.questions
  );
  const testAnswers = useSelector<IState, ITestResult>(
    (state) => state.toolkit.testAnswers
  );
  const isResult = useSelector<IState, boolean>(
    (state) => state.toolkit.isResult
  );
  const dispatch = useDispatch();

  const changeQuestionClick = (e: React.MouseEvent<HTMLElement>) => {
    if (currentQuestion > -1) {
      (e.target as HTMLElement).id === "prev" &&
        currentQuestion > 0 &&
        dispatch(prevQuestion());
      (e.target as HTMLElement).id === "next" &&
        currentQuestion < questions.length - 1 &&
        dispatch(nextQuestion());
    }
  };

  const closeTest = (e: React.MouseEvent<HTMLElement>) => {
    const currentUser = AuthService.getCurrentUser();

    UserService.refreshToken(currentUser.token.refresh)
      .then((response) => {
        if (response.data.access) {
          const user = {
            ...currentUser,
            token: response.data,
          };
          localStorage.setItem("user", JSON.stringify(user));
        }
        UserService.sendAnswers(
          testAnswers.id,
          testAnswers.simpletestresult
        ).then((response) => {
          dispatch(endTest());
          dispatch(getResult(response.data.SimpleTest.questions));
        });
      })
      .catch(() => toast.error("Ошибка сохранения теста", toastOptions));
  };

  const closeTestResult = (e: React.MouseEvent<HTMLElement>) => {
    const currentUser = AuthService.getCurrentUser();
    dispatch(closeResult());
  };

  return (
    <div className={s.footer}>
      <h3>
        <span className={s.leftstr} id="prev" onClick={changeQuestionClick}>
          {"<<"}
        </span>
        {isResult ? (
          <span className={s.centerstr} onClick={closeTestResult}>
            Завершить просмотр
          </span>
        ) : (
          <span className={s.centerstr} onClick={closeTest}>
            Завершить тест
          </span>
        )}
        <span className={s.rightstr} id="next" onClick={changeQuestionClick}>
          {">>"}
        </span>
      </h3>
    </div>
  );
};

export default Footer;
