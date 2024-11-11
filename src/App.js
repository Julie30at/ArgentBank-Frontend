import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Connexion } from './pages/connexion';
import { User } from './pages/user';
import { Edit } from './pages/edit';
import { Transactions } from './pages/transactions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/connexion' element={<Connexion />} />
        <Route path='/user' element={<User />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;