import { useState } from 'react';
import { Header } from '../../containers/header';
import { Form } from '../../components/form';
import { Footer } from '../../containers/footer';

export function Connexion() {
  // Déclarez les états pour le token et le username
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

 return (
  <div>
    <Header token={token} username={username} setToken={setToken} setUsername={setUsername} />
    <Form />
    <Footer />
  </div>
);
}
