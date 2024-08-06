import React from 'react';
import '../ReservationButton.css';

const ReservationButton = ({ onClick }) => {
  return (
    <button className="reservation-button" onClick={onClick}>
      BOOK A TABLE
    </button>
  );
};

export default ReservationButton;
