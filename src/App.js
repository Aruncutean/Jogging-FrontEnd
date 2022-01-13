
import './App.css';
import React from 'react';

import ListTime from './views/ListTime/ListTime';
import UsersPage from './views/User/UsersPage';

function App() {

  var isAuthenticaion = localStorage.getItem("userName");
  var rol = localStorage.getItem("rol");



  return (

    <div className="App">
      {!isAuthenticaion &&
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Hello, world!</h1>
            <p>This is a simple jogging program management application</p>
            <a href='/SingUp'>  <button type="button" className='btn btn-primary'>
              Sing Up
            </button></a>
          </div>
        </div>
      }
      {isAuthenticaion && rol=="normal" &&
        <ListTime />
      }
        {isAuthenticaion && (rol=="manager" || rol=="admin") &&
         <div>
           <UsersPage/>
           </div>
      }  


    </div>
  );
}

export default App;
