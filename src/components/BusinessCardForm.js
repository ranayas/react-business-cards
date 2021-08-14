import "./styles/BusinessCardForm.css";
import "./styles/Button.css";
import "./styles/Input.css";

const BusinessCardForm = ({ businessCard, onSubmit, onInputChange, loading, error }) => {
  return (
    <form className="business-card-form" onSubmit={onSubmit}>
      <div className="container">
        <div className="business-card-form__flex">
          <div className="business-card-form__group">
            <label className="business-card-form__label">Name</label>
            <input
              onChange={onInputChange}
              value={businessCard.name}
              name="name"
              className="input"
            />
          </div>
          <div className="business-card-form__group">
            <label className="business-card-form__label">Username</label>
            <input
              onChange={onInputChange}
              value={businessCard.username}
              name="username"
              className="input"
            />
          </div>
          <div className="business-card-form__group">
            <label className="business-card-form__label">Email</label>
            <input
              onChange={onInputChange}
              value={businessCard.email}
              name="email"
              className="input"
            />
          </div>
          <div className="business-card-form__group">
            <label className="business-card-form__label">Phone</label>
            <input
              onChange={onInputChange}
              value={businessCard.phone}
              name="phone"
              className="input"
            />
          </div>
          <div className="business-card-form__group">
            <label className="business-card-form__label">Website</label>
            <input
              onChange={onInputChange}
              value={businessCard.website}
              name="website"
              className="input"
            />
          </div>
          <button className={`button ${loading && 'button--loading'}`} disabled={loading ? true : false}>
            {loading ? "Loading..." : "Save"}
          </button>
          {error && <p className="business-card-form__error">{`Error: ${error.message}`}</p>}
        </div>
      </div>
    </form>
  );
};

export default BusinessCardForm;
