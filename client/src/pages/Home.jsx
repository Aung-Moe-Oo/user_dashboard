import React, { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import css from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [gender, setGender] = useState("");
  const [nation, setNation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= 12; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `https://randomuser.me/api/?page=${currentPage}&results=9&seed=abc`
        );
        setContacts(
          response.data.results
            .filter((i) => (gender.length > 0 ? i.gender === gender : i))
            .filter((i) =>
              nation.length > 0 ? i.location.country === nation : i
            )
        );
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, [currentPage, gender, nation]);

  return (
    <div className={css.containerWrapper}>
      <h1>
        My <b>Contacts</b>
      </h1>
      <span className={css.line}></span>
      <div className={css.group}>
        <select
          id="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">All Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <select
          id="nation"
          value={nation}
          onChange={(event) => setNation(event.target.value)}
        >
          <option value="">All Country</option>
          {contacts.map((nation, i) => (
            <option value={nation.location.country} key={i}>
              {nation.location.country}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className={css.container}>
        {contacts.map((contact) => (
          <div key={contact.email} className={css.card}>
            <img src={contact.picture.medium} alt="pic" />
            <div className={css.desc}>
              <h2>{`${contact.name.first} ${contact.name.last}`}</h2>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>
                {`${contact.location.street.number} ${contact.location.street.name}, ${contact.location.city}, ${contact.location.state} ${contact.location.postcode}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={css.paginationWrapper}>
        <div className={css.pagination}>
          {currentPage > 1 && (
            <MdOutlineArrowBackIosNew
              onClick={() => handlePageChange(currentPage - 1)}
            />
          )}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              style={
                currentPage === number
                  ? { background: "#3ef869" }
                  : { background: "white" }
              }
            >
              {number}
            </button>
          ))}
          {currentPage < 12 && (
            <MdOutlineArrowForwardIos
              onClick={() => handlePageChange(currentPage + 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
