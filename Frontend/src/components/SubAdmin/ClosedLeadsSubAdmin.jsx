import React, { useEffect, useState } from 'react';

const ClosedLeadsSubAdmin = () => {
    const [closedLeads, setClosedLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API endpoint
        fetch('/api/closed-leads')
            .then((res) => res.json())
            .then((data) => {
                setClosedLeads(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading closed leads...</div>;
    }

    return (
        <div>
            <h2>Closed Leads</h2>
            {closedLeads.length === 0 ? (
                <div>No closed leads found.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Lead ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Closed Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {closedLeads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.status}</td>
                                <td>{lead.closedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClosedLeadsSubAdmin;