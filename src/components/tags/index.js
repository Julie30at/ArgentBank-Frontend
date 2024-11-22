import React from 'react';
import './index.css';
import { Button } from '../button';
import { NavLink } from 'react-router-dom';

export function Tags({ isTransactionPage, isEditPage, isUserPage }) {
  return (
    <div>
      {/* Rendu pour la page utilisateur ou la page de base */}
      {(isUserPage || (!isTransactionPage && !isEditPage)) && (
        <>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <Button label="View transactions" to="/transactions" type="transaction" />
            </div>
          </section>

          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <Button label="View transactions" to="/transactions" type="transaction" />
            </div>
          </section>

          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <Button label="View transactions" to="/transactions" type="transaction" />
            </div>
          </section>
        </>
      )}

      {/* Rendu pour la page edit */}
      {isEditPage && (
        <>
          <section className="account account-edit">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <NavLink to="/transactions" className="arrow-right">
                <i className="fa fa-solid fa-chevron-right"></i>
              </NavLink>
            </div>
          </section>

          <section className="account account-edit">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
             <NavLink to="/transactions" className="arrow-right">
                <i className="fa fa-solid fa-chevron-right"></i>
              </NavLink>
            </div>
          </section>

          <section className="account account-edit">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <NavLink to="/transactions" className="arrow-right">
                <i className="fa fa-solid fa-chevron-right"></i>
              </NavLink>
            </div>
          </section>
        </>
      )}

      {/* Rendu pour la page transaction */}
      {isTransactionPage && (
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button className="exit" label="X" to="/user" type="transaction" />
          </div>
        </section>
      )}
    </div>
  );
}
