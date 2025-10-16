import React, { useState } from 'react';

const mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com', active: false },
    { id: 2, name: 'Bob', email: 'bob@example.com', active: false },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', active: true },
];

const ActivateUsers = () => {
    const [users, setUsers] = useState(mockUsers);

    const handleActivate = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, active: true } : user
            )
        );
    };

    return (
        <div>
            <h2>Activate Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.active ? 'Active' : 'Inactive'}</td>
                            <td>
                                {!user.active && (
                                    <button onClick={() => handleActivate(user.id)}>
                                        Activate
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivateUsers;