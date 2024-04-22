import Navbar from "../components/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useLocation, useOutlet } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <>
      <Navbar />
      <SwitchTransition>
        <CSSTransition key={location.pathname} timeout={200} classNames="page">
          <div className="max-w-[90%] mx-auto">
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
