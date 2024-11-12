import { useState } from 'react';
import { Header } from '../../components/header/index';
import { Footer } from '../../components/footer';
import { Banner } from '../../components/banner';
import { Features } from '../../components/features';

export function Home() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <div>
      <Header 
        token={token} 
        username={username} 
        setToken={setToken} 
        setUsername={setUsername} 
        pageType="home"  
      />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
