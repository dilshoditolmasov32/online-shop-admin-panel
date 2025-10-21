import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/svgr/home";
import DealIcon from "../../assets/svgr/deal";
import StoreIcon from "../../assets/svgr/store";
import SettingIcon from "../../assets/svgr/setting";
import WebIcon from "../../assets/svgr/web";
import User from "../profil/User";
import "./SidebarData.css";

const pageData = [
  { id: 1, title: "Рабочий стол", icon: <HomeIcon fill="#10355B"  />, link: "/dashboard" },
  { id: 2, title: "Сделка", icon: <DealIcon  fill="#10355B" />, link: "/dashboard/deal" },
  { id: 3, title: "Склад", icon: <StoreIcon fill="#10355B" />, link: "/dashboard/warehouse" },
  { id: 4, title: "Website", icon: <WebIcon fill="#10355B"/>, link: "/dashboard/web" },
  { id: 5, title: "Настройка", icon: <SettingIcon fill="#10355B" />, link: "/dashboard/setting" },
];

const SidebarData = () => {
  return (
    <section className="sidebar-component">
      <User />
      <ul className="sidebarLIst-parent">
        {pageData.map((value) => (
          <li key={value.id} className="list-element">
            <NavLink
              to={value.link}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-icon">{value.icon}</span>
              {value.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SidebarData;
