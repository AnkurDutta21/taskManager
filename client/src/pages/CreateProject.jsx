import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Step1CreateProject,
  Step2AssignMembers,
} from '../components/ProjectWizardSteps';

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
    description: '',
    teamMembers: [],
    inviteUrl: '',
    invitedEmails: [],
    tasks: [],
    startDate: '',
    endDate: '',
    priority: '',
    budget: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedMember, setSelectedMember] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const steps = [
    { number: 1, title: 'Create Project', icon: '📋' },
    { number: 2, title: 'Assign Members', icon: '👥' },
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const availableMembers = [
    { id: 1, name: 'Ankur', employeeId: 'EMP001', designation: 'Team Leader' },
    { id: 2, name: 'Nitul', employeeId: 'EMP002', designation: 'Senior Developer' },
    { id: 3, name: 'Kishalay', employeeId: 'EMP003', designation: 'Developer' },
    { id: 4, name: 'Kajal', employeeId: 'EMP004', designation: 'App Developer' },
    { id: 5, name: 'Twinkle', employeeId: 'EMP005', designation: 'Developer' },
    { id: 6, name: 'Samudra', employeeId: 'EMP006', designation: 'App Developer' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.projectCode.trim()) newErrors.projectCode = 'Project code is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (formData.endDate < formData.startDate) newErrors.endDate = 'End date must be after start date';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generateInviteUrl = () => {
    const url = `${window.location.origin}/invite/${formData.projectCode}/${Math.random().toString(36).substr(2, 9)}`;
    setFormData((prev) => ({ ...prev, inviteUrl: url }));
    navigator.clipboard.writeText(url);
    alert('Invite URL copied to clipboard!');
  };

  const handleAddMember = () => {
    if (!selectedMember) {
      alert('Please select a team member');
      return;
    }
    const member = availableMembers.find((m) => m.id === parseInt(selectedMember));
    if (formData.teamMembers.find((m) => m.id === member.id)) {
      alert('This member is already added');
      return;
    }
    setFormData((prev) => ({ ...prev, teamMembers: [...prev.teamMembers, member] }));
    setSelectedMember('');
  };

  const handleRemoveMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== memberId),
    }));
  };

  const handleInviteEmail = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    if (formData.invitedEmails.includes(inviteEmail)) {
      alert('Email already invited');
      return;
    }
    setFormData((prev) => ({ ...prev, invitedEmails: [...prev.invitedEmails, inviteEmail] }));
    setInviteEmail('');
    alert(`Invitation sent to ${inviteEmail}`);
  };

  const handleRemoveInvite = (email) => {
    setFormData((prev) => ({
      ...prev,
      invitedEmails: prev.invitedEmails.filter((e) => e !== email),
    }));
  };

  const handleCreateProject = () => {
    if (formData.teamMembers.length === 0) {
      alert('Please add at least one team member');
      return;
    }
    console.log('Project Data:', formData);
    alert('🎉 Project created successfully! You can now assign tasks from Task Management.');
    navigate('/project-management');
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-6">
          Create New Project
        </h1>

        {/* Step Progress Indicator */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all ${
                      currentStep >= step.number
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <p
                    className={`text-sm mt-3 font-medium whitespace-nowrap ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-32 h-1 mx-4 transition-all ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <Step1CreateProject
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              priorities={priorities}
            />
          )}

          {currentStep === 2 && (
            <Step2AssignMembers
              formData={formData}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
              handleAddMember={handleAddMember}
              handleRemoveMember={handleRemoveMember}
              availableMembers={availableMembers}
              inviteEmail={inviteEmail}
              setInviteEmail={setInviteEmail}
              handleInviteEmail={handleInviteEmail}
              handleRemoveInvite={handleRemoveInvite}
              generateInviteUrl={generateInviteUrl}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/project-management')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
              >
                ← Previous
              </button>
            )}

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateProject}
                className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
              >
                ✓ Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
