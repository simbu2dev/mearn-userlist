import React, { useState } from 'react';

import UserContext from './userContext'

const UserContextProvider = props => {
    const [usersList, setUsersList] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    return (
        <UserContext.Provider value={{ usersList, setUsersList, selectedUser, setSelectedUser, error, setError }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider