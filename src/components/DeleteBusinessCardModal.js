import Modal from "./Modal";
import "./styles/DeleteBusinessCardModal.css";
import "./styles/Button.css";
import { useContext } from "react";
import { ThemeContext, themes } from "./ThemeContext";

const DeleteBusinessCardModal = ({
  onDeleteClick,
  onCancelClick,
  loading,
  error,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Modal>
      <div
        className={`delete-business-card-modal ${
          theme === themes.light ? "" : "delete-business-card-modal--dark"
        }`}
      >
        <div className="delete-business-card-modal__content">
          <h2 className="delete-business-card-modal__title">Are you sure?</h2>
          <p className="delete-business-card-modal__subtitle">
            You are about to delete this business card.
          </p>
          <div className="delete-business-card-modal__buttons">
            <button
              className={`button button--danger ${
                loading ? "button--loading" : ""
              }`}
              onClick={onDeleteClick}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button className="button" onClick={onCancelClick}>
              Cancel
            </button>
          </div>
          {error && (
            <p class="delete-business-card-modal__error">{`Error: ${error.message}`}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBusinessCardModal;
