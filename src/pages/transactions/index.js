import { useState } from 'react';
import { Footer } from "../../containers/footer";
import { Header } from "../../containers/header";

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
      <main></main>
      <Footer />
         </div>
    );
}