import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";

import { USER_API_URL } from './../../utils/Constants';
import UserContext from '../../contexts/User/userContext';

const Users = () => {
    const userContext = useContext(UserContext)
    const { usersList, setUsersList, setSelectedUser, error, setError } = userContext;
    useEffect(() => {
        setSelectedUser(null);
        setError(null);
        axios.get(`${USER_API_URL}`)
            .then(response => {
                setUsersList(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const handleDelete = (e) => {
        e.preventDefault();
        const userId = e.target.getAttribute('data-id');
        var result = confirm("Are you sure want to delete?");
        if (result) {
            axios.delete(`${USER_API_URL}/${userId}`)
                .then(response => {
                    setUsersList(usersList.filter(user => user.id !== parseInt(userId)));
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }
    return (
        <>
            <div className="row">
                {error && <div className="col alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
            </div>
            <div className="row">

                <div className="col m6 offset-m3">
                    <div className="row mt-2">
                        <div className='col'>
                            <h2>Users</h2>
                        </div>
                        <div className='col m1'>
                            <Link to={`/users/add`} className='btn btn-success float-right m1'>Add User</Link>
                        </div>
                    </div>

                    <table className='table table-striped bordered hover'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.length > 0 ? usersList.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/users/${user.id}`} className='btn btn-info'>View</Link>
                                        <Link to={`/users/${user.id}/edit`} className='btn btn-warning ml-2'>Edit</Link>
                                        <a href={`#`} className='btn btn-danger ml-2' onClick={handleDelete} data-id={user.id}>Delete</a>
                                    </td>
                                </tr>
                            )) : <tr><td className='text-center' colSpan='5'>No users found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Users;