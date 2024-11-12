import React from "react";
import { NavLink } from "react-router-dom";
import './index.css';

export function Button({ label, onClick, to, type }) {
  const buttonClass = type === 'transaction' ? 'transaction-button' : 'edit-button';

  if (to) {
    return (
      <NavLink to={to}>
        <button className={buttonClass}>
          {label}
        </button>
      </NavLink>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
}
