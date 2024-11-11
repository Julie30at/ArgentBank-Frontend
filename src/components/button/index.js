// components/Button.js
import React from "react";
import { NavLink } from "react-router-dom"; // Import de NavLink
import './index.css';

export function Button({ label, onClick, to, type }) {
  const buttonClass = type === 'transaction' ? 'transaction-button' : 'edit-button';

  // Si la prop "to" est fournie, utilise NavLink pour la navigation
  if (to) {
    return (
      <NavLink to={to}>
        <button className={buttonClass}>
          {label}
        </button>
      </NavLink>
    );
  }

  // Sinon, utiliser un simple bouton avec la fonction "onClick"
  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
}
