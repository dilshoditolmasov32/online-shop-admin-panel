import { Outlet } from "react-router-dom";
import { SmallSidebar } from "../../components";
import "./Web.css";

const Web = () => {
  const sidebarLink = [
    {
      id: 1,
      title: "Баннер 1",
      url: "upload-banner",
    },
    {
      id: 2,
      title: "Категория товаров",
      url: "category-product",
    },
    {
      id: 3,
      title: "Товарный блок",
      url: "block-product",
    },
    {
      id: 4,
      title: "Баннер 2",
      url: "upload-banner2",
    },
    {
      id: 5,
      title: "Заявка",
      url: "request",
    },
  ];

  return (
    <div className="web-page">
      <SmallSidebar sidebarLink={sidebarLink} />
      <Outlet />
    </div>
  );
};

export default Web;
