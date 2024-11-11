import { useState } from 'react';
import { Header } from '../../containers/header/index';
import { Footer } from '../../containers/footer';
import { Banner } from '../../containers/banner';
import { Features } from '../../containers/features';

export function Home() {
  // Récupérer le token et le username depuis le localStorage, si disponibles
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <div>
      <Header 
        token={token} 
        username={username} 
        setToken={setToken} 
        setUsername={setUsername} 
        pageType="home"  // Définir le type de page ici
      />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
