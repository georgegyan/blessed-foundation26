import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import JoinUs from './pages/JoinUs';
import Donate from './pages/Donate';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;