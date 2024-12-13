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
  const { token, user } = useSelector((state) => state.auth); 
  const { firstName, lastName } = user; 

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));  
    }
  }, [token, dispatch]);

  const handleEditClick = () => {
    navigate('/edit');  
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
          <Button label="Edit Name" onClick={handleEditClick} /> 
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Tags isUserPage={true} />
      </main>
      <Footer />
    </div>
  );
}
