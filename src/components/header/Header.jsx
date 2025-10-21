import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SelectMenu from "../select/SelectMenu";
import searchIcon from "../../assets/images/search-icon.svg";
import plusIcon from "../../assets/svg/plus.svg";

import "./Header.css";
import PlusIconComponent from "../../assets/svgr/plus";

const Header = () => {
  const location = useLocation();
  const options = ["Kale Gallery", "JNK", "Imaj", "Bella"];
  const [selectedCompany, setSelectedCompany] = useState("");
  const allowedPaths = ["/deal", "/deal/productId", "/warehouse/edit-product"];

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
    console.log("Selected company:", value);
  };
  return (
    <header className="header-section">
      <div className="navbar-search__menu">
        <div className="navbar__search">
          <input type="text" placeholder="Найти..." />
          <button className="search-btn">
            <img src={searchIcon} alt="search icon" className="search-icon" />
          </button>
        </div>

        <SelectMenu
          inputLabel={"Company name"}
          options={options}
          value={selectedCompany}
          onChange={handleCompanyChange}
        />

        <p className="hisobnoma">Создать отчет</p>
      </div>
      <div className="settings">
        <div className="counter-summa">
          0 сделок:
          <span>0 soʻm</span>
        </div>

        <NavLink to={"setting"} className="setting-link">
          Настроить
        </NavLink>

        {allowedPaths.includes(location.pathname) && (
          <NavLink to={"deal/productId"} className="newCompony-add">
          
            <img src={plusIcon} alt="plus icon" />
            <span>Новая компания</span>
          </NavLink>
        )}

      
      </div>
    </header>
  );
};

export default Header;
