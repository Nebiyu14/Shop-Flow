import './pageNotFound.css'
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound__container">
      <div className="notfound__content">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__message">
          Looks like this page wandered off. Let's get you back to shopping.
        </p>
        <Link to="/" className="notfound__btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
