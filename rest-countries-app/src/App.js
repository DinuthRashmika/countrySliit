import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/country/:code" element={<PrivateRoute><CountryDetail /></PrivateRoute>} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
