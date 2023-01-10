import React, { useEffect, useState } from "react";
import { request } from "../requestMethod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import css from "./Edit.module.css";

const Edit = () => {
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = location.pathname.split("/")[2];
  const [salutation, setsalutation] = useState(user.salutation);
  const [first_name, setfirst_name] = useState(user.first_name);
  const [last_name, setlast_name] = useState(user.last_name);
  const [email, setemail] = useState(user.email);
  const [mobile, setmobile] = useState(user.mobile);
  const [address, setaddress] = useState(user.address);
  const [country, setcountry] = useState(user.country);
  const [postal_code, setpostal_code] = useState(user.postal_code);
  const [nationality, setnationality] = useState(user.nationality);
  const [birth, setbirth] = useState(user.birth);
  const [gender, setgender] = useState(user.gender);
  const [status, setstatus] = useState(user.status);
  const [hobbies, sethobbies] = useState(user.hobbies);
  const [sport, setsport] = useState(user.sport);
  const [music, setmusic] = useState(user.music);
  const [movie, setmovie] = useState(user.movie);
  const [spouse_salutation, setspouse_salutation] = useState(
    user.spouse_salutation
  );
  const [spouse_first_name, setspouse_first_name] = useState(
    user.spouse_first_name
  );
  const [spouse_last_name, setspouse_last_name] = useState(
    user.spouse_last_name
  );
  const [error, setError] = useState(null);
  const [file, setFile] = useState(user.image || null);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await request.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    // 1048576 bytes = 1 MB
    if (selectedFile.size > 1048576) {
      // Show an error message
      setError("File is too large. Please select a file less than 1 MB.");
      return;
    } else if (
      selectedFile.type !== "image/jpeg" &&
      selectedFile.type !== "image/png"
    ) {
      setError("File type must be JPG or PNG");
      return;
    } else {
      setFile(selectedFile);
    }
  };

  const inputs = {
    salutation,
    first_name,
    last_name,
    email,
    mobile,
    address,
    country,
    postal_code,
    nationality,
    birth,
    gender,
    status,
    hobbies,
    sport,
    music,
    movie,
    spouse_salutation,
    spouse_first_name,
    spouse_last_name,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    if (
      (!user.email && !email) ||
      (!user.first_name && !first_name) ||
      (!user.last_name && !last_name) ||
      (!user.salutation && !salutation) ||
      (!user.mobile && !mobile) ||
      (!user.address && !address) ||
      (!user.postal_code && !postal_code) ||
      (!user.country && !country) ||
      (!user.nationality && !nationality)
    ) {
      setError("Please Fill All the required Fields.");
    } else {
      setError(null);
      // submit the form
      try {
        await request
          .put(`/user/${profileId}`, {
            ...inputs,
            image: file ? imgUrl : user.image,
          })
          .then(navigate(`/profile/${profileId}`));
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

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
            Edit <b>Profile</b>
          </h1>
          <div className={css.line}></div>
          <Link to={`/profile/${profileId}`}>
            <MdOutlineArrowBackIosNew />
            <span>Go back to My Profile</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className={css.card}>
          <div className={css.img}>
            {user.image ? (
              <img src={require(`../img/${user.image}`)} alt="PostImage" />
            ) : (
              <BsPersonFill />
            )}
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={handleImage}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <span>(JPG or PNG format with maximum size of 1 MB)</span>
          </div>
          <div onSubmit={handleSubmit}>
            {menu === 1 && (
              <div className={css.basicDesc}>
                <h3>Salutation*</h3>
                <select
                  id="salutation"
                  value={salutation}
                  name="salutation"
                  style={{
                    borderColor:
                      error && !salutation && !user.salutation ? "red" : "#000",
                  }}
                  onChange={(e) => setsalutation(e.target.value)}
                >
                  <option value="">Select Salutation</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
                {error && !salutation && !user.salutation && (
                  <p>Please select your salutation.</p>
                )}
                <h3>First Name*</h3>
                <input
                  type="text"
                  placeholder={user.first_name}
                  value={first_name}
                  name="first_name"
                  style={{
                    borderColor:
                      error && !first_name && !user.first_name ? "red" : "#000",
                  }}
                  onChange={(e) => setfirst_name(e.target.value)}
                />
                {error && !first_name && !user.first_name && (
                  <p>Please enter new first name.</p>
                )}
                <h3>Last Name*</h3>
                <input
                  type="text"
                  placeholder={user.last_name}
                  value={last_name}
                  name="last_name"
                  style={{
                    borderColor:
                      error && !last_name && !user.last_name ? "red" : "#000",
                  }}
                  onChange={(e) => setlast_name(e.target.value)}
                />
                {error && !last_name && !user.last_name && (
                  <p>Please enter new last name.</p>
                )}
                <h3>Email Address*</h3>
                <input
                  type="text"
                  placeholder={user.email}
                  value={email}
                  name="email"
                  style={{
                    borderColor:
                      error && !email && !user.email ? "red" : "#000",
                  }}
                  onChange={(e) => setemail(e.target.value)}
                />
                {error && !email && !user.email && (
                  <p>Please enter new email.</p>
                )}
              </div>
            )}
            {menu === 2 && (
              <div className={css.addition}>
                <h3>Mobile number*</h3>
                <input
                  type="number"
                  placeholder={user.mobile}
                  value={mobile}
                  name="mobile"
                  style={{
                    borderColor:
                      error && !inputs.mobile && !user.mobile ? "red" : "#000",
                  }}
                  onChange={(e) => setmobile(e.target.value)}
                />
                {error && !mobile && !user.mobile && (
                  <p>Please enter new mobile number.</p>
                )}
                <h3>Home address*</h3>
                <input
                  type="text"
                  placeholder={user.address}
                  value={address}
                  name="address"
                  onChange={(e) => setaddress(e.target.value)}
                  style={{
                    borderColor:
                      error && !address && !user.address ? "red" : "#000",
                  }}
                />
                {error && !address && !user.address && (
                  <p>Please enter new home address.</p>
                )}
                <h3>Country*</h3>
                <input
                  type="text"
                  placeholder={user.country}
                  value={country}
                  name="country"
                  onChange={(e) => setcountry(e.target.value)}
                  style={{
                    borderColor:
                      error && !inputs.country && !user.country
                        ? "red"
                        : "#000",
                  }}
                />
                {error && !inputs.country && !user.country && (
                  <p>Please enter new home country.</p>
                )}
                <h3>Postal code*</h3>
                <input
                  type="number"
                  placeholder={user.postal_code}
                  value={postal_code}
                  name="postal_code"
                  onChange={(e) => setpostal_code(e.target.value)}
                  style={{
                    borderColor:
                      error && !inputs.postal_code && !user.postal_code
                        ? "red"
                        : "#000",
                  }}
                />
                {error && !inputs.postal_code && !user.postal_code && (
                  <p>Please enter new postal code.</p>
                )}
                <h3>Nationality*</h3>
                <input
                  type="text"
                  placeholder={user.nationality}
                  value={nationality}
                  name="nationality"
                  onChange={(e) => setnationality(e.target.value)}
                  style={{
                    borderColor:
                      error && !nationality && !user.nationality
                        ? "red"
                        : "#000",
                  }}
                />
                {error && !nationality && !user.nationality && (
                  <p>Please enter new nationality.</p>
                )}
                <h3>Date of birth</h3>
                <input
                  type="text"
                  placeholder={user.birth}
                  value={inputs?.birth}
                  name="birth"
                  onChange={(e) => setbirth(e.target.value)}
                />
                <h3>Gender</h3>
                <select
                  id="gender"
                  value={inputs?.gender || user.gender}
                  name="gender"
                  onChange={(e) => setgender(e.target.value)}
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
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
            )}
            {menu === 3 && (
              <div className={css.spouseDesc}>
                <h3>Salutation*</h3>
                <select
                  id="spouse_salutation"
                  value={inputs?.spouse_salutation || user.spouse_salutation}
                  name="spouse_salutation"
                  onChange={(e) => setspouse_salutation(e.target.value)}
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
                  onChange={(e) => setspouse_first_name(e.target.value)}
                />
                <h3>Last Name*</h3>
                <input
                  type="text"
                  placeholder={user.spouse_last_name}
                  value={inputs?.spouse_last_name}
                  name="spouse_last_name"
                  onChange={(e) => setspouse_last_name(e.target.value)}
                />
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
                  onChange={(e) => sethobbies(e.target.value)}
                />
                <h3>Favorite sport</h3>
                <input
                  type="text"
                  placeholder={user.sport}
                  value={inputs?.sport}
                  name="sport"
                  onChange={(e) => setsport(e.target.value)}
                />
                <h3>Preferred music genre(s)</h3>
                <input
                  type="text"
                  placeholder={user.music}
                  value={inputs?.music}
                  name="music"
                  onChange={(e) => setmusic(e.target.value)}
                />
                <h3>Preferred movie/TV show(s)</h3>
                <input
                  type="text"
                  placeholder={user.movie}
                  value={inputs?.movie}
                  name="movie"
                  onChange={(e) => setmovie(e.target.value)}
                />
              </div>
            )}
            <div className={css.buttons}>
              <button className={css.save} type="submit">
                save &#38; update
              </button>
              <button
                className={css.cancel}
                onClick={() => window.location.reload()}
              >
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      {error && <div className={css.error}>{error}</div>}
    </div>
  );
};

export default Edit;
