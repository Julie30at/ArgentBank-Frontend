import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, updateProfile } from '../../redux/auth/authSlice';
import { Header } from '../../components/header/index';
import { Footer } from '../../components/footer';
import { Tags } from '../../components/tags';
import './index.css';

export function Edit() {
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchProfile());  
    }
  }, [isAuthenticated, token, dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user?.userName || '');
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
    }
  }, [user]);

const handleSave = (e) => {
  e.preventDefault();

  setErrorMessage(''); 

  // Dispatch l'action pour mettre à jour le profil utilisateur
  const action = dispatch(updateProfile({ userName }));

  action.then((result) => {
    if (updateProfile.fulfilled.match(result)) {
      setSuccessMessage('Nom d\'utilisateur mis à jour avec succès!');
      setTimeout(() => {
        setSuccessMessage(''); 
      }, 3000);
    } else {
      setErrorMessage(result.payload || 'Erreur lors de la mise à jour du profil.');
    }
  }).catch((err) => {
    console.error('Erreur réseau ou serveur :', err);
    setErrorMessage('Erreur réseau ou serveur.');
    setSuccessMessage('');
  });
};

  const handleCancel = () => {
    setUserName(user?.userName || '');
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
      <Header pageType="edit" />
      <main>
        {user ? (
          <div className="form-container">
            <h2 className="edit-title">Edit user info</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="username">User name:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First name:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled
                />
              </div>
              <div className="button-group">
                <button type="submit" className="save-button">Save</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="messages">
              {successMessage && <div className="success-message">{successMessage}</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          </div>
        ) : (
          <div>Chargement des données...</div>
        )}
        <Tags isEditPage={true} />
      </main>
      <Footer />
    </div>
  );
}
