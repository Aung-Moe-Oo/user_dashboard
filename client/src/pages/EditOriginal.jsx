import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import css from "./Profile.module.css";

const Edit = () => {
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({
    salutation: user.salutation,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile: user.mobile,
    address: user.address,
    country: user.country,
    postal_code: user.postal_code,
    nationality: user.nationality,
    birth: user.birth,
    gender: user.gender,
    status: user.status,
    hobbies: user.hobbies,
    sport: user.sport,
    music: user.music,
    movie: user.movie,
    spouse: user.spouse,
    spouse_salutation: user.spouse_salutation,
    spouse_first_name: user.spouse_first_name,
    spouse_last_name: user.spouse_last_name,
  });

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/user/${profileId}`, inputs);
      navigate(`/profile/${profileId}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/${profileId}`
        );
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
            Edit <b>Profile</b>
          </h1>
          <div className={css.line}></div>
          <Link to={`/profile/${profileId}`}>
            <MdOutlineArrowBackIosNew />
            <span>Go back to My Profile</span>
          </Link>
        </div>
        <div className={css.card}>
          <div className={css.img}>
            <BsPersonFill />
          </div>
          {menu === 1 && (
            <div className={css.basicDesc}>
              <h3>Salutation*</h3>
              <select
                id="salutation"
                value={inputs?.salutation || user.salutation}
                name="salutation"
                onChange={handleChange}
              >
                <option value="">Select Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
              <h3>First Name*</h3>
              <input
                type="text"
                placeholder={user.first_name}
                value={inputs?.first_name}
                name="first_name"
                onChange={handleChange}
              />
              <h3>Last Name*</h3>
              <input
                type="text"
                placeholder={user.last_name}
                value={inputs?.last_name}
                name="last_name"
                onChange={handleChange}
              />
              <h3>Email Address*</h3>
              <input
                type="text"
                placeholder={user.email}
                value={inputs?.email}
                name="email"
                onChange={handleChange}
              />
              <div className={css.buttons}>
                <div className={css.save} onClick={handleSubmit}>
                  save &#38; update
                </div>
                <div
                  className={css.cancel}
                  onClick={() => window.location.reload()}
                >
                  cancel
                </div>
              </div>
            </div>
          )}
          {menu === 2 && (
            <div className={css.addition}>
              <h3>Mobile number*</h3>
              <input
                type="number"
                placeholder={user.mobile}
                value={inputs?.mobile}
                name="mobile"
                onChange={handleChange}
              />
              <h3>Home address*</h3>
              <input
                type="text"
                placeholder={user.address}
                value={inputs?.address}
                name="address"
                onChange={handleChange}
              />
              <h3>Country*</h3>
              <input
                type="text"
                placeholder={user.country}
                value={inputs?.country}
                name="country"
                onChange={handleChange}
              />
              <h3>Postal code*</h3>
              <input
                type="number"
                placeholder={user.postal_code}
                value={inputs?.postal_code}
                name="postal_code"
                onChange={handleChange}
              />
              <h3>Nationality*</h3>
              <input
                type="text"
                placeholder={user.nationality}
                value={inputs?.nationality}
                name="nationality"
                onChange={handleChange}
              />
              <h3>Date of birth</h3>
              <input
                type="text"
                placeholder={user.birth}
                value={inputs?.birth}
                name="birth"
                onChange={handleChange}
              />
              <h3>Gender</h3>
              <select
                id="gender"
                value={inputs?.gender || user.gender}
                name="gender"
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <h3>Marital status</h3>
              <select
                id="status"
                value={inputs?.status || user.status}
                name="status"
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
              <div className={css.buttons}>
                <div className={css.save} onClick={handleSubmit}>
                  save &#38; update
                </div>
                <div
                  className={css.cancel}
                  onClick={() => window.location.reload()}
                >
                  cancel
                </div>
              </div>
            </div>
          )}
          {menu === 3 && (
            <div className={css.spouseDesc}>
              <h3>Salutation*</h3>
              <select
                id="spouse_salutation"
                value={inputs?.spouse_salutation || user.spouse_salutation}
                name="spouse_salutation"
                onChange={handleChange}
              >
                <option value="">Select Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
              <h3>First Name*</h3>
              <input
                type="text"
                placeholder={user.spouse_first_name}
                value={inputs?.spouse_first_name}
                name="spouse_first_name"
                onChange={handleChange}
              />
              <h3>Last Name*</h3>
              <input
                type="text"
                placeholder={user.spouse_last_name}
                value={inputs?.spouse_last_name}
                name="spouse_last_name"
                onChange={handleChange}
              />
              <div className={css.buttons}>
                <div className={css.save} onClick={handleSubmit}>
                  save &#38; update
                </div>
                <div
                  className={css.cancel}
                  onClick={() => window.location.reload()}
                >
                  cancel
                </div>
              </div>
            </div>
          )}
          {menu === 4 && (
            <div className={css.personal}>
              <h3>Hobbies and interests</h3>
              <input
                type="text"
                placeholder={user.hobbies}
                value={inputs?.hobbies}
                name="hobbies"
                onChange={handleChange}
              />
              <h3>Favorite sport</h3>
              <input
                type="text"
                placeholder={user.sport}
                value={inputs?.sport}
                name="sport"
                onChange={handleChange}
              />
              <h3>Preferred music genre(s)</h3>
              <input
                type="text"
                placeholder={user.music}
                value={inputs?.music}
                name="music"
                onChange={handleChange}
              />
              <h3>Preferred movie/TV show(s)</h3>
              <input
                type="text"
                placeholder={user.movie}
                value={inputs?.movie}
                name="movie"
                onChange={handleChange}
              />
              <div className={css.buttons}>
                <div className={css.save} onClick={handleSubmit}>
                  save &#38; update
                </div>
                <div
                  className={css.cancel}
                  onClick={() => window.location.reload()}
                >
                  cancel
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
