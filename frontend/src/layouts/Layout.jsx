import Navbar from "../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Layout() {
  const location = useLocation();

  // const {isDark} = useContext(ThemeContext);

  // const [isDark, setIsDark] = useLocalStorage("isDark", window.matchMedia("(prefers-color-scheme: dark)").matches);
  // const {isDark} = useContext(ThemeContext);


  return (
    <>
      <Navbar />
      <SwitchTransition>
        <CSSTransition key={location.pathname} timeout={200} classNames="fade">
          <div>
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
