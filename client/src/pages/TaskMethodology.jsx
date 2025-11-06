import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskMethodology = () => {
  const navigate = useNavigate();
  const [selectedMethodology, setSelectedMethodology] = useState('');

  const methodologies = [
    {
      id: 'anyBodyToAnyone',
      title: 'Any Body To Anyone',
      description: 'Any user can assign tasks to any other user in the organization',
      icon: '🌐',
    },
    {
      id: 'adminToAnyone',
      title: 'Admin to Anyone',
      description: 'Only administrators can assign tasks to any user',
      icon: '👑',
    },
    {
      id: 'adminTeamLeaderToTeam',
      title: 'Admin/Team Leader to Team',
      description: 'Admins and Team Leaders can assign tasks to their team members',
      icon: '👥',
    },
    {
      id: 'adminToAnyoneTeamAnyTeam',
      title: 'Admin to Any one team/any team',
      description: 'Admins can assign tasks to specific team members or entire teams',
      icon: '🎯',
    },
    {
      id: 'teamLeaderToHisTeam',
      title: 'Team Leader to His Team',
      description: 'Team Leaders can only assign tasks to their own team members',
      icon: '👨‍💼',
    },
    {
      id: 'hierarchyBased',
      title: 'Hierarchy Based',
      description: 'Task assignment follows organizational hierarchy structure',
      icon: '📊',
    },
  ];

  const handleMethodologySelect = (methodologyId) => {
    setSelectedMethodology(methodologyId);
  };

  const handleSave = () => {
    if (!selectedMethodology) {
      alert('Please select a task methodology');
      return;
    }
    console.log('Selected Methodology:', selectedMethodology);
    alert('Task Methodology saved successfully!');
    navigate('/');
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-2">
          Task Methodology
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Select how tasks can be assigned within your organization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodologies.map((methodology) => (
            <div
              key={methodology.id}
              onClick={() => handleMethodologySelect(methodology.id)}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all hover:shadow-lg ${
                selectedMethodology === methodology.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-4xl mb-3">{methodology.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {methodology.title}
              </h3>
              <p className="text-sm text-gray-600">{methodology.description}</p>
              {selectedMethodology === methodology.id && (
                <div className="mt-3 flex items-center text-blue-600">
                  <span className="text-xl mr-2">✓</span>
                  <span className="text-sm font-medium">Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-end mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskMethodology;
