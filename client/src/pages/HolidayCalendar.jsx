import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HolidayCalendar = () => {
  const navigate = useNavigate();

  // Load holidays from localStorage or use default data
  const loadHolidays = () => {
    const savedHolidays = localStorage.getItem('holidays');
    if (savedHolidays) {
      return JSON.parse(savedHolidays);
    }
    // Default holidays if localStorage is empty
    return [
      {
        id: 1,
        name: 'New Year',
        date: '2025-01-01',
        type: 'National',
        description: 'New Year celebration',
        isRecurring: true,
      },
      {
        id: 2,
        name: 'Republic Day',
        date: '2025-01-26',
        type: 'National',
        description: 'Republic Day of India',
        isRecurring: true,
      },
      {
        id: 3,
        name: 'Holi',
        date: '2025-03-14',
        type: 'Festival',
        description: 'Festival of Colors',
        isRecurring: true,
      },
      {
        id: 4,
        name: 'Independence Day',
        date: '2025-08-15',
        type: 'National',
        description: 'Independence Day of India',
        isRecurring: true,
      },
      {
        id: 5,
        name: 'Gandhi Jayanti',
        date: '2025-10-02',
        type: 'National',
        description: 'Birth anniversary of Mahatma Gandhi',
        isRecurring: true,
      },
      {
        id: 6,
        name: 'Diwali',
        date: '2025-10-20',
        type: 'Festival',
        description: 'Festival of Lights',
        isRecurring: true,
      },
      {
        id: 7,
        name: 'Christmas',
        date: '2025-12-25',
        type: 'Festival',
        description: 'Christmas celebration',
        isRecurring: true,
      },
    ];
  };

  const [holidays, setHolidays] = useState(loadHolidays());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'National',
    description: '',
    isRecurring: false,
  });

  // Save holidays to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('holidays', JSON.stringify(holidays));
  }, [holidays]);

  const holidayTypes = ['National', 'Festival', 'Regional', 'Company', 'Optional'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleAddHoliday = () => {
    if (!formData.name.trim()) {
      alert('Holiday name is required');
      return;
    }
    if (!formData.date) {
      alert('Holiday date is required');
      return;
    }

    const newHoliday = {
      id: Date.now(),
      ...formData,
    };

    setHolidays([...holidays, newHoliday]);
    setFormData({
      name: '',
      date: '',
      type: 'National',
      description: '',
      isRecurring: false,
    });
    setShowAddModal(false);
    alert('Holiday added successfully!');
  };

  const handleEditHoliday = () => {
    if (!formData.name.trim()) {
      alert('Holiday name is required');
      return;
    }
    if (!formData.date) {
      alert('Holiday date is required');
      return;
    }

    setHolidays(
      holidays.map((holiday) =>
        holiday.id === selectedHoliday.id ? { ...holiday, ...formData } : holiday
      )
    );

    setShowEditModal(false);
    setSelectedHoliday(null);
    alert('Holiday updated successfully!');
  };

  const handleDeleteHoliday = (id) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      setHolidays(holidays.filter((holiday) => holiday.id !== id));
      alert('Holiday deleted successfully!');
    }
  };

  const openEditModal = (holiday) => {
    setSelectedHoliday(holiday);
    setFormData({
      name: holiday.name,
      date: holiday.date,
      type: holiday.type,
      description: holiday.description,
      isRecurring: holiday.isRecurring,
    });
    setShowEditModal(true);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'National':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Festival':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Regional':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Company':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Optional':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const isUpcoming = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
  };

  const getMonthFromDate = (date) => {
    return new Date(date).getMonth();
  };

  const filteredHolidays = holidays
    .filter((holiday) => {
      const typeMatch = filterType === 'all' || holiday.type === filterType;
      const monthMatch =
        filterMonth === 'all' || getMonthFromDate(holiday.date) === parseInt(filterMonth);
      return typeMatch && monthMatch;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingHolidays = holidays
    .filter((holiday) => isUpcoming(holiday.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Holiday Calendar
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm opacity-90">Total Holidays</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1">{holidays.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm opacity-90">Upcoming</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1">{upcomingHolidays.length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm opacity-90">National Holidays</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1">
              {holidays.filter((h) => h.type === 'National').length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm opacity-90">Festivals</p>
            <p className="text-2xl sm:text-3xl font-bold mt-1">
              {holidays.filter((h) => h.type === 'Festival').length}
            </p>
          </div>
        </div>

        {/* Filters and Add Button */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Types</option>
              {holidayTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Month
            </label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Months</option>
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2 invisible sm:visible">
              Action
            </label>
            <button
              onClick={() => {
                setFormData({
                  name: '',
                  date: '',
                  type: 'National',
                  description: '',
                  isRecurring: false,
                });
                setShowAddModal(true);
              }}
              className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              + Add Holiday
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Holidays */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🎉 Upcoming Holidays
            </h2>
            <div className="space-y-3">
              {upcomingHolidays.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming holidays</p>
              ) : (
                upcomingHolidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="bg-white rounded-lg p-3 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {holiday.name}
                      </h4>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(
                          holiday.type
                        )}`}
                      >
                        {holiday.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      📅 {new Date(holiday.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* All Holidays List */}
          <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
              All Holidays
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {filteredHolidays.length}
              </span>
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredHolidays.length === 0 ? (
                <p className="text-gray-500 text-sm">No holidays found</p>
              ) : (
                filteredHolidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                            {holiday.name}
                          </h3>
                          {holiday.isRecurring && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                              Recurring
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          📅 {new Date(holiday.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        {holiday.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {holiday.description}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                          holiday.type
                        )}`}
                      >
                        {holiday.type}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <button
                        onClick={() => openEditModal(holiday)}
                        className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteHoliday(holiday.id)}
                        className="flex-1 px-3 py-1.5 bg-red-600 text-white text-xs sm:text-sm rounded-md hover:bg-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Add Holiday Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Holiday
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., New Year"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {holidayTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="2"
                    placeholder="Optional description..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onChange={(e) =>
                      setFormData({ ...formData, isRecurring: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isRecurring"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Recurring Holiday (Annual)
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddHoliday}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Holiday
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Holiday Modal */}
        {showEditModal && selectedHoliday && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Edit Holiday
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {holidayTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isRecurringEdit"
                    checked={formData.isRecurring}
                    onChange={(e) =>
                      setFormData({ ...formData, isRecurring: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isRecurringEdit"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Recurring Holiday (Annual)
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedHoliday(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditHoliday}
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

export default HolidayCalendar;
