import './App.css';
import Nav from './component/Navbar/Nav.jsx';
import Footer from './component/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

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