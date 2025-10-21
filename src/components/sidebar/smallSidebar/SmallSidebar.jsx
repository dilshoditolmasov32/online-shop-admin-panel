import { NavLink } from "react-router-dom";
import "./SmallSidebar.css";

const SmallSidebar = ({ sidebarLink }) => {
  return (
    <aside className="small-sidebar">
      <ul>
        {sidebarLink?.map((item) => (
          <li key={item.id} id="subcategory-list">
            <NavLink to={`${item.url}`}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SmallSidebar;
