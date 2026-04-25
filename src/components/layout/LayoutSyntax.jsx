import NavBar from "@/components/layout/NavBar";
import {Outlet} from "react-router-dom";

function LayoutSyntax() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayoutSyntax;