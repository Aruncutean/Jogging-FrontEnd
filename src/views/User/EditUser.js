import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { readUser, updateUser } from '../../api/UserApi';

function Edit() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect((e) => {
        console.log(id);
        readUser(id).then(response => {
            console.log(response);
            setName(response.data.name);
            setEmail(response.data.email);
            setRol(response.data.rol);
        })

    }, [1])

    function validation() {


        return name.length > 0 && email.length > 0 && email.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateUser(id, name, email, rol).then(response => {
            console.log(response);
            navigate('/');
        })
    }


    return (
        <div className="Edit">
            <div className="container">

                <div className="container">
                    <div className="row">
                        <Form onSubmit={handleSubmit}>

                            <h1 className="text-center py-2">Edit User</h1>
                            <Form.Group className="py-2" size="lg" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className="py-2" size="lg" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className="py-2" size="lg" controlId="name">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control autoFocus type="text" value={rol} onChange={(e) => setRol(e.target.value)}></Form.Control>
                            </Form.Group>
                        
                            <br></br>
                            <input className="btn btn-primary py-2" name="commit" type="submit"
                                value="Save Update" disabled={!validation()} />

                        </Form>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Edit;
