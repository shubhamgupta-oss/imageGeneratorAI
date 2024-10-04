import './App.css';
import Nav from './component/Navbar/Nav.jsx';
import Footer from './Footer/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
 

  return (
    <div className="App">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
