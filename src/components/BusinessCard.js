import "./styles/BusinessCard.css";
import md5 from "md5";
import { useContext } from "react";
import { ThemeContext, themes } from "./ThemeContext";

function BusinessCard({ name, username, email, phone, website }) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={`business-card ${
        theme === themes.light ? "" : "business-card--dark"
      }`}
    >
      <img
        className="business-card__image"
        alt="gravatar"
        src={`https://www.gravatar.com/avatar/${email && md5(email)}`}
      />
      <div className="business-card__content">
        <p className="business-card__name">{name}</p>
        <p className="business-card__username">@{username}</p>
        <div className="business-card__line"></div>
        <div className="business-card__bottomContent">
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Website: {website}</p>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
