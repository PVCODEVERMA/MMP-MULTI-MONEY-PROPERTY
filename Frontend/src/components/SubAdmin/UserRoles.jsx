import React from 'react';

const UserRoles = () => {
    // Example roles data
    const roles = [
        { id: 1, name: 'Admin', description: 'Full access to all features.' },
        { id: 2, name: 'Editor', description: 'Can edit content.' },
        { id: 3, name: 'Viewer', description: 'Can view content only.' },
    ];

    return (
        <div>
            <h2>User Roles</h2>
            <table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>{role.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserRoles;