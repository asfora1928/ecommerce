import styles from "./Layout.module.css";

import { Outlet } from "react-router-dom";
// import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=" lg:my-6 lg:py-10">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}
