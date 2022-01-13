import React from 'react';
import "./Header.css"
import { useNavigate } from 'react-router-dom';
import { logOutSesion } from '../../api/UserApi';
function Header() {
    const navigate = useNavigate();

    var userName = localStorage.getItem("userName");
    var isAuthenticaion = localStorage.getItem("userName");
    var rol = localStorage.getItem("rol");
    function logOut() {
        localStorage.removeItem("userName");
        logOutSesion().then(response => {
            navigate('/');
            window.location.reload();
        })
    
    }
    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Jogging Application</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <ul className="navbar-nav mr-auto">
                            {isAuthenticaion === null &&

                                <li className="nav-item mr-auto">
                                    <a className="nav-link " href="/Login">Login</a>
                                </li>

                            }
                            {isAuthenticaion !== null && <li className="nav-item mr-auto">
                                <a className="nav-link " onClick={logOut}>Log Out</a>
                            </li>}

                        </ul>
                    </span>
                </div>
            </nav>
        </div>
    );
}

export default Header;
