
import React from 'react';
import { Link } from "react-router-dom";
import { deleteUser, readAllUser } from '../../api/UserApi';



class UsersPage extends React.Component {
    state = {
        users: []
    }
   
    componentDidMount() {
        readAllUser().then(response => {
            console.log(response)
            this.setState({ users: response.data })
        }).catch(error => {
            console.log(error.response)
        });
    }

    deleteUser(id){
        deleteUser(id).then(response=>{
            readAllUser().then(response => {
                console.log(response.data)
                this.setState({ users: response.data })
            })
        })
    }

    rol() {
        return localStorage.getItem("rol");
    }

    render() {
        return (

            <div className="Users">
                <div className="container">
                    <br></br>
                    <div className='col'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    {this.rol() === "admin" &&
                                        <th scope="col">View</th>
                                    }
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((r, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{r.name} </td>
                                        <td>{r.email} </td>
                                        <td>{r.rol} </td>
                                        {this.rol() === "admin" &&
                                            <td><Link to={`/ListTime/${r.id}`}><button type="button" class="btn btn-info">View</button></Link> </td>
                                        }
                                        <td><Link to={`/editUser/${r.id}`}><button type="button" class="btn btn-secondary">Edit</button></Link> </td>
                                        <td><button type="button" class="btn btn-danger" onClick={(e)=>this.deleteUser(r.id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default UsersPage;
