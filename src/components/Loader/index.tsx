import React from "react";
import s from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={s.root}>
      <h1 className={s.loaderText}>Загрузка...</h1>
    </div>
  );
};

export default Loader;
