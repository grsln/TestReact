import React from "react";
import { useRoutes } from "hookrouter";
import Header from "./components/Header";
import routes from "./routes";
import s from './App.module.scss';
import AuthService from "./services/auth.service";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./redux/slice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const toastOptions = {
  autoClose: 6000,
  hideProgressBar: true,
  position: toast.POSITION.TOP_LEFT,
  pauseOnHover: true,
};

const App: React.FC = () => {
  const match = useRoutes(routes);
  const currentUser = AuthService.getCurrentUser();
  const dispatch = useDispatch();
  (currentUser)?dispatch(logIn()):dispatch(logOut());

  return match ? (
    <div className={s.body}>
      <Header />
      <div className={s.main}>
      {match}
      </div>
      <ToastContainer />
    </div>
  ) : (
    <h1> page not found </h1>
  );
};

export default App;
