import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
  const navigate = useNavigate();

  // Mock data - Replace with API calls
  const [projects] = useState([
    {
      id: 1,
      projectName: 'SKYTRON BACK END',
      projectCode: 'PROJ-2024-001',
      team: 'Engineering Team',
      teamLeader: 'Kishalay',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      deliverableDate: '2024-12-15',
      budget: 150000,
      priority: 'Critical',
      status: 'live',
      projectProgress: 'ongoing-ontime', // ongoing-ontime, ongoing-delayed, delayed
      progress: 65,
      tasksTotal: 45,
      tasksCompleted: 29,
      description: 'Front End: React, Back End: Django',
      teamMembers: 'Ankur / Nitul / Kishalay',
      appTeam: 'Kajal / Ankur / Twinkle / Kishalay',
    },
    {
      id: 2,
      projectName: 'DWARPAL AI',
      projectCode: 'PROJ-2024-002',
      team: 'AI Development Team',
      teamLeader: 'Kishalay',
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      deliverableDate: '2024-11-20',
      budget: 200000,
      priority: 'Critical',
      status: 'live',
      projectProgress: 'ongoing-delayed',
      progress: 55,
      tasksTotal: 38,
      tasksCompleted: 21,
      description: 'Front End: React, Back End: Django',
      teamMembers: 'Ankur / Twinkle',
      appTeam: 'Kajal / Ankur / Twinkle / Kishalay',
    },
    {
      id: 3,
      projectName: 'PENDULUM (Task Management App)',
      projectCode: 'PROJ-2024-003',
      team: 'Full Stack Team',
      teamLeader: 'Kishalay',
      startDate: '2024-03-01',
      endDate: '2024-10-31',
      deliverableDate: '2024-10-25',
      budget: 120000,
      priority: 'High',
      status: 'live',
      projectProgress: 'ongoing-ontime',
      progress: 70,
      tasksTotal: 32,
      tasksCompleted: 22,
      description: 'MERN STACK',
      teamMembers: 'Nitul / Ankur',
      appTeam: 'SAMUDRA',
    },
    {
      id: 4,
      projectName: 'ROUND THE CLOCK',
      projectCode: 'PROJ-2024-004',
      team: 'Full Stack Team',
      teamLeader: 'Kishalay',
      startDate: '2024-02-15',
      endDate: '2024-09-30',
      deliverableDate: null,
      budget: 100000,
      priority: 'High',
      status: 'draft',
      projectProgress: 'no-deliverable',
      progress: 60,
      tasksTotal: 28,
      tasksCompleted: 17,
      description: 'MERN STACK',
      teamMembers: 'Nitul / Ankur',
      appTeam: 'SAMUDRA',
    },
    {
      id: 5,
      projectName: 'MAPWALA MIS',
      projectCode: 'PROJ-2024-005',
      team: 'Full Stack Team',
      teamLeader: 'Kishalay',
      startDate: '2024-04-01',
      endDate: '2024-12-31',
      deliverableDate: null,
      budget: 180000,
      priority: 'High',
      status: 'draft',
      projectProgress: 'no-deliverable',
      progress: 45,
      tasksTotal: 40,
      tasksCompleted: 18,
      description: 'MERN STACK',
      teamMembers: 'Nitul / Ankur',
      appTeam: 'Not specified',
    },
    {
      id: 6,
      projectName: 'MAPWALA / RAPIDYTARA / E-DISHA TRACKING PLATFORM',
      projectCode: 'PROJ-2024-006',
      team: 'Engineering Team',
      teamLeader: 'Kishalay',
      startDate: '2024-01-10',
      endDate: '2024-12-31',
      deliverableDate: '2024-12-20',
      budget: 250000,
      priority: 'Critical',
      status: 'live',
      projectProgress: 'ongoing-ontime',
      progress: 75,
      tasksTotal: 50,
      tasksCompleted: 38,
      description: 'Front End: React, Back End: Django',
      teamMembers: 'Ankur / Nitul / Kishalay',
      appTeam: 'Samudra',
    },
    {
      id: 7,
      projectName: 'MINDGENIX & SKYTRACK WEBSITE',
      projectCode: 'PROJ-2024-007',
      team: 'Web Development Team',
      teamLeader: 'Kishalay',
      startDate: '2024-05-01',
      endDate: '2024-08-31',
      deliverableDate: '2024-08-31',
      budget: 80000,
      priority: 'Medium',
      status: 'closed',
      projectProgress: 'closed',
      progress: 40,
      tasksTotal: 20,
      tasksCompleted: 8,
      description: 'Website Development',
      teamMembers: 'Nitul',
      appTeam: 'Not specified',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status) => {
    const colors = {
      live: 'bg-green-100 text-green-700 border-green-300',
      draft: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      closed: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.draft;
  };

  const getStatusLabel = (status) => {
    const labels = {
      live: 'Live',
      draft: 'Draft',
      closed: 'Closed',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'text-gray-600',
      Medium: 'text-blue-600',
      High: 'text-orange-600',
      Critical: 'text-red-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  const getProjectProgressColor = (projectProgress) => {
    const colors = {
      'ongoing-ontime': 'bg-green-100 text-green-700 border-green-300',
      'ongoing-delayed': 'bg-orange-100 text-orange-700 border-orange-300',
      'delayed': 'bg-red-100 text-red-700 border-red-300',
      'no-deliverable': 'bg-blue-100 text-blue-700 border-blue-300',
      'closed': 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[projectProgress] || colors['no-deliverable'];
  };

  const getProjectProgressLabel = (projectProgress) => {
    const labels = {
      'ongoing-ontime': 'Ongoing - On Time',
      'ongoing-delayed': 'Ongoing - Delayed',
      'delayed': 'Delayed',
      'no-deliverable': 'No Deliverable Date',
      'closed': 'Closed',
    };
    return labels[projectProgress] || projectProgress;
  };

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewProject = (projectId) => {
    console.log('View project:', projectId);
    // Navigate to project details page
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project:', projectId);
    // Navigate to edit project page
  };


  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
            Project Management
          </h1>
          <button
            onClick={() => navigate('/create-project')}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Create Project
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Projects
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, code, or team..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Projects</p>
            <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Live</p>
            <p className="text-2xl font-bold text-green-600">
              {projects.filter((p) => p.status === 'live').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Draft</p>
            <p className="text-2xl font-bold text-yellow-600">
              {projects.filter((p) => p.status === 'draft').length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Closed</p>
            <p className="text-2xl font-bold text-gray-600">
              {projects.filter((p) => p.status === 'closed').length}
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No projects found matching your criteria.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {project.projectName}
                      </h3>
                      <span className="text-sm text-gray-500">
                        ({project.projectCode})
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getProjectProgressColor(
                          project.projectProgress
                        )}`}
                      >
                        {getProjectProgressLabel(project.projectProgress)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Team:</span>{' '}
                        <span className="font-medium">{project.team}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Team Leader:</span>{' '}
                        <span className="font-medium">{project.teamLeader}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>{' '}
                        <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Start:</span>{' '}
                        <span className="font-medium">{project.startDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">End:</span>{' '}
                        <span className="font-medium">{project.endDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Deliverable:</span>{' '}
                        <span className="font-medium">
                          {project.deliverableDate || 'Not Set'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Budget:</span>{' '}
                        <span className="font-medium">${project.budget.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Team Members Section */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-gray-700">👥 Team Members:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.teamMembers.split(' / ').map((member, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                          >
                            {member.trim()}
                          </span>
                        ))}
                      </div>
                      {project.appTeam && project.appTeam !== 'Not specified' && (
                        <div className="mt-2">
                          <span className="text-sm font-semibold text-gray-700">📱 App Team:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {project.appTeam.split(' / ').map((member, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200"
                              >
                                {member.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress: {project.progress}%</span>
                        <span>
                          Tasks: {project.tasksCompleted}/{project.tasksTotal}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 whitespace-nowrap"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
          <button
            onClick={() => navigate('/project-chat')}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
          >
            👥 Project Group Chat
          </button>
          <button
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

export default ProjectManagement;
