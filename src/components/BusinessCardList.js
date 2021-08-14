import "./styles/BusinessCardList.css";
import BusinessCard from "../components/BusinessCard.js";
import { Link } from "react-router-dom";

const BusinessCardList = ({ loading, error, businessCards }) => {
  return (
    <div className="business-card-list">
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <h2 className="business-card-list__error">Error {error.message}</h2>
      ) : !businessCards.length ? (
        <h2 className="business-card-list__not-found">
          Business cards not found
        </h2>
      ) : (
        businessCards.map((businessCard) => (
          <Link
            key={businessCard.id}
            to={`/business-cards/${businessCard.id}/edit`}
            className="business-card-list__link"
          >
            <BusinessCard
              email={businessCard.email}
              name={businessCard.name}
              phone={businessCard.phone}
              username={businessCard.username}
              website={businessCard.website}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default BusinessCardList;
