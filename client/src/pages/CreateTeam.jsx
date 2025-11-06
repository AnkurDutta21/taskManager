import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: '',
    department: '',
    description: '',
    teamLeader: '',
    maxMembers: '',
    createdDate: '',
    teamMembers: [],
  });

  const [errors, setErrors] = useState({});
  const [selectedMember, setSelectedMember] = useState('');

  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
  ];

  const teamLeaders = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown',
  ];

  // Mock available team members - Replace with API call
  const availableMembers = [
    { id: 1, name: 'Alice Johnson', employeeId: 'EMP001', department: 'Engineering', role: 'Senior Developer' },
    { id: 2, name: 'Bob Smith', employeeId: 'EMP002', department: 'Sales', role: 'Sales Executive' },
    { id: 3, name: 'Charlie Brown', employeeId: 'EMP003', department: 'Marketing', role: 'Marketing Specialist' },
    { id: 4, name: 'Diana Prince', employeeId: 'EMP004', department: 'Engineering', role: 'Junior Developer' },
    { id: 5, name: 'Eve Wilson', employeeId: 'EMP005', department: 'Finance', role: 'Financial Analyst' },
    { id: 6, name: 'Frank Miller', employeeId: 'EMP006', department: 'Operations', role: 'Operations Associate' },
    { id: 7, name: 'Grace Lee', employeeId: 'EMP007', department: 'Customer Support', role: 'Support Engineer' },
    { id: 8, name: 'Henry Davis', employeeId: 'EMP008', department: 'Engineering', role: 'Senior Developer' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    } else if (formData.teamName.trim().length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.teamLeader) {
      newErrors.teamLeader = 'Team Leader is required';
    }

    if (!formData.maxMembers) {
      newErrors.maxMembers = 'Maximum members is required';
    } else if (formData.maxMembers < 1) {
      newErrors.maxMembers = 'Maximum members must be at least 1';
    } else if (formData.maxMembers > 100) {
      newErrors.maxMembers = 'Maximum members cannot exceed 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Team Data:', formData);
      // Add your API call here
      alert('Team created successfully!');
      // Reset form or navigate
      navigate('/');
    }
  };

  const handleReset = () => {
    setFormData({
      teamName: '',
      department: '',
      description: '',
      teamLeader: '',
      maxMembers: '',
      createdDate: '',
      teamMembers: [],
    });
    setErrors({});
    setSelectedMember('');
  };

  const handleAddMember = () => {
    if (!selectedMember) {
      alert('Please select a team member');
      return;
    }

    const member = availableMembers.find((m) => m.id === parseInt(selectedMember));
    
    if (formData.teamMembers.find((m) => m.id === member.id)) {
      alert('This member is already added to the team');
      return;
    }

    if (formData.maxMembers && formData.teamMembers.length >= parseInt(formData.maxMembers)) {
      alert(`Cannot add more than ${formData.maxMembers} members`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, member],
    }));
    setSelectedMember('');
  };

  const handleRemoveMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== memberId),
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Create Team
        </h1>

        <div className="space-y-6">
          {/* Team Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Team Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.teamName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.teamName && (
                  <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-sm text-red-500 mt-1">{errors.department}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the team's purpose and responsibilities..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Team Configuration */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Team Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Leader <span className="text-red-500">*</span>
                </label>
                <select
                  name="teamLeader"
                  value={formData.teamLeader}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.teamLeader ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select team leader</option>
                  {teamLeaders.map((leader) => (
                    <option key={leader} value={leader}>
                      {leader}
                    </option>
                  ))}
                </select>
                {errors.teamLeader && (
                  <p className="text-sm text-red-500 mt-1">{errors.teamLeader}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Team Members <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.maxMembers ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxMembers && (
                  <p className="text-sm text-red-500 mt-1">{errors.maxMembers}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Creation Date
                </label>
                <input
                  type="date"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Add Team Members
            </h2>
            
            <div className="flex gap-3 mb-4">
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select a team member</option>
                {availableMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.employeeId} ({member.department})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddMember}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 whitespace-nowrap"
              >
                Add Member
              </button>
            </div>

            {formData.teamMembers.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Selected Members ({formData.teamMembers.length}
                  {formData.maxMembers ? ` / ${formData.maxMembers}` : ''})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Employee ID</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Department</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Role</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.teamMembers.map((member) => (
                        <tr key={member.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-2">{member.employeeId}</td>
                          <td className="px-4 py-2">{member.name}</td>
                          <td className="px-4 py-2">{member.department}</td>
                          <td className="px-4 py-2">{member.role}</td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(member.id)}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {formData.teamMembers.length === 0 && (
              <p className="text-sm text-gray-500 italic">No team members added yet</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
