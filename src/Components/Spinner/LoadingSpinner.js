import React from "react";
import "../../Style/spinner.css";

export default function LoadingSpinner({text,theme}) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <h3 style={{ color: theme ? 'white' : 'black' }}>{text}</h3>
    </div>
  );
}