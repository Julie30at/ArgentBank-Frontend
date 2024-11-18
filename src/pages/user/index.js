import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/auth/authSlice";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Tags } from "../../components/tags";
import { Button } from "../../components/button";
import './index.css';

export function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth); // Utilisation du Redux pour récupérer l'utilisateur et le token
  const firstName = user?.firstName || 'User';
  const lastName = user?.lastName || '';

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchProfile(token)); // Récupère les données du profil si le token est présent
    }
  }, [token, user, dispatch]);

  const handleEditClick = () => {
    navigate('/edit'); // Redirection vers la page d'édition 
  };

  return (
    <div>
      <Header pageType="user" />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back <br />
            {firstName} {lastName} ! <br />
          </h1>
          <Button label="Edit Name" onClick={handleEditClick} /> {/* Utilise handleEditClick avec navigate */}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Tags isUserPage={true} />
      </main>
      <Footer />
    </div>
  );
}
