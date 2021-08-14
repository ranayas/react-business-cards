import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../components/styles/Button.css";
import "./styles/BusinessCards.css";
import "../components/styles/Loader.css";
import BusinessCardList from "../components/BusinessCardList";
import { useContext } from "react";
import { ThemeContext, themes } from "../components/ThemeContext";

const BusinessCards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessCards, setBusinessCards] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBusinessCards, setFilteredBusinessCards] = useState([]);
  const theme = useContext(ThemeContext);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setBusinessCards(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  useMemo(() => {
    const filteredBusinessCards = businessCards.filter((businessCard) =>
      businessCard.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilteredBusinessCards(filteredBusinessCards);
  }, [businessCards, search]);

  return (
    <div
      class={`business-cards ${
        theme === themes.light ? "" : "business-cards--dark"
      }`}
    >
      <div className="container">
        <div className="business-cards__button-container">
          <Link className="button" to="/">
            Create a business card
          </Link>
        </div>
        <div className="business-cards__search-container">
          <label
            htmlFor="search-business-cards"
            className="business-cards__search-label"
          >
            Filter business cards
          </label>
          <input
            id="search-business-cards"
            className="input"
            name="searchBusinessCards"
            value={search}
            onChange={handleChange}
          />
          <BusinessCardList
            loading={loading}
            error={error}
            businessCards={filteredBusinessCards}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessCards;
