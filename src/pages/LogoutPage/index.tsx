import React from "react";
import { navigate } from "hookrouter";
import AuthService from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/slice";
import s from "./Logout.module.scss";

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleQuitClick = (e: React.MouseEvent<HTMLElement>) => {
    AuthService.logout();
    dispatch(logOut());
    navigate("login");
  };
  const handleBackClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate("/");
  };

  return (
    <div className={s.root}>
      <div className={s.window}>
        <h3>Выйти?</h3>
        <div className={s.buttons}>
          <button onClick={handleQuitClick}>Да</button>
          <button onClick={handleBackClick}>Нет</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
