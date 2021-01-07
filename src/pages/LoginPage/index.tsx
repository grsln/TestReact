import React, { useState } from "react";
import s from "./Login.module.scss";
import { navigate } from "hookrouter";
import AuthService from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slice";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";

interface ILoginState {
  username: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState<ILoginState>({
    username: "",
    email: "",
    password: "",
  });

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      email: e.target.value,
    });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      password: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.login(loginState.email, loginState.password)
      .then(() => {
        dispatch(logIn());
        navigate("/");
      })
      .catch((error) => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
        for (var key in error.response.data) {
          var message =
            key.toString() + ": " + JSON.stringify(error.response.data[key]);
          toast.error(message, toastOptions);
        }
      });
  };
  return (
    <div className={s.body}>
      <form onSubmit={handleSubmit}>
        <label>Для начала теста выполните вход</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={onChangeEmail}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={onChangePassword}
          required
        />
        <button type="submit">Вход</button>
      </form>
    </div>
  );
};

export default LoginPage;
