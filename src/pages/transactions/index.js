import { useState } from 'react';
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Tags } from '../../components/tags';

export function Transactions() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    return(
          <div>
      <Header 
        token={token} 
        username={username} 
        setToken={setToken} 
        setUsername={setUsername} 
        pageType="edit"
      />
      <main>
        <Tags isTransactionPage={true} />
      </main>
      <Footer />
         </div>
    );
}