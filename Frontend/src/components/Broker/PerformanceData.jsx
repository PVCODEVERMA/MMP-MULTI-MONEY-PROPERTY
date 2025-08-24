import React, { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowsUpDownIcon
} from "@heroicons/react/24/outline";

const brokerData = [
  { name: "Shyam Makwana", assigned: 120, contacted: 90, converted: 28, invalid: 10, avgResponse: "42 min", lastActive: "2025-08-23 09:45" },
  { name: "Rita Patel", assigned: 70, contacted: 66, converted: 15, invalid: 2, avgResponse: "32 min", lastActive: "2025-08-22 20:11" },
  { name: "Karan Shah", assigned: 85, contacted: 80, converted: 20, invalid: 4, avgResponse: "27 min", lastActive: "2025-08-23 10:11" },
  { name: "Meera Joshi", assigned: 96, contacted: 84, converted: 23, invalid: 5, avgResponse: "21 min", lastActive: "2025-08-22 18:59" },
  { name: "Amit Banerjee", assigned: 103, contacted: 97, converted: 18, invalid: 7, avgResponse: "39 min", lastActive: "2025-08-23 06:41" },
  { name: "Divya Patel", assigned: 60, contacted: 56, converted: 12, invalid: 1, avgResponse: "19 min", lastActive: "2025-08-23 09:33" },
  { name: "Gopal Singh", assigned: 132, contacted: 120, converted: 32, invalid: 9, avgResponse: "50 min", lastActive: "2025-08-20 14:23" },
  { name: "Jay Mehta", assigned: 74, contacted: 67, converted: 17, invalid: 3, avgResponse: "23 min", lastActive: "2025-08-21 11:11" },
  { name: "Rohan Shah", assigned: 124, contacted: 119, converted: 38, invalid: 2, avgResponse: "41 min", lastActive: "2025-08-23 08:14" },
  { name: "Surabhi Verma", assigned: 110, contacted: 103, converted: 26, invalid: 8, avgResponse: "35 min", lastActive: "2025-08-22 16:22" },
];

const calcPerc = (num, total) => (total ? (num / total * 100).toFixed(1) + "%" : "0%");

export default function PerformanceData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [activeFilter, setActiveFilter] = useState(null);

  // Sort function
  const sortedData = React.useMemo(() => {
    let sortableItems = [...brokerData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [brokerData, sortConfig]);

  // Filter by search term
  const filteredData = sortedData.filter(broker => 
    broker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getHeaderClass = (key) => {
    if (sortConfig.key === key) {
      return "flex items-center cursor-pointer font-bold text-blue-600";
    }
    return "flex items-center cursor-pointer hover:text-blue-600";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: 'ascending' });
  };

  return (
    <section className="max-w-7xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Broker Performance Insights</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search brokers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          
          <button 
            onClick={clearFilters}
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
            Clear Filters
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No brokers match your search criteria.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  <div className={getHeaderClass('name')}>
                    Broker Name
                    {sortConfig.key === 'name' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('assigned')}
                >
                  <div className={getHeaderClass('assigned')}>
                    Leads Assigned
                    {sortConfig.key === 'assigned' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('contacted')}
                >
                  <div className={getHeaderClass('contacted')}>
                    Contacted
                    {sortConfig.key === 'contacted' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('converted')}
                >
                  <div className={getHeaderClass('converted')}>
                    Converted
                    {sortConfig.key === 'converted' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('invalid')}
                >
                  <div className={getHeaderClass('invalid')}>
                    Invalid
                    {sortConfig.key === 'invalid' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invalid %
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage %
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('avgResponse')}
                >
                  <div className={getHeaderClass('avgResponse')}>
                    Avg. Response
                    {sortConfig.key === 'avgResponse' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('lastActive')}
                >
                  <div className={getHeaderClass('lastActive')}>
                    Last Active
                    {sortConfig.key === 'lastActive' ? (
                      sortConfig.direction === 'ascending' ? 
                        <ArrowUpIcon className="ml-1 h-4 w-4" /> : 
                        <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-50" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((b, index) => (
                <tr key={b.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {b.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {b.assigned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {b.contacted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {b.converted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {calcPerc(b.converted, b.assigned)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {b.invalid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {calcPerc(b.invalid, b.assigned)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <div className="flex items-center">
                      <span className="mr-2">{calcPerc(b.contacted + b.converted + b.invalid, b.assigned)}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: calcPerc(b.contacted + b.converted + b.invalid, b.assigned) }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {b.avgResponse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {b.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>Showing {filteredData.length} of {brokerData.length} brokers</div>
        <div className="flex items-center">
          <FunnelIcon className="h-4 w-4 mr-1" />
          Sorted by: {sortConfig.key ? `${sortConfig.key} (${sortConfig.direction})` : 'None'}
        </div>
      </div>
    </section>
  );
}