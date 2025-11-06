import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

const TaskChat = () => {
  const navigate = useNavigate();

  // Load tasks from localStorage
  const loadTasks = () => {
    const savedTasks = localStorage.getItem('allTasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  };

  const [tasks, setTasks] = useState(loadTasks());
  const [selectedTask, setSelectedTask] = useState(tasks[0] || null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(loadTasks());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'approved':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'abandoned':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600';
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              Task Chat
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Discuss individual tasks with assignees
            </p>
          </div>
          <button
            onClick={() => navigate('/task-management')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm whitespace-nowrap"
          >
            ← Back to Tasks
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
            <option value="abandoned">Abandoned</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl text-gray-600 font-medium">No tasks found</p>
            <p className="text-sm text-gray-500 mt-2">
              Create tasks from Task Management to start chatting
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Task List Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Tasks ({filteredTasks.length})
                </h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedTask?.id === task.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            selectedTask?.id === task.id
                              ? 'bg-blue-500 text-white border-blue-400'
                              : getStatusColor(task.status)
                          }`}
                        >
                          {task.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs ${
                            selectedTask?.id === task.id
                              ? 'text-blue-100'
                              : 'text-gray-600'
                          }`}
                        >
                          👤 {task.assignedTo}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            selectedTask?.id === task.id
                              ? 'text-blue-100'
                              : getPriorityColor(task.priority)
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3">
              {selectedTask ? (
                <div>
                  {/* Task Info Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {selectedTask.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {selectedTask.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Assigned to:</span>
                            <span className="text-blue-600">
                              {selectedTask.assignedTo}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Due:</span>
                            <span>{selectedTask.dueDate}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Priority:</span>
                            <span className={getPriorityColor(selectedTask.priority)}>
                              {selectedTask.priority}
                            </span>
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedTask.status
                        )} w-fit`}
                      >
                        {selectedTask.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Chat Component */}
                  <div className="h-[500px] sm:h-[600px]">
                    <Chat
                      chatId={selectedTask.id}
                      chatType="task"
                      chatTitle={`Task: ${selectedTask.title}`}
                      currentUser="Admin"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-lg text-gray-600 font-medium">
                      Select a task to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskChat;
