import React, { useEffect, useState } from "react";
import { useAuthSubAdmin } from "../../context/AuthContextSubAdmin";

const AllUsers = () => {
  const { getAllUsers, loading } = useAuthSubAdmin();
  const [users, setUsers] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLocalLoading(true);
      setError("");
      const data = await getAllUsers();
      const usersData = data?.users || data?.data?.users || data || [];
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      setUsers([]);
    } finally {
      setLocalLoading(false);
    }
  };
  fetchUsers();
  // Only run once on mount
  // eslint-disable-next-line
}, []);


  // Calculate role counts
  const roleCounts = {
    user: users.filter(
      (user) =>
        !user.role ||
        user.role.toLowerCase() === "user" ||
        user.role.toLowerCase() === "customer"
    ).length,
    developer: users.filter(
      (user) => user.role && user.role.toLowerCase() === "developer"
    ).length,
    builder: users.filter(
      (user) => user.role && user.role.toLowerCase() === "builder"
    ).length,
    broker: users.filter(
      (user) => user.role && user.role.toLowerCase() === "broker"
    ).length,
    "channel-partner": users.filter(
      (user) => user.role && user.role.toLowerCase() === "channel-partner"
    ).length,
  };

  const roleCards = [
    {
      role: "user",
      title: "Users",
      count: roleCounts.user,
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      role: "developer",
      title: "Developers",
      count: roleCounts.developer,
      color: "from-green-500 to-green-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      role: "builder",
      title: "Builders",
      count: roleCounts.builder,
      color: "from-orange-500 to-orange-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      role: "broker",
      title: "Brokers",
      count: roleCounts.broker,
      color: "from-purple-500 to-purple-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      role: "channel-partner",
      title: "Channel Partners",
      count: roleCounts["channel-partner"],
      color: "from-pink-500 to-pink-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  if (loading || localLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4  border-[#ff9c00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">
            Loading Users...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch the user data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}

        {/* Role-based Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8 cursor-pointer">
          {roleCards.map((card) => (
            <div
              key={card.role}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.count}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-md`}
                >
                  {card.icon}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total</span>
                  <span
                    className={`font-semibold ${
                      card.count > 0 ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {card.count} {card.count === 1 ? "user" : "users"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Users Summary Card */}
        <div className="bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold mb-2">Total Users Summary</h2>
              <p className="text-blue-100">
                Overview of all user roles in the system
              </p>
            </div>
            <div className="bg-[#154056] bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-3 shadow-inner">
              <div className="text-3xl font-bold">{users.length}</div>
              <div className="text-blue-100 text-sm font-medium">
                TOTAL USERS
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-red-800 font-medium">{error}</div>
          </div>
        )}

        {/* Users Grid/Table */}
        {users.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Users Found
              </h3>
              <p className="text-gray-600 mb-6">
                There are no users registered in the system yet. Users will
                appear here once they register.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#ff9c00] hover:bg-[#ff9c00] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md cursor-pointer"
              >
                Refresh Page
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        User Information
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Contact Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Additional Info
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr
                        key={user._id || user.id}
                        className="hover:bg-blue-50 transition-all duration-200 cursor-pointer transform hover:scale-[1.002]"
                      >
                       <td className="px-6 py-4">
                          <div className="flex items-center">
                            {user.profileImage ? (
                              <img className="h-12 w-12 rounded-full object-cover border" src={user.profileImage} alt="Profile" />
                            ) : (
                              <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-[#ff9c00] to-[#ff9c00] rounded-full flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg">
                                  {(user.fullName || user.name || "U").charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-lg font-semibold text-gray-900">
                                {user.fullName || user.name || "Unknown User"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {user.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {user.city && (
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {user.city}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            {/** Role color mapping */}
                            {(() => {
                              const roleColors = {
                                Developer: "bg-[#154056] text-white",
                                Builder: "bg-[#ff9c00] text-white",
                                Broker: "bg-purple-100 text-white",
                                "Channel-partner": "bg-pink-100 text-white",
                              };
                              const colorClass =
                                roleColors[user.role] ||
                                "bg-blue-100 text-blue-800";

                              return (
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
                                >
                                  {user.role || "User"}
                                </span>
                              );
                            })()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id || user.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-[#ff9c00] to-[#ff9c00] rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xl">
                          {(user.name || user.fullName || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">
                          {user.name || user.fullName || "Unknown User"}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(() => {
                            const roleColors = {
                              Developer: "bg-[#154056] text-white",
                              Builder: "bg-[#ff9c00] text-white",
                              Broker: "bg-purple-100 text-white",
                              "Channel-partner": "bg-pink-100 text-white",
                            };
                            const colorClass =
                              roleColors[user.role] ||
                              "bg-blue-100 text-blue-800";

                            return (
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
                              >
                                {user.role || "User"}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm break-all">{user.email}</span>
                    </div>

                    {user.phone && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    )}

                    {user.city && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <span className="text-sm">{user.city}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
