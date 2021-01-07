import { createSlice } from "@reduxjs/toolkit";
import { IQuestionProps } from "../interface/interface";
import authService from "../services/auth.service";

const toolkitSlice = createSlice({
  name: "toolkit",
  initialState: {
    isAuth: <boolean>authService.getCurrentUser() === true,
    currentQuestion: -1,
    questions: <IQuestionProps[]>[],
    testStarted: false,
    isLoading: false,
    isResult: false,
    testAnswers: {
      id: 0,
      simpletestresult: [
        {
          id: 0,
          answered_id: 0,
          question: 0,
        },
      ],
    },
  },
  reducers: {
    nextQuestion(state) {
      state.currentQuestion += 1;
    },
    prevQuestion(state) {
      state.currentQuestion -= 1;
    },
    getQuestions(state, action) {
      state.questions = action.payload;

      if (state.questions.length > 0) {
        state.currentQuestion = 0;
        state.questions.map((item) => (item.selectedAnswer = -1));
      } else state.currentQuestion = -1;
    },
    getResult(state, action) {
      const questionsArr: IQuestionProps[] = action.payload;
      if (state.questions.length > 0) {
        state.currentQuestion = 0;
        state.questions.map((item) => {
          const questionItem = questionsArr.find(({ id }) => id === item.id);
          item.right_answer =
            questionItem ? questionItem.right_answer : 0;
        });
      } else state.currentQuestion = -1;
    },
    getTestInfo(state, action) {
      state.testAnswers = action.payload;
    },
    answerQuestion(state, action) {
      state.questions[state.currentQuestion].selectedAnswer = action.payload;
      state.testAnswers.simpletestresult
        .filter(
          (item) => item.question === state.questions[state.currentQuestion].id
        )
        .map((item) => (item.answered_id = action.payload));
    },
    logIn(state) {
      state.isAuth = true;
    },
    logOut(state) {
      state.isAuth = false;
    },
    startTest(state) {
      state.testStarted = true;
    },
    endTest(state) {
      state.testStarted = false;
      state.isResult = true;
    },
    closeResult(state) {
      state.isResult = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
  },
});

export default toolkitSlice.reducer;
export const {
  nextQuestion,
  prevQuestion,
  getQuestions,
  logIn,
  logOut,
  startTest,
  endTest,
  startLoading,
  endLoading,
  answerQuestion,
  getTestInfo,
  closeResult,
  getResult,
} = toolkitSlice.actions;
