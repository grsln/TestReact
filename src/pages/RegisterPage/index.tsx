import React, { useState } from "react";
import s from "./Register.module.scss";
import { navigate } from "hookrouter";
import AuthService from "../../services/auth.service";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";
import isEmail from 'validator/lib/isEmail';

interface ILoginState {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
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

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      username: e.target.value,
    });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      password: e.target.value,
    });
  };

  const vpassword = (value: string): boolean => {
    if (value.length < 8 || value.length > 40) {
      toast.info(
        "Длина пароля не менее 8 символов, и не более 40 символов",
        toastOptions
      );
      return false;
    }
    return true;
  };
  const vemail = (value: string): boolean => {
    if (!isEmail(value)) {
      toast.info("Введите правильный адрес электронной почты", toastOptions);
      return false;
    }
    return true;
  };

  const vusername = (value: string): boolean => {
    if (value.length < 3 || value.length > 20) {
      toast.info(
        "Длина имени пользователя не менее 3 символов, и не более 20 символов",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      vusername(loginState.username) &&
      vemail(loginState.email) &&
      vpassword(loginState.password)
    ) {
      AuthService.register(
        loginState.username,
        loginState.email,
        loginState.password
      )
        .then(() => {
          toast.info("Регистрация успешно выполнена", toastOptions);
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
    }
  };
  return (
    <div className={s.body}>
      <form onSubmit={handleSubmit}>
        <label>Регистрация</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={onChangeUsername}
          required
        />
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
