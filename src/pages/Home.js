import "./styles/Home.css";
import "../components/styles/Button.css";
import BusinessCardForm from "../components/BusinessCardForm";
import BusinessCard from "../components/BusinessCard";
import { Link, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext, themes } from "../components/ThemeContext";

const Home = () => {
  const theme = useContext(ThemeContext);
  const [businessCard, setBusinessCard] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [loading, setLoading] = useState(undefined);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    createBusinessCard();
  }

  async function createBusinessCard() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "POST",
          body: JSON.stringify(businessCard),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log({ message: "Business card created", businessCard: data });
      setLoading(false);
      setRedirect(true);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  function handleChange({ target: { name, value } }) {
    setBusinessCard({ ...businessCard, [name]: value });
  }

  if (!error && redirect) {
    return <Redirect push to="/business-cards" />;
  }

  return (
    <div className={`home ${theme === themes.light ? "" : "home--dark"}`}>
      <p className="home__info">Create your business card 📇</p>
      <div className="container">
        <BusinessCardForm
          businessCard={businessCard}
          onSubmit={handleSubmit}
          onInputChange={handleChange}
          loading={loading}
          error={error}
        />
        <div className="home__business-card-container">
          <BusinessCard
            name={businessCard.name}
            username={businessCard.username}
            email={businessCard.email}
            phone={businessCard.phone}
            website={businessCard.website}
          />
        </div>
        <div className="home__business-cards-container">
          <Link to="/business-cards" className="button">
            See all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
