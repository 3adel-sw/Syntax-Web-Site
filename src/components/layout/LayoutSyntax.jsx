import NavBar from "@/components/layout/NavBar";
import {Outlet, ScrollRestoration} from "react-router-dom";

function LayoutSyntax() {
  return (
    <div>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayoutSyntax;