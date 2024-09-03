import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from '../../contexts/User/userContext';
import { USER_API_URL } from '../../utils/Constants';

const ManageUser = () => {
    const { userId } = useParams();
    const userContext = useContext(UserContext)
    const { selectedUser, setSelectedUser, error, setError } = userContext;
    const navigate = useNavigate();

    useEffect(() => {
        setError(null);
        if (userId) {
            axios.get(`${USER_API_URL}/${userId}`)
                .then(response => {
                    setSelectedUser(response.data);
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [userId, setSelectedUser, setError]);

    const handleSubmit = e => {
        e.preventDefault();
        if (userId) {
            axios.put(`${USER_API_URL}/${userId}`, {
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                username: e.target.username.value,
                email: e.target.email.value
            })
                .then(response => {
                    navigate('/')
                })
                .catch(error => {
                    setError(error.message);
                });
            return;
        } else {
            axios.post(USER_API_URL, {
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                username: e.target.username.value,
                email: e.target.email.value
            })
                .then(response => {
                    navigate('/')
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }
    function handleChange(e) {
        if (userId) {
            setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
        }
    }
    return (
        <div className="row">
            <div className="col m6 offset-m3">
                <Link to={`/`} className='mt-3 btn btn-warning mb-2'>{'<< Back to users'}</Link>
                {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <h2 className='text-center mb-3'> {userId ? 'Update ' + selectedUser?.first_name : 'Add new user'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-5">
                        <label htmlFor="first_name" className="col-sm-2 col-form-label">First name</label>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter first name" id="first_name" name="first_name" required value={selectedUser?.first_name} onChange={handleChange} />
                        </div>
                        <label htmlFor="last_name" className="col-sm-2 col-form-label">Last name</label>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter last name" id="last_name" name="last_name" required value={selectedUser?.last_name} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter userame" id="username" name="username" required value={selectedUser?.username} onChange={handleChange} />
                        </div>
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter email" id="email" name="email" required value={selectedUser?.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <button type="submit" className="btn btn-primary">{userId ? 'Update' : 'Submit'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManageUser;