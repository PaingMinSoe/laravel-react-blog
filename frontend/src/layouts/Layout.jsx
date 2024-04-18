import Navbar from "../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Layout() {
  const location = useLocation();

  const {isDark} = useContext(ThemeContext);

  useEffect(() => {
    if (isDark === true) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
