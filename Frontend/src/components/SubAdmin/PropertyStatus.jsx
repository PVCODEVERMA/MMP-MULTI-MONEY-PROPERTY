import React from 'react';

const PropertyStatus = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'green';
            case 'Inactive':
                return 'red';
            case 'Pending':
                return 'orange';
            default:
                return 'gray';
        }
    };

    return (
        <span
            style={{
                padding: '6px 12px',
                borderRadius: '4px',
                backgroundColor: getStatusColor(status),
                color: 'white',
                fontWeight: 'bold',
            }}
        >
            {status || 'Unknown'}
        </span>
    );
};

export default PropertyStatus;