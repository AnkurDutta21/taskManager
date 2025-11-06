import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

const ProjectChat = () => {
  const navigate = useNavigate();

  // Mock projects data
  const [projects] = useState([
    {
      id: 1,
      name: 'SKYTRON BACK END',
      code: 'PROJ-2024-001',
      teamMembers: ['Ankur', 'Nitul', 'Kishalay'],
      status: 'active',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      code: 'PROJ-2024-002',
      teamMembers: ['Kajal', 'Samudra'],
      status: 'active',
    },
    {
      id: 3,
      name: 'Frontend Redesign',
      code: 'PROJ-2024-003',
      teamMembers: ['Twinkle', 'Nitul'],
      status: 'active',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600">
              Project Group Chat
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Collaborate with your team on project discussions
            </p>
          </div>
          <button
            onClick={() => navigate('/project-management')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm whitespace-nowrap"
          >
            ← Back to Projects
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Project List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Active Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProject.id === project.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {project.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        selectedProject.id === project.id
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {project.code}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span
                        className={`text-xs ${
                          selectedProject.id === project.id
                            ? 'text-blue-100'
                            : 'text-gray-600'
                        }`}
                      >
                        👥 {project.teamMembers.length} members
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Team Members
              </h3>
              <div className="space-y-2">
                {selectedProject.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-white rounded-md"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {member.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="h-[600px] sm:h-[700px]">
              <Chat
                chatId={selectedProject.id}
                chatType="project"
                chatTitle={selectedProject.name}
                currentUser="Admin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChat;
