import React from 'react';

const ActiveUsers = () => {
    // Example data, replace with your actual data source or fetch logic
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
        { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Active' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
    ];

    return (
        <div>
            <h2>Active Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveUsers;