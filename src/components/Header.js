import "./styles/Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext, themes } from "./ThemeContext";

const Header = ({ onToggleThemeChange }) => {
  const theme = useContext(ThemeContext);

  return (
    <header
      className={`header__container ${
        theme === themes.light ? "" : "header__container--dark"
      }`}
    >
      <div className="container">
        <div className="header">
          <Link className="header__logo" to="/">
            <h1>Business Cards</h1>
          </Link>
          <label htmlFor="theme" className="header__theme-toggle">
            {theme === themes.light ? "🌙" : "☀️"}
          </label>
          <input
            onChange={onToggleThemeChange}
            className="header__theme-input"
            type="checkbox"
            id="theme"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
