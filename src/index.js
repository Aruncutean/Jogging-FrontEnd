import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './index.css';

import Login from './views/Auth//Login/Login';
import SingUp from './views/Auth/SingUp/SingUp';
import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import Edit from './views/ListTime/Edit';
import UsersPage from './views/User/UsersPage';
import ListTime from './views/ListTime/ListTime';
import EditUser from './views/User/EditUser';
ReactDOM.render(
  <div>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/userPage" element={<UsersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singUp" element={<SingUp />} />
        <Route path="/ListTime" element={<ListTime />} />
        <Route path="/ListTime/:id" element={<ListTime />} />
        <Route path="/edit/:id" element={<Edit />} />     
         <Route path="/editUser/:id" element={<EditUser/>} />
      </Routes>
    </BrowserRouter>
    <Footer></Footer>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
