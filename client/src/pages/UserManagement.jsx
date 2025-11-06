import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();

  // Load users from localStorage or use default data
  const loadUsers = () => {
    const savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    // Default users if localStorage is empty
    return [
      {
        id: 1,
        firstName: 'Ankur',
        lastName: 'Sharma',
        email: 'ankur@example.com',
        phone: '9876543210',
        designation: 'Team Leader',
        employeeId: 'EMP001',
        joiningDate: '2023-01-15',
        expiryDate: '2025-12-31',
        isActive: true,
        companyId: 1,
        departmentId: 3,
      },
      {
        id: 2,
        firstName: 'Nitul',
        lastName: 'Das',
        email: 'nitul@example.com',
        phone: '9876543211',
        designation: 'Senior Developer',
        employeeId: 'EMP002',
        joiningDate: '2023-03-20',
        expiryDate: '2025-06-30',
        isActive: true,
        companyId: 1,
        departmentId: 3,
      },
      {
        id: 3,
        firstName: 'Kishalay',
        lastName: 'Roy',
        email: 'kishalay@example.com',
        phone: '9876543212',
        designation: 'Developer',
        employeeId: 'EMP003',
        joiningDate: '2023-06-10',
        expiryDate: '2024-11-30',
        isActive: false,
        companyId: 1,
        departmentId: 3,
      },
      {
        id: 4,
        firstName: 'Kajal',
        lastName: 'Singh',
        email: 'kajal@example.com',
        phone: '9876543213',
        designation: 'App Developer',
        employeeId: 'EMP004',
        joiningDate: '2023-04-05',
        expiryDate: '2026-03-31',
        isActive: true,
        companyId: 1,
        departmentId: 2,
      },
      {
        id: 5,
        firstName: 'Twinkle',
        lastName: 'Patel',
        email: 'twinkle@example.com',
        phone: '9876543214',
        designation: 'Developer',
        employeeId: 'EMP005',
        joiningDate: '2023-07-15',
        expiryDate: '2024-10-15',
        isActive: true,
        companyId: 1,
        departmentId: 3,
      },
    ];
  };

  const [users, setUsers] = useState(loadUsers());
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editFormData, setEditFormData] = useState({
    expiryDate: '',
    isActive: true,
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(users));
  }, [users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setEditFormData({
      expiryDate: user.expiryDate || '',
      isActive: user.isActive,
    });
  };

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, isActive: !selectedUser.isActive });
    }
    alert('User status updated successfully!');
  };

  const handleUpdateExpiry = () => {
    if (!editFormData.expiryDate) {
      alert('Please select an expiry date');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (editFormData.expiryDate < today) {
      alert('Expiry date cannot be in the past');
      return;
    }

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? { ...user, expiryDate: editFormData.expiryDate }
          : user
      )
    );

    setSelectedUser({ ...selectedUser, expiryDate: editFormData.expiryDate });
    alert('User expiry date updated successfully!');
    setShowEditModal(false);
  };

  const getStatusColor = (isActive) => {
    return isActive
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-red-100 text-red-700 border-red-300';
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return expiryDate < today;
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

  const filteredUsers = users.filter((user) => {
    const statusMatch =
      filterStatus === 'all' ||
      (filterStatus === 'active' && user.isActive) ||
      (filterStatus === 'inactive' && !user.isActive) ||
      (filterStatus === 'expired' && isExpired(user.expiryDate)) ||
      (filterStatus === 'expiring-soon' && isExpiringSoon(user.expiryDate));

    const searchMatch =
      searchQuery === '' ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          User Management
        </h1>

        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or employee ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
              <option value="expiring-soon">Expiring Soon (30 days)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
              Users
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {filteredUsers.length}
              </span>
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-gray-500 text-sm">No users found</p>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedUser?.id === user.id
                        ? 'border-blue-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {user.firstName} {user.lastName}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.isActive
                        )} w-fit`}
                      >
                        {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <p className="break-all">📧 {user.email}</p>
                      <p>🆔 {user.employeeId}</p>
                      <p>💼 {user.designation}</p>
                      {user.expiryDate && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <p className="text-xs sm:text-sm">📅 Expires: {user.expiryDate}</p>
                          {isExpired(user.expiryDate) && (
                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded w-fit">
                              EXPIRED
                            </span>
                          )}
                          {isExpiringSoon(user.expiryDate) && !isExpired(user.expiryDate) && (
                            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded w-fit">
                              EXPIRING SOON
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* User Details & Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            {selectedUser ? (
              <>
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  User Details & Actions
                </h2>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedUser.isActive
                      )}`}
                    >
                      {selectedUser.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <p className="text-gray-800">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-800">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Employee ID:</span>
                      <p className="text-gray-800">{selectedUser.employeeId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Designation:</span>
                      <p className="text-gray-800">{selectedUser.designation}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Joining Date:</span>
                      <p className="text-gray-800">{selectedUser.joiningDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Expiry Date:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-800">
                          {selectedUser.expiryDate || 'Not Set'}
                        </p>
                        {selectedUser.expiryDate && isExpired(selectedUser.expiryDate) && (
                          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                            EXPIRED
                          </span>
                        )}
                        {selectedUser.expiryDate && isExpiringSoon(selectedUser.expiryDate) && !isExpired(selectedUser.expiryDate) && (
                          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                            EXPIRING SOON
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Activate/Deactivate Button */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Status
                    </label>
                    <button
                      onClick={() => handleToggleStatus(selectedUser.id)}
                      className={`w-full px-4 py-3 rounded-md font-medium transition-colors ${
                        selectedUser.isActive
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {selectedUser.isActive ? '🔒 Deactivate User' : '✓ Activate User'}
                    </button>
                  </div>

                  {/* Update Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Expiry Date
                    </label>
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                      📅 Set/Update Expiry Date
                    </button>
                  </div>

                  {/* Expiry Warning */}
                  {selectedUser.expiryDate && (
                    <div
                      className={`p-4 rounded-lg border-2 ${
                        isExpired(selectedUser.expiryDate)
                          ? 'bg-red-50 border-red-300'
                          : isExpiringSoon(selectedUser.expiryDate)
                          ? 'bg-orange-50 border-orange-300'
                          : 'bg-green-50 border-green-300'
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {isExpired(selectedUser.expiryDate)
                          ? '⚠️ This user account has expired!'
                          : isExpiringSoon(selectedUser.expiryDate)
                          ? '⏰ This user account is expiring soon!'
                          : '✓ User account is valid'}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">👤</p>
                  <p>Select a user to view details and manage</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Expiry Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Update Expiry Date
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User: {selectedUser.firstName} {selectedUser.lastName}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Expiry: {selectedUser.expiryDate || 'Not Set'}
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={editFormData.expiryDate}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, expiryDate: e.target.value })
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateExpiry}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-end mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
