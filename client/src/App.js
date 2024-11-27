import './App.css';
import Nav from './component/Navbar/Nav.jsx';
import Footer from './component/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
 

  return (
    <div className="App">
      <Nav />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000} // Time in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Themes: "light", "dark", "colored"
      />
    </div>

  );
}

export default App;