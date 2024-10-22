import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LandingBody from './component/LandingBody/LandingBody.jsx';
import Auth from './component/Auth/Auth.jsx';
import Home from './component/Home/Home.jsx';
import ImgView from './component/ImgView/ImgView.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Auth />} />
      <Route path='home' element={<Home />} />
      <Route path='landingpage' element={<LandingBody />} />
      <Route path='Image' element={<ImgView />} />
    </Route>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
