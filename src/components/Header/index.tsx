import React from "react";
import cn from "classnames";
import { A, usePath } from "hookrouter";
import { GENERAL_MENU } from "../../routes";
import s from "./Header.module.scss";
import { useSelector } from "react-redux";
import { IState } from "../../interface/interface";

const Header = () => {
  const isAuth = useSelector<IState, boolean>((state) => state.toolkit.isAuth);
  const path = usePath();
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <div className={s.menuWrap}>
          {GENERAL_MENU.filter(({ auth }) => auth === isAuth).map(
            ({ title, link }) => (
              <A
                href={link}
                key={title}
                className={cn(s.menuLink, { [s.activeLink]: link === path })}
              >
                {title}
              </A>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
