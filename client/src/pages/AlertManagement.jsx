import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlertManagement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    alertTitle: '',
    alertMessage: '',
    alertType: 'individual', // individual or team
    recipient: '',
    priority: '',
    reportedBy: '',
  });

  const [errors, setErrors] = useState({});
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Server Maintenance',
      message: 'Scheduled maintenance on Sunday 2 AM',
      type: 'team',
      recipient: 'Development Team',
      priority: 'High',
      date: '2025-10-29',
      status: 'active',
    },
    {
      id: 2,
      title: 'Deadline Reminder',
      message: 'Project deadline is approaching',
      type: 'individual',
      recipient: 'John Doe',
      priority: 'Critical',
      date: '2025-10-28',
      status: 'active',
    },
  ]);

  const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'];
  const teams = ['Development Team', 'Marketing Team', 'Sales Team', 'Support Team'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.alertTitle.trim()) {
      newErrors.alertTitle = 'Alert title is required';
    }
    if (!formData.alertMessage.trim()) {
      newErrors.alertMessage = 'Alert message is required';
    }
    if (!formData.recipient) {
      newErrors.recipient = 'Please select a recipient';
    }
    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newAlert = {
        id: alerts.length + 1,
        title: formData.alertTitle,
        message: formData.alertMessage,
        type: formData.alertType,
        recipient: formData.recipient,
        priority: formData.priority,
        date: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      setAlerts([newAlert, ...alerts]);
      alert('Alert sent successfully!');
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      alertTitle: '',
      alertMessage: '',
      alertType: 'individual',
      recipient: '',
      priority: '',
      reportedBy: '',
    });
    setErrors({});
  };

  const handleDismiss = (id) => {
    if (window.confirm('Are you sure you want to dismiss this alert?')) {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Alert Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Alert Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Create New Alert
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="alertTitle"
                  value={formData.alertTitle}
                  onChange={handleChange}
                  placeholder="Enter alert title"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.alertTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.alertTitle && (
                  <p className="text-sm text-red-500 mt-1">{errors.alertTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alertMessage"
                  value={formData.alertMessage}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter alert message"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.alertMessage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.alertMessage && (
                  <p className="text-sm text-red-500 mt-1">{errors.alertMessage}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="alertType"
                      value="individual"
                      checked={formData.alertType === 'individual'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Individual</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="alertType"
                      value="team"
                      checked={formData.alertType === 'team'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Team</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.alertType === 'individual' ? 'Send To User' : 'Send To Team'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.recipient ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">
                    Select {formData.alertType === 'individual' ? 'user' : 'team'}
                  </option>
                  {(formData.alertType === 'individual' ? users : teams).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.recipient && (
                  <p className="text-sm text-red-500 mt-1">{errors.recipient}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.priority ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="text-sm text-red-500 mt-1">{errors.priority}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reported By
                </label>
                <select
                  name="reportedBy"
                  value={formData.reportedBy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select reporter</option>
                  {users.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send Alert
                </button>
              </div>
            </form>
          </div>

          {/* Active Alerts List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
              Active Alerts
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {alerts.length}
              </span>
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {alerts.length === 0 ? (
                <p className="text-gray-500 text-sm">No active alerts</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`bg-white rounded-lg p-4 border-2 ${getPriorityColor(
                      alert.priority
                    )}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-gray-400 hover:text-red-600 text-xl"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {alert.type === 'individual' ? '👤' : '👥'} {alert.recipient}
                        </span>
                        <span>📅 {alert.date}</span>
                      </div>
                      <span className="font-semibold">{alert.priority}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

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

export default AlertManagement;
