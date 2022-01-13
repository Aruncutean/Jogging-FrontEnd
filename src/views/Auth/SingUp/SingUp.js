import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { singUp } from '../../../api/UserApi';
import "./SingUp.css"

function SingUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [alarm, setAlarm] = useState(false);
    const [messageAlarm, setMessageAlarm] = useState("");
    const navigate = useNavigate();
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        singUp(name, email, password, passwordConfirmation).then(response => {
            if (response.status == 201) {
                navigate('/');
            } else if (response.status == 200) {
                setAlarm(true)
                setMessageAlarm(response.data) 
            }
            else {
                setAlarm(true)
                setMessageAlarm("Status: " + response.status + "\n" + response.error)
            }
            console.log(response);
        }).catch(error=> {
       console.log(error.response.data)
     
    
        })

    }

    return (
        <div className="SingUp">
            <div className="container">
                <div className="row">
                    <Form onSubmit={handleSubmit}>
                        {alarm &&
                            <div visi className="alert alert-danger" role="alert">
                                {messageAlarm}
                            </div>}
                        <h1 className="text-center py-2">SingUp</h1>
                        <Form.Group className="py-2" size="lg" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className="py-2" size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className="py-2" size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="py-2" size="lg" controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <input className="btn btn-primary py-2" name="commit" type="submit"
                            value="Sing Up" disabled={!validateForm()} />

                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SingUp;
