import React, { useState } from "react";

const TransactionHistory = () => {
  const [filter, setFilter] = useState("all");
  
  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      description: "Starter Plan Purchase",
      amount: 0,
      type: "debit",
      status: "completed",
      invoice: "INV-001"

    },
    {
      id: 2,
      date: "2024-01-10",
      description: "Lead Wallet Recharge",
      amount: 0,
      type: "debit",
      status: "completed",
      invoice: "INV-002"
    },
    {
      id: 3,
      date: "2024-01-05",
      description: "Payment Received - Property Sale",
      amount: 0,
      type: "credit",
      status: "completed",
      invoice: "INV-003"
    },
    {
      id: 4,
      date: "2024-01-01",
      description: "Growth Plan Upgrade",
      amount: 0,
      type: "debit",
      status: "pending",
      invoice: "INV-004"
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transaction History
          </h1>
          <p className="text-gray-600">
            View all your wallet transactions and download invoices
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === "all"
                  ? "bg-[#154056] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setFilter("credit")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === "credit"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Credits
            </button>
            <button
              onClick={() => setFilter("debit")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === "debit"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Debits
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={transaction.type === "credit" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === "completed" 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-[#154056] hover:text-[#2c6b8a] font-medium">
                        {transaction.invoice}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Balance</h3>
            <p className="text-3xl font-bold text-green-600">₹0</p>
            <p className="text-sm text-gray-600 mt-2">Available for lead purchases</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Credits</h3>
            <p className="text-3xl font-bold text-green-600">₹0</p>
            <p className="text-sm text-gray-600 mt-2">All time received</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Debits</h3>
            <p className="text-3xl font-bold text-red-600">₹0</p>
            <p className="text-sm text-gray-600 mt-2">All time spent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;