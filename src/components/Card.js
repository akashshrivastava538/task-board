import React from "react";

function CardComponent({ title, description, buttonText }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <span className="icon check-icon">&#10003;</span>
          {title}
        </h5>
        <p className="card-text">
          <span className="icon exclamation-icon">&#9888;</span>
          {description}
        </p>
        <a href="#" className="btn btn-primary">
          <span className="icon user-icon">&#128100;</span>
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default CardComponent;
