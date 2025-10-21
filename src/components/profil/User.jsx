import profile from "../../assets/images/profile.svg";
import "./User.css";
const User = () => {
  return (
    <div className="sidebar-profile">
      <div className="sidebar-user__component">
        <div className="user-image">
          <input type="image" src={profile} alt="profile icon" />
        </div>
        <div className="adminUser-data">
          <button>Исполнитель*</button>
          <h4>Mukhammadbobur</h4>
        </div>
      </div>

    </div>
  );
};

export default User;
