import React, { useState } from 'react';

const AttachLeads = ({ leads, onAttach }) => {
    const [selectedLeadIds, setSelectedLeadIds] = useState([]);

    const handleSelectLead = (leadId) => {
        setSelectedLeadIds((prev) =>
            prev.includes(leadId)
                ? prev.filter((id) => id !== leadId)
                : [...prev, leadId]
        );
    };

    const handleAttach = () => {
        if (selectedLeadIds.length > 0) {
            onAttach(selectedLeadIds);
            setSelectedLeadIds([]);
        }
    };

    return (
        <div>
            <h2>Attach Leads</h2>
            <ul>
                {leads && leads.length > 0 ? (
                    leads.map((lead) => (
                        <li key={lead.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedLeadIds.includes(lead.id)}
                                    onChange={() => handleSelectLead(lead.id)}
                                />
                                {lead.name}
                            </label>
                        </li>
                    ))
                ) : (
                    <li>No leads available</li>
                )}
            </ul>
            <button onClick={handleAttach} disabled={selectedLeadIds.length === 0}>
                Attach Selected Leads
            </button>
        </div>
    );
};

export default AttachLeads;