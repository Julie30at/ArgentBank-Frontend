import { useState } from 'react';
import { Header } from '../../components/header';
import { SignInContent } from '../../components/SignInContent';
import { Footer } from '../../components/footer';

export function Connexion() {
  
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <div>
      <Header 
        token={token} 
        username={username} 
        setToken={setToken} 
        setUsername={setUsername} 
        pageType="connexion"  
      />
      <SignInContent />
      <Footer />
    </div>
  );
}
