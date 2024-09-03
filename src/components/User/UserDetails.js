import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";

import { USER_API_URL } from './../../utils/Constants';
import UserContext from '../../contexts/User/userContext';

const UserDetails = () => {
    const userContext = useContext(UserContext)
    const { userId } = useParams();
    const { selectedUser, setSelectedUser, error, setError } = userContext
    useEffect(() => {
        setError(null);
        axios.get(`${USER_API_URL}/${userId}`)
            .then(response => {
                setSelectedUser(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [setSelectedUser, setError]);

    return (
        <div className="row">
            <div className="col m6 offset-m3">
                <Link to={`/`} className='mt-3 btn btn-warning'>{'<< Back to users'}</Link>
                {error ? <div className="alert alert-danger mt-3" role="alert"> {error} </div> :
                    <>
                        <h2 className='text-center mb-5'>User Detail - {selectedUser?.first_name}</h2>
                        <div className="row mb-2">
                            <label htmlFor="first_name" className="col-sm-2 col-form-label"><strong>First name:</strong> </label>
                            <div className="col">
                                <span>{selectedUser?.first_name}</span>
                            </div>
                            <label htmlFor="last_name" className="col-sm-2 col-form-label"><strong>Last name:</strong></label>
                            <div className="col">
                                <span>{selectedUser?.last_name}</span>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label htmlFor="username" className="col-sm-2 col-form-label"><strong>Username:</strong></label>
                            <div className="col">
                                <span>{selectedUser?.username}</span>
                            </div>
                            <label htmlFor="email" className="col-sm-2 col-form-label"><strong>Email:</strong></label>
                            <div className="col">
                                <span>{selectedUser?.email}</span>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label htmlFor="username" className="col-sm-2 col-form-label"><strong>Created On:</strong></label>
                            <div className="col">
                                <span>{new Date(selectedUser?.created).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                            <label htmlFor="email" className="col-sm-2 col-form-label"><strong>Updated On:</strong></label>
                            <div className="col">
                                <span>{new Date(selectedUser?.modified).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default UserDetails;