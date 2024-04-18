import Navbar from "../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import useLocalStorage from "use-local-storage";

export default function Layout() {
  const location = useLocation();

  // const {isDark} = useContext(ThemeContext);

  const [isDark, setIsDark] = useLocalStorage("isDark", window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
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
