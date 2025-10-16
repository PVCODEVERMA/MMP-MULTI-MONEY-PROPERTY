import React, { useState } from 'react';

const AddEditProperty = ({ initialData = {}, onSave }) => {
    const [form, setForm] = useState({
        name: initialData.name || '',
        address: initialData.address || '',
        price: initialData.price || '',
        status: initialData.status || 'available',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>{initialData.id ? 'Edit Property' : 'Add Property'}</h2>
            <div>
                <label>Name:</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Status:</label>
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <button type="submit">
                {initialData.id ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

export default AddEditProperty;