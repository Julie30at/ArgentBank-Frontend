import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './redux/store'; 
import App from './App'; 
import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>   
    <Provider store={store}>
      {/* Fournit le store Redux à tous les composants. */}
      <PersistGate persistor={persistor}>
        {/* Bloque le rendu de l'application tant que l'état persistant n'est pas restauré. */}
        <App />        
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
