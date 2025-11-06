import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QueryReply = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([
    {
      id: 1,
      taskTitle: 'Update User Dashboard',
      queryBy: 'John Doe',
      queryDate: '2025-10-28',
      query: 'Need clarification on the color scheme for the dashboard',
      status: 'pending',
      reply: '',
    },
    {
      id: 2,
      taskTitle: 'Database Optimization',
      queryBy: 'Jane Smith',
      queryDate: '2025-10-27',
      query: 'Which tables should be prioritized for optimization?',
      status: 'pending',
      reply: '',
    },
    {
      id: 3,
      taskTitle: 'API Integration',
      queryBy: 'Mike Johnson',
      queryDate: '2025-10-26',
      query: 'Do we need authentication for all endpoints?',
      status: 'replied',
      reply: 'Yes, all endpoints require JWT authentication',
    },
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
    setReplyText(query.reply || '');
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }

    setQueries(
      queries.map((q) =>
        q.id === selectedQuery.id
          ? { ...q, reply: replyText, status: 'replied' }
          : q
      )
    );

    alert('Reply sent successfully!');
    setSelectedQuery(null);
    setReplyText('');
  };

  const pendingQueries = queries.filter((q) => q.status === 'pending');
  const repliedQueries = queries.filter((q) => q.status === 'replied');

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Query & Reply Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queries List */}
          <div className="space-y-4">
            {/* Pending Queries */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
                Pending Queries
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
                        By: {query.queryBy} • {query.queryDate}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {query.query}
                      </p>
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
                        By: {query.queryBy} • {query.queryDate}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {query.query}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Query Details & Reply */}
          <div className="bg-gray-50 rounded-lg p-6">
            {selectedQuery ? (
              <>
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  Query Details
                </h2>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Task:</span>
                    <p className="text-gray-800 font-semibold">{selectedQuery.taskTitle}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Query By:</span>
                    <p className="text-gray-800">{selectedQuery.queryBy}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Date:</span>
                    <p className="text-gray-800">{selectedQuery.queryDate}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Query:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">
                      {selectedQuery.query}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuery.status === 'pending'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {selectedQuery.status === 'pending' ? 'Pending' : 'Replied'}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows="6"
                    placeholder="Type your reply here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={selectedQuery.status === 'replied'}
                  />
                </div>

                {selectedQuery.status === 'pending' && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        setSelectedQuery(null);
                        setReplyText('');
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReplySubmit}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">📋</p>
                  <p>Select a query to view details and reply</p>
                </div>
              </div>
            )}
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

export default QueryReply;
