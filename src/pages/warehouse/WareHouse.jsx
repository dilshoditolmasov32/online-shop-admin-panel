import { Outlet } from "react-router-dom";
import { AccordionMenu } from "../../components";
import "./WareHouse.css";

const WareHouse = () => {
  return (
    <>
      <div className="warehouse-page">
        <AccordionMenu />
        <Outlet />
      </div>
    </>
  );
};

export default WareHouse;
