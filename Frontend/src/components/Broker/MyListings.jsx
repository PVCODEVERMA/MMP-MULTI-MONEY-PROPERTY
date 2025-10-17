import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ArrowsRightLeftIcon,
  HomeIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import {
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Dummy data for property listings
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const dummyListings = [
          {
            id: 1,
            title: 'Luxury 3BHK Apartment in Sector 45',
            type: 'Apartment',
            category: 'residential',
            purpose: 'sell',
            price: 12500000,
            area: 1850,
            bedrooms: 3,
            bathrooms: 3,
            location: 'Sector 45, Gurgaon',
            city: 'Gurgaon',
            status: 'active',
            views: 142,
            inquiries: 8,
            postedDate: '2024-01-10',
            images: [
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
            ],
            featured: true,
            verified: true,
          },
          {
            id: 2,
            title: 'Modern 2BHK for Rent in Cyber City',
            type: 'Apartment',
            category: 'residential',
            purpose: 'rent',
            price: 45000,
            area: 1200,
            bedrooms: 2,
            bathrooms: 2,
            location: 'Cyber City, Gurgaon',
            city: 'Gurgaon',
            status: 'active',
            views: 89,
            inquiries: 12,
            postedDate: '2024-01-12',
            images: [
              'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400',
            ],
            featured: false,
            verified: true,
          },
          {
            id: 3,
            title: 'Commercial Office Space in MG Road',
            type: 'Office',
            category: 'commercial',
            purpose: 'rent',
            price: 125000,
            area: 2200,
            bedrooms: null,
            bathrooms: 4,
            location: 'MG Road, Gurgaon',
            city: 'Gurgaon',
            status: 'inactive',
            views: 45,
            inquiries: 3,
            postedDate: '2024-01-05',
            images: [
              'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
            ],
            featured: false,
            verified: false,
          },
          {
            id: 4,
            title: 'Villa in DLF Phase 3',
            type: 'Villa',
            category: 'residential',
            purpose: 'sell',
            price: 35000000,
            area: 4500,
            bedrooms: 4,
            bathrooms: 5,
            location: 'DLF Phase 3, Gurgaon',
            city: 'Gurgaon',
            status: 'active',
            views: 210,
            inquiries: 15,
            postedDate: '2024-01-08',
            images: [
              'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400',
            ],
            featured: true,
            verified: true,
          },
          {
            id: 5,
            title: 'Shop in South Point Mall',
            type: 'Shop',
            category: 'commercial',
            purpose: 'rent',
            price: 75000,
            area: 800,
            bedrooms: null,
            bathrooms: 1,
            location: 'South Point Mall, Gurgaon',
            city: 'Gurgaon',
            status: 'active',
            views: 67,
            inquiries: 6,
            postedDate: '2024-01-15',
            images: [
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
            ],
            featured: false,
            verified: true,
          },
        ];
        setListings(dummyListings);
        setLoading(false);
      }, 1500);
    };

    fetchListings();
  }, []);

  const handleDelete = (id) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
    setDeleteConfirm(null);
    // In real app, you would call API here
  };

  const handleStatusToggle = (id) => {
    setListings(prev => prev.map(listing =>
      listing.id === id
        ? { ...listing, status: listing.status === 'active' ? 'inactive' : 'active' }
        : listing
    ));
  };

  const handleFeatureToggle = (id) => {
    setListings(prev => prev.map(listing =>
      listing.id === id
        ? { ...listing, featured: !listing.featured }
        : listing
    ));
  };

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    if (filter === 'active') return listing.status === 'active';
    if (filter === 'inactive') return listing.status === 'inactive';
    if (filter === 'residential') return listing.category === 'residential';
    if (filter === 'commercial') return listing.category === 'commercial';
    if (filter === 'sell') return listing.purpose === 'sell';
    if (filter === 'rent') return listing.purpose === 'rent';
    return true;
  });

  const formatPrice = (price, purpose) => {
    if (purpose === 'rent') {
      return `₹${price.toLocaleString()}/month`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getPurposeColor = (purpose) => {
    return purpose === 'sell' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BuildingOfficeIcon className="h-8 w-8 text-[#154045]" />
              My Property Listings
            </h1>
            <p className="text-gray-600 mt-2">Manage and track your property listings</p>
          </div>
          <Link
            to="/broker/properties/add"
            className="mt-4 lg:mt-0 flex items-center gap-2 px-6 py-3 bg-[#ff9c00] text-white rounded-lg hover:bg-[#e68a00] transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Property
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{listings.length}</div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">
              {listings.filter(l => l.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-600">
              {listings.filter(l => l.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-orange-600">
              {listings.reduce((sum, l) => sum + l.views, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Listings', count: listings.length },
              { key: 'active', label: 'Active', count: listings.filter(l => l.status === 'active').length },
              { key: 'inactive', label: 'Inactive', count: listings.filter(l => l.status === 'inactive').length },
              { key: 'residential', label: 'Residential', count: listings.filter(l => l.category === 'residential').length },
              { key: 'commercial', label: 'Commercial', count: listings.filter(l => l.category === 'commercial').length },
              { key: 'sell', label: 'For Sale', count: listings.filter(l => l.purpose === 'sell').length },
              { key: 'rent', label: 'For Rent', count: listings.filter(l => l.purpose === 'rent').length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-[#154045] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  filter === key ? 'bg-[#ff9c00]' : 'bg-gray-300'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-4">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Property Image */}
                <div className="lg:w-64 lg:h-48 h-48 relative flex-shrink-0">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                      {listing.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPurposeColor(listing.purpose)}`}>
                      For {listing.purpose}
                    </span>
                    {listing.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    {listing.verified && (
                      <CheckBadgeIcon className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          {listing.category === 'residential' ? (
                            <HomeIcon className="h-4 w-4" />
                          ) : (
                            <BuildingStorefrontIcon className="h-4 w-4" />
                          )}
                          <span>{listing.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>Posted {formatDate(listing.postedDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#154045] mb-1">
                        {formatPrice(listing.price, listing.purpose)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {listing.area.toLocaleString()} sq.ft
                      </div>
                    </div>
                  </div>

                  {/* Property Specifications */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    {listing.bedrooms && (
                      <div>
                        <span className="font-medium text-gray-700">Bedrooms:</span>
                        <span className="text-gray-600 ml-2">{listing.bedrooms}</span>
                      </div>
                    )}
                    {listing.bathrooms && (
                      <div>
                        <span className="font-medium text-gray-700">Bathrooms:</span>
                        <span className="text-gray-600 ml-2">{listing.bathrooms}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Views:</span>
                      <span className="text-gray-600 ml-2">{listing.views}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Inquiries:</span>
                      <span className="text-gray-600 ml-2">{listing.inquiries}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusToggle(listing.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          listing.status === 'active'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        } transition-colors`}
                      >
                        {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleFeatureToggle(listing.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          listing.featured
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {listing.featured ? 'Remove Featured' : 'Make Featured'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(listing.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first property listing.</p>
            <Link
              to="/broker/property/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff9c00] text-white rounded-lg hover:bg-[#e68a00] transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Add New Property
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this property listing? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;