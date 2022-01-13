import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import "./Login.css";
import { login } from '../../../api/UserApi';
import jwt_decode from "jwt-decode";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [staiConnect, setStaiConnect] = useState(false);
    const [alarm, setAlarm] = useState(false);
    const [messageAlarm, setMessageAlarm] = useState(false);
    const navigate = useNavigate();

   
    function validateForm() {
        return email.length > 3 && password.length > 5;

    }

    function handleSubmit(event) {
        event.preventDefault();

        login(email, password, staiConnect).then(res => {
            console.log(res.data);

            if (res.data === "Invalid email/password combination") {
                setAlarm(true);
                setMessageAlarm("Invalid email/password combination");

            } else {
                localStorage.setItem("rol", res.data.rol);
                localStorage.setItem("userName", res.data.name);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("id", res.data.id);
                navigate('/');
            }
        });

    }

    return (
        <div className="Login">
            <div className="container">
                <div className="row">
                    <Form onSubmit={handleSubmit}>
                        {alarm &&
                            <div visi className="alert alert-danger" role="alert">
                                {messageAlarm}
                            </div>}
                        <h1 className="text-center py-2">Login</h1>
                        <Form.Group className="py-2" size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>

                        </Form.Group>
                        <Form.Group className="py-2" size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                  
                        <input className="btn btn-primary py-2" name="commit" type="submit"
                            value="Login" disabled={!validateForm()} />
                        <br></br> <br />
                        <div className='text-center'><a className=" py-2" href="\SingUp">Sing Up</a></div>
                    </Form>

                </div>
            </div>
        </div>
    );
}

export default Login;
