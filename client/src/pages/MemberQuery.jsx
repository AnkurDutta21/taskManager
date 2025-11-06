import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MemberQuery = () => {
  const navigate = useNavigate();
  const currentUser = 'John Doe'; // This would come from auth context

  const [queries, setQueries] = useState([
    {
      id: 1,
      taskTitle: 'Update User Dashboard',
      query: 'Need clarification on the color scheme for the dashboard',
      queryDate: '2025-10-28',
      status: 'replied',
      reply: 'Please use the primary blue (#3B82F6) and secondary gray (#6B7280) as per our design system.',
      repliedBy: 'Admin',
      repliedDate: '2025-10-28',
    },
    {
      id: 2,
      taskTitle: 'Fix Login Bug',
      query: 'Should I also check for special characters in username field?',
      queryDate: '2025-10-29',
      status: 'pending',
      reply: '',
      repliedBy: '',
      repliedDate: '',
    },
  ]);

  const [showNewQueryModal, setShowNewQueryModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [newQuery, setNewQuery] = useState({
    taskTitle: '',
    query: '',
  });

  const handleSubmitQuery = () => {
    if (!newQuery.taskTitle.trim() || !newQuery.query.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const query = {
      id: queries.length + 1,
      taskTitle: newQuery.taskTitle,
      query: newQuery.query,
      queryDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      reply: '',
      repliedBy: '',
      repliedDate: '',
    };

    setQueries([query, ...queries]);
    alert('Query submitted successfully! You will receive a response soon.');
    setShowNewQueryModal(false);
    setNewQuery({ taskTitle: '', query: '' });
  };

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
  };

  const pendingQueries = queries.filter((q) => q.status === 'pending');
  const repliedQueries = queries.filter((q) => q.status === 'replied');

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              My Queries
            </h1>
            <p className="text-gray-600 mt-1">Submit and track your queries</p>
          </div>
          <button
            onClick={() => setShowNewQueryModal(true)}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            ➕ New Query
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Pending Queries</p>
            <p className="text-3xl font-bold text-yellow-600">{pendingQueries.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Replied Queries</p>
            <p className="text-3xl font-bold text-green-600">{repliedQueries.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queries List */}
          <div className="space-y-4">
            {/* Pending Queries */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
                Pending Queries
                <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {pendingQueries.length}
                </span>
              </h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {pendingQueries.length === 0 ? (
                  <p className="text-gray-500 text-sm">No pending queries</p>
                ) : (
                  pendingQueries.map((query) => (
                    <div
                      key={query.id}
                      onClick={() => handleSelectQuery(query)}
                      className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedQuery?.id === query.id
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {query.taskTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        📅 {query.queryDate}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {query.query}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        ⏳ Awaiting Response
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Replied Queries */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
                Replied Queries
                <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {repliedQueries.length}
                </span>
              </h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {repliedQueries.length === 0 ? (
                  <p className="text-gray-500 text-sm">No replied queries</p>
                ) : (
                  repliedQueries.map((query) => (
                    <div
                      key={query.id}
                      onClick={() => handleSelectQuery(query)}
                      className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedQuery?.id === query.id
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {query.taskTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        📅 {query.queryDate}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {query.query}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✓ Replied by {query.repliedBy}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Query Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            {selectedQuery ? (
              <>
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  Query Details
                </h2>
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Task:</span>
                    <p className="text-gray-800 font-semibold mt-1">
                      {selectedQuery.taskTitle}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Query Date:</span>
                    <p className="text-gray-800">{selectedQuery.queryDate}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Your Query:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">
                      {selectedQuery.query}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuery.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {selectedQuery.status === 'pending' ? '⏳ Pending' : '✓ Replied'}
                    </span>
                  </div>

                  {selectedQuery.status === 'replied' && (
                    <>
                      <div className="border-t pt-4">
                        <span className="text-sm font-medium text-gray-600">Reply:</span>
                        <div className="mt-2 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                          <p className="text-gray-800">{selectedQuery.reply}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Replied by: <strong>{selectedQuery.repliedBy}</strong></span>
                        <span>📅 {selectedQuery.repliedDate}</span>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">📋</p>
                  <p>Select a query to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Query Modal */}
        {showNewQueryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Submit New Query
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newQuery.taskTitle}
                    onChange={(e) =>
                      setNewQuery({ ...newQuery, taskTitle: e.target.value })
                    }
                    placeholder="Enter the task title related to your query"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Query <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newQuery.query}
                    onChange={(e) =>
                      setNewQuery({ ...newQuery, query: e.target.value })
                    }
                    rows="6"
                    placeholder="Describe your query in detail..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowNewQueryModal(false);
                      setNewQuery({ taskTitle: '', query: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitQuery}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Query
                  </button>
                </div>
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

export default MemberQuery;
