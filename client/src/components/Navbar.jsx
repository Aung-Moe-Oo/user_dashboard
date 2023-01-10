import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import css from "./Navbar.module.css";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={css.container}>
      <div className={css.logo}>logo</div>
      <div className={css.menu} style={{ display: user ? "block" : "none" }}>
        <div className={css.toggleButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
        </div>
        {isOpen && (
          <ul className={css.navList}>
            <li className={css.navItem} onClick={() => setIsOpen(!isOpen)}>
              <Link to="/" className={css.navLink}>
                My Contacts
              </Link>
            </li>
            <li className={css.navItem} onClick={() => setIsOpen(!isOpen)}>
              <Link to={`/profile/${currentUser._id}`} className={css.navLink}>
                My Profile
              </Link>
            </li>
            <li className={css.navItem} onClick={() => setIsOpen(!isOpen)}>
              <Link to={`/edit/${currentUser._id}`} className={css.navLink}>
                Edit Profile
              </Link>
            </li>
            <li className={css.navItem} onClick={() => setIsOpen(!isOpen)}>
              <div className={css.logoutButton} onClick={handleLogout}>
                Logout
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
