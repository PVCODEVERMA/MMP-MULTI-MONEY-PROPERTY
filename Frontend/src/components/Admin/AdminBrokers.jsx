import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const AdminBrokers = () => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  // Initial dummy data
  const initialBrokers = [
    { 
      id: 1, 
      name: "Shyam Makwana", 
      phone: "9999988888", 
      city: "Ahmedabad", 
      balance: 1450,
      status: "Active",
      profile: "View Profile",
      company: "Makwana Realty",
      joinDate: "2023-01-15",
      rating: 4.5,
      totalDeals: 42
    },
    { 
      id: 2, 
      name: "Rita Patel", 
      phone: "9887766554", 
      city: "Surat", 
      balance: 1200,
      status: "Active",
      profile: "View Profile",
      company: "Patel Properties",
      joinDate: "2022-11-03",
      rating: 4.2,
      totalDeals: 38
    },
    { 
      id: 3, 
      name: "Karan Shah", 
      phone: "9977554433", 
      city: "Vadodara", 
      balance: 800,
      status: "Inactive",
      profile: "View Profile",
      company: "Shah Associates",
      joinDate: "2023-03-22",
      rating: 4.7,
      totalDeals: 27
    },
    { 
      id: 4, 
      name: "Sneha Desai", 
      phone: "9900112233", 
      city: "Rajkot", 
      balance: 1600,
      status: "Active",
      profile: "View Profile",
      company: "Desai Real Estate",
      joinDate: "2022-08-14",
      rating: 4.8,
      totalDeals: 51
    },
  ];

  const [brokers, setBrokers] = useState(initialBrokers);
  const [editedBroker, setEditedBroker] = useState(null);

  // Get unique cities for filter dropdown
  const cities = ['All', ...new Set(initialBrokers.map(broker => broker.city))];
  const statuses = ['All', 'Active', 'Inactive'];

  // Filter brokers based on search term and filters
  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          broker.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          broker.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || broker.status === statusFilter;
    const matchesCity = cityFilter === 'All' || broker.city === cityFilter;
    
    return matchesSearch && matchesStatus && matchesCity;
  });

  const handleViewProfile = (broker) => {
    setSelectedBroker(broker);
    setShowModal(true);
    setEditMode(false);
  };

  const handleEdit = (broker) => {
    setSelectedBroker(broker);
    setEditedBroker({...broker});
    setShowModal(true);
    setEditMode(true);
  };

  const handleSave = () => {
    if (!editedBroker.name || !editedBroker.phone || !editedBroker.city || !editedBroker.company) {
      toast.error('Please fill all required fields');
      return;
    }

    setBrokers(brokers.map(broker => 
      broker.id === editedBroker.id ? editedBroker : broker
    ));
    
    setShowModal(false);
    setEditMode(false);
    setSelectedBroker(null);
    setEditedBroker(null);
    toast.success('Broker updated successfully!');
  };

  const handleDelete = (broker) => {
    if (window.confirm(`Are you sure you want to delete ${broker.name}?`)) {
      setBrokers(brokers.filter(b => b.id !== broker.id));
      toast.success('Broker deleted successfully!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBroker({
      ...editedBroker,
      [name]: value
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedBroker(null);
    setEditedBroker(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setCityFilter('All');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-center" />
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-800">Manage Brokers</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{filteredBrokers.length}</h2>
            <p className="text-gray-600 text-sm md:text-base">Total Brokers</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">₹{filteredBrokers.reduce((acc, broker) => acc + broker.balance, 0)}</h2>
            <p className="text-gray-600 text-sm md:text-base">Total Balance</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{new Set(filteredBrokers.map(broker => broker.city)).size}</h2>
            <p className="text-gray-600 text-sm md:text-base">Cities</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">
              {filteredBrokers.length ? (filteredBrokers.reduce((acc, broker) => acc + broker.rating, 0) / filteredBrokers.length).toFixed(1) : 0}/5
            </h2>
            <p className="text-gray-600 text-sm md:text-base">Avg Rating</p>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-0">
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base appearance-none pr-8"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base appearance-none pr-8"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <button 
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Clear Filters
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search brokers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm md:text-base"
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      {/* Brokers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Phone</th>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">City</th>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Company</th>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Balance (₹)</th>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 md:px-6 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBrokers.length > 0 ? (
                filteredBrokers.map((broker) => (
                  <tr key={broker.id} className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-blue-800">{broker.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{broker.name}</div>
                          <div className="text-gray-500 text-sm">ID: {broker.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      <div className="text-gray-900">{broker.phone}</div>
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      <div className="text-gray-900">{broker.city}</div>
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      <div className="text-gray-900">{broker.company}</div>
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      <div className="text-gray-900 font-medium">₹{broker.balance}</div>
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        broker.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {broker.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewProfile(broker)}
                        className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEdit(broker)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(broker)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No brokers found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Broker Profile/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                {editMode ? 'Edit Broker' : 'Broker Profile'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800">
                  {editMode 
                    ? editedBroker.name.split(' ').map(n => n[0]).join('')
                    : selectedBroker.name.split(' ').map(n => n[0]).join('')
                  }
                </div>
              </div>
              
              {editMode ? (
                <div className="space-y-0.5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedBroker.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedBroker.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={editedBroker.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={editedBroker.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
                    <input
                      type="number"
                      name="balance"
                      value={editedBroker.balance}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={editedBroker.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold">{selectedBroker.name}</h4>
                    <p className="text-gray-600">{selectedBroker.company}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedBroker.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium">{selectedBroker.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Balance</p>
                      <p className="font-medium">₹{selectedBroker.balance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`font-medium ${selectedBroker.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedBroker.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="font-medium">{selectedBroker.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-medium">{selectedBroker.rating}/5</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Total Deals</p>
                      <p className="font-medium">{selectedBroker.totalDeals}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              {editMode ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={closeModal}
                    className="w-full px-5 py-2.5 text-sm font-medium text-center text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={closeModal}
                  className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrokers;