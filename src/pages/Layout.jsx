import { Outlet } from "react-router-dom";
import { SidebarData, Header, LoadingScreen } from "../components";
import "../Layout.css";
import { Slide, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="layout-page">
          <aside className="sidebarComponent">
            <SidebarData />
          </aside>
          <div className="content-area">
            <Header />
            <main className="main-page">
              <Outlet />
            </main>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={909}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
        closeButton={false}
      />

      {console.log("dashboar page")}
    </>
  );
};

export default Layout;
