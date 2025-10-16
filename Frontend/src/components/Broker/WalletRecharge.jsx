import React, { useState } from "react";
import { Link } from "react-router-dom";

const WalletRecharge = () => {
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [5000, 10000, 25000,];

  const notifications = [
    {
      id: 1,
      title: "Low Balance Alert",
      time: "1 hour ago",
      message:
        "Your wallet balance has fallen below ₹10,000. Add funds to keep your campaigns active.",
      action: "Add Balance",
      unread: true,
    },
    {
      id: 2,
      title: "Upcoming Campaign Renewal",
      time: "3 hours ago",
      message:
        "A campaign renewal is scheduled soon. Please ensure sufficient balance in your wallet.",
      action: "Recharge Now",
      unread: true,
    },
    {
      id: 3,
      title: "Campaign Adjustment Notice",
      time: "5 hours ago",
      message:
        "₹24.04 has been temporarily reserved for your scheduled real estate campaigns. Final adjustments will be made post-delivery.",
      unread: true,
    },
  ];

  const handleQuickAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setRechargeAmount(amount);
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setRechargeAmount(value);
    setSelectedAmount("");
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    if (!rechargeAmount || rechargeAmount < 100) {
      alert("Minimum recharge amount is ₹100");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Recharge of ₹${rechargeAmount} successful!`);
      setRechargeAmount("");
      setSelectedAmount("");
    }, 2000);
  };

  const markAllAsRead = () => alert("All notifications marked as read");
  const markAsRead = (id) => alert(`Notification ${id} marked as read`);

  const calculateGST = (amount) => amount * 0.18;
  const totalAmount = rechargeAmount
    ? parseFloat(rechargeAmount) + calculateGST(parseFloat(rechargeAmount))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-1">
            Manage your balance to run real estate ad campaigns seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Available Wallet Balance
                  </h2>
                  <p className="text-3xl font-bold text-gray-900">₹0.00</p>
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("recharge-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-[#154056] text-white px-6 py-2 rounded-lg hover:bg-[#ff9c00] transition-colors font-medium cursor-pointer"
                >
                  Add Funds
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">₹24.04</span> is reserved for
                  your active or scheduled ad campaigns. Final adjustments will
                  be applied once campaigns are completed.
                </p>
              </div>
            </div>

            {/* Recharge Section */}
            <div
              id="recharge-section"
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Add Wallet Balance
              </h3>

              {/* Quick Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Quick Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleQuickAmountSelect(amount)}
                      className={`p-3 border rounded-lg text-center transition-all ${
                        selectedAmount === amount
                          ? "border-[#154056] bg-blue-50 text-[#154056] font-semibold"
                          : "border-gray-300 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label
                  htmlFor="customAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    id="customAmount"
                    value={rechargeAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#154056] focus:border-[#154056]"
                    min="100"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">.00</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum recharge: ₹100
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#154056] bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UPI</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          UPI Payment
                        </div>
                        <div className="text-xs text-gray-500">
                          Google Pay, PhonePe, Paytm UPI
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      paymentMethod === "card"
                        ? "border-[#154056] bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">💳</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Credit / Debit Card
                        </div>
                        <div className="text-xs text-gray-500">
                          Visa, Mastercard, RuPay
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Breakdown */}
              {rechargeAmount && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Payment Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recharge Amount:</span>
                      <span className="font-semibold">
                        ₹{parseFloat(rechargeAmount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%):</span>
                      <span className="font-semibold">
                        ₹
                        {calculateGST(
                          parseFloat(rechargeAmount)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 font-semibold">
                        Total Payable:
                      </span>
                      <span className="text-lg font-bold text-[#154056]">
                        ₹{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recharge Button */}
              <button
                onClick={handleRecharge}
                disabled={!rechargeAmount || isProcessing}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all cursor-pointer ${
                  !rechargeAmount || isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#154056] hover:bg-[#2c6b8a]"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `Add ₹${
                    rechargeAmount
                      ? parseFloat(rechargeAmount).toLocaleString()
                      : "0"
                  } to Wallet`
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {notifications.map((n) => (
                  <div key={n.id} className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {n.title}
                        </span>
                        {n.unread && (
                          <span className="w-2 h-2 bg-[#ff9c00] rounded-full"></span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{n.time}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{n.message}</p>
                    <div className="flex items-center justify-between">
                      {n.action && (
                        <button
                          onClick={() =>
                            document
                              .getElementById("recharge-section")
                              .scrollIntoView({ behavior: "smooth" })
                          }
                          className="text-[#154056] hover:text-[#2c6b8a] font-medium text-sm"
                        >
                          {n.action}
                        </button>
                      )}
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Mark as read
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="text-[#154056] hover:text-[#2c6b8a] font-medium text-sm cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/broker/wallet/history"
                  className="block w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="font-medium text-gray-900">
                    View Transaction History
                  </div>
                  <div className="text-sm text-gray-500">
                    Review all wallet transactions and deductions
                  </div>
                </Link>

                <Link
                  to="/broker/wallet/plans"
                  className="block w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="font-medium text-gray-900">
                    Explore Lead Packages
                  </div>
                  <div className="text-sm text-gray-500">
                    Choose plans to receive more verified property leads
                  </div>
                </Link>

                <button className="block w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="font-medium text-gray-900">
                    Contact Support
                  </div>
                  <div className="text-sm text-gray-500">
                    Get help regarding payments or campaign balance
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletRecharge;
