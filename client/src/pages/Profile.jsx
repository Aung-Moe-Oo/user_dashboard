import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsPersonFill, BsPenFill } from "react-icons/bs";
import css from "./Profile.module.css";
import { request } from "../requestMethod";

const Profile = () => {
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(1);
  const location = useLocation();
  const profileId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get(`/user/${profileId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [profileId]);
  return (
    <div className={css.container}>
      <div className={css.menu}>
        <ul>
          <li
            onClick={() => setMenu(1)}
            style={{
              fontWeight: menu === 1 && "bolder",
              borderBottom: menu === 1 && "solid",
            }}
          >
            Basic Details
          </li>
          <li
            onClick={() => setMenu(2)}
            style={{
              fontWeight: menu === 2 && "bolder",
              borderBottom: menu === 2 && "solid",
            }}
          >
            Additional Details
          </li>
          {user.status === "married" && (
            <li
              onClick={() => setMenu(3)}
              style={{
                fontWeight: menu === 3 && "bolder",
                borderBottom: menu === 3 && "solid",
              }}
            >
              Spouse Details
            </li>
          )}

          <li
            onClick={() => setMenu(4)}
            style={{
              fontWeight: menu === 4 && "bolder",
              borderBottom: menu === 4 && "solid",
            }}
          >
            Personal Perferences
          </li>
        </ul>
      </div>
      <div className={css.profile}>
        <div className={css.title}>
          <h1>
            My <b>Profile</b>
          </h1>
          <div className={css.line}></div>
          <Link to={`/edit/${profileId}`}>
            <span>Edit Profile</span>
            <BsPenFill />
          </Link>
        </div>
        <div className={css.card}>
          <div className={css.img}>
            {user.image ? (
              <img src={require(`../img/${user.image}`)} alt="PostImage" />
            ) : (
              <BsPersonFill />
            )}
          </div>
          {menu === 1 && (
            <div className={css.basicDesc}>
              <h3>Salutation*</h3>
              <span>{user.salutation || "-"}</span>
              <h3>First Name*</h3>
              <span>{user.first_name || "-"}</span>
              <h3>Last Name*</h3>
              <span>{user.last_name || "-"}</span>
              <h3>Email Address*</h3>
              <span>{user.email || "-"}</span>
            </div>
          )}
          {menu === 2 && (
            <div className={css.addition}>
              <h3>Mobile number*</h3>
              <span>{user.mobile || "-"}</span>
              <h3>Home address*</h3>
              <span>{user.address || "-"}</span>
              <h3>Country*</h3>
              <span>{user.country || "-"}</span>
              <h3>Postal code*</h3>
              <span>{user.postal_code || "-"}</span>
              <h3>Nationality*</h3>
              <span>{user.nationality || "-"}</span>
              <h3>Date of birth</h3>
              <span>{user.birth || "-"}</span>
              <h3>Gender</h3>
              <span>{user.gender || "-"}</span>
              <h3>Marital status</h3>
              <span>{user.status || "-"}</span>
            </div>
          )}
          {menu === 3 && (
            <div className={css.spouseDesc}>
              <h3>Salutation*</h3>
              <span>{user.spouse_salutation || "-"}</span>
              <h3>First Name*</h3>
              <span>{user.spouse_first_name || "-"}</span>
              <h3>Last Name*</h3>
              <span>{user.spouse_last_name || "-"}</span>
            </div>
          )}
          {menu === 4 && (
            <div className={css.personal}>
              <h3>Hobbies and interests</h3>
              <span>{user.hobbies || "-"}</span>
              <h3>Favorite sport</h3>
              <span>{user.sport || "-"}</span>
              <h3>Preferred music genre(s)</h3>
              <span>{user.music || "-"}</span>
              <h3>Preferred movie/TV show(s)</h3>
              <span>{user.movie || "-"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
