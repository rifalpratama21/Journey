import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { Bookmark } from './pages/Bookmark';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/bookmark" element={<PrivateRoute />}>
          <Route path="/bookmark" element={<Bookmark />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
