// components/Button.js
import React from "react";
import './index.css';

export function Button({ label, onClick }) {
  return (
    <button className="edit-button" onClick={onClick}>
      {label}
    </button>
  );
}
