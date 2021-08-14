import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import "../components/styles/Loader.css";
import BusinessCardForm from "../components/BusinessCardForm.js";
import BusinessCard from "../components/BusinessCard.js";
import "./styles/BusinessCardEdit.css";
import "../components/styles/Button.css";
import DeleteBusinessCardModal from "../components/DeleteBusinessCardModal.js";
import ErrorBoundary from "../components/ErrorBoundary";
import { useContext } from "react";
import { ThemeContext, themes } from "../components/ThemeContext";

const BusinessCardEdit = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [fetchingBusinessCard, setFetchingBusinessCard] = useState(true);
  const [updatingBusinessCard, setUpdatingBusinessCard] = useState(undefined);
  const [deletingBusinessCard, setDeletingBusinessCard] = useState(undefined);
  const [updateError, setUpdateError] = useState(undefined);
  const [deleteError, setDeleteError] = useState(undefined);
  const [businessCard, setBusinessCard] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [showModal, setShowModal] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    getBusinessCard();

    async function getBusinessCard() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = await response.json();
      setBusinessCard(data);
      setFetchingBusinessCard(false);
    }
  }, [id]);

  function handleChanage({ target: { value, name } }) {
    setBusinessCard({ ...businessCard, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUpdatingBusinessCard(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(businessCard),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log({ message: "Business card updated", businessCard: data });
      setUpdatingBusinessCard(false);
      setRedirect(true);
    } catch (error) {
      setUpdatingBusinessCard(false);
      setUpdateError(error);
    }
  }

  function handleDeleteClick() {
    setShowModal(true);
  }

  async function handleDeleteClickConfirm() {
    setDeletingBusinessCard(true);
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log({ message: "Business card deleted" });
      setDeletingBusinessCard(false);
      setShowModal(false);
      setRedirect(true);
    } catch (error) {
      setDeletingBusinessCard(false);
      setDeleteError(error);
    }
  }

  function handleCancelClick() {
    setShowModal(false);
  }

  if (redirect && !updateError) {
    return <Redirect push to="/business-cards" />;
  }
  return (
    <div
      class={`business-card-edit ${
        theme === themes.light ? "" : "business-card-edit--dark"
      }`}
    >
      <div className="container">
        {fetchingBusinessCard ? (
          <div className="business-card-edit__loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="business-card-edit__delete-button">
              <button
                className="button button--danger"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
              {showModal && (
                <DeleteBusinessCardModal
                  loading={deletingBusinessCard}
                  error={deleteError}
                  onDeleteClick={handleDeleteClickConfirm}
                  onCancelClick={handleCancelClick}
                />
              )}
            </div>
            <div className="business-card-edit__form">
              <BusinessCardForm
                onSubmit={handleSubmit}
                businessCard={businessCard}
                onInputChange={handleChanage}
                loading={updatingBusinessCard}
                error={updateError}
              />
            </div>
            <div className="business-card-edit__card">
              <BusinessCard
                name={businessCard.name}
                username={businessCard.username}
                email={businessCard.email}
                phone={businessCard.phone}
                website={businessCard.website}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function BusinessCardEditErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <BusinessCardEdit {...props}></BusinessCardEdit>
    </ErrorBoundary>
  );
}
