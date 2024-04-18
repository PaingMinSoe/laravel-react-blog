import Navbar from "../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

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
