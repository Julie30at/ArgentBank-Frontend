import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Connexion } from './pages/connexion';
import { User } from './pages/user';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/connexion' element={<Connexion />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;