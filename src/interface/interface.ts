export interface IAnswer {
  id: number;
  answer: string;
}
export interface IQuestionProps {
  id: number;
  question: string;
  answers?: IAnswer[];
  selectedAnswer?: number;
  right_answer?: number;
}
export interface IResult {
  id: number;
  answered_id: number;
  question: number;
}
export interface ITestResult {
  id: number;
  simpletestresult: IResult[];
}

export interface IState {
  toolkit: {
    isAuth: boolean;
    currentQuestion: number;
    questions: IQuestionProps[];
    testStarted: boolean;
    isLoading: boolean;
    isResult: boolean;
    testAnswers: ITestResult;
  };
}
