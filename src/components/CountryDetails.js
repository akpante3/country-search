import React, { useEffect, useState } from "react";
import Map from "./Map";
import Modal from "react-modal";
import "./CountryDetail.scss";

function CountryDetails({
  name,
  flag,
  continent,
  capital,
  location,
  onClose,
  lat,
  lng,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    onClose();
  }

  useEffect(() => {
    if (name) {
      openModal();
    }
  }, [name]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "100%",
      maxWidth: "700px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div>
          <h1 className="country-detail__name">{name}</h1>
          <img className="country-detail__flag" src={flag} alt="flag" />
        </div>
        <button onClick={closeModal}>Close Modal</button>
        <div className="country-detail__body">
          <div>
            <h2 className="country-detail__sub-header">Continent: </h2>
            {continent}
          </div>
          <div>
            <h2 className="country-detail__sub-header">Capital: </h2>
            {capital}
          </div>
        </div>
        <div className="country-detail__map">
          <Map lat={lng} lng={lat} />
        </div>
        <br />
        <a className="button" href={location} target="_blank" rel="noreferrer">
          Google Location
        </a>
      </Modal>
    </div>
  );
}

export default CountryDetails;
