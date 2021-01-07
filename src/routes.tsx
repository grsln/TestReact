import React from "react";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";

export const Link = {
  TEST: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGOUT: "/logout",
};
interface IGeneralMenu {
  title: string;
  link: string;
  component: () => JSX.Element;
  auth: boolean;
}

interface iAccMenu {
  [n: string]: () => JSX.Element;
}

export const GENERAL_MENU: IGeneralMenu[] = [
  {
    title: "Тест",
    link: Link.TEST,
    component: () => <TestPage />,
    auth: true,
  },
  {
    title: "Вход",
    link: Link.LOGIN,
    component: () => <LoginPage />,
    auth: false,
  },
  {
    title: "Выход",
    link: Link.LOGOUT,
    component: () => <LogoutPage />,
    auth: true,
  },
  {
    title: "Регистрация",
    link: Link.SIGNUP,
    component: () => <RegisterPage />,
    auth: false,
  },
];

const routes = GENERAL_MENU.reduce((acc: iAccMenu, item: IGeneralMenu) => {
  acc[item.link] = item.component;
  return acc;
}, {});
export default routes;
