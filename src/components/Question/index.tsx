import React from "react";
import s from "./Question.module.scss";
import { IQuestionProps } from "../../interface/interface";

const Question: React.FC<IQuestionProps> = ({ question }) => {
  return (
    <div>
      <h1 className={s.question}>{question}</h1>
    </div>
  );
};

export default Question;
