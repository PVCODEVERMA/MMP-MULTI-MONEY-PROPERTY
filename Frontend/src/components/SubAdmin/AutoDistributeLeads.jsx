import React, { useState } from 'react';

const AutoDistributeLeads = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
        setIsEnabled(prev => !prev);
        // Add logic to enable/disable auto distribution here
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Auto Distribute Leads</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={handleToggle}
                />
                Enable Auto Distribution
            </label>
            <div style={{ marginTop: '1rem' }}>
                {isEnabled
                    ? <span style={{ color: 'green' }}>Auto distribution is enabled.</span>
                    : <span style={{ color: 'red' }}>Auto distribution is disabled.</span>
                }
            </div>
        </div>
    );
};

export default AutoDistributeLeads;