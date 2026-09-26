import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar />

      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
