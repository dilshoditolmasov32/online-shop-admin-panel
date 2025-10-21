import { Outlet } from "react-router-dom";
import {SmallSidebar} from "../../components"
import "./Setting.css"

const Setting = () => {
  const sidebarLink = [
    {
      id: 1,
      title: "Профиль",
      url: "profil",
    },
    {
      id: 2,
      title: "Рекламные интеграции",
      url: "reklama",
    },
    {
      id: 3,
      title: "Пользователи",
      url: "users",
    },
  
  ];

  return (
    <div className="setting-page">
      <SmallSidebar 
      sidebarLink={sidebarLink}
      />
      <Outlet />
    </div>
  )
};

export default Setting;
