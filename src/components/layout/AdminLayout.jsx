import { Outlet } from "react-router-dom";
import NavbarAdmin from "../shared/NavbarAdmin";
import FooterAuth from "../shared/FooterAuth";

export default function AdminLayout() {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
      {/* <FooterAuth /> */}
    </>
  );
}
