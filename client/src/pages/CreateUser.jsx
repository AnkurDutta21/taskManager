import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyId: '',
    departmentId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    employeeId: '',
    joiningDate: '',
    expiryDate: '',
    isActive: true,
    skills: [],
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [companies] = useState([
    { id: 1, name: 'Tech Solutions Inc.', code: 'TSI' },
    { id: 2, name: 'Global Marketing Ltd.', code: 'GML' },
  ]);

  const [allDepartments] = useState([
    { id: 1, name: 'Sales', companyId: 1 },
    { id: 2, name: 'Marketing', companyId: 1 },
    { id: 3, name: 'Engineering', companyId: 1 },
    { id: 4, name: 'Human Resources', companyId: 2 },
    { id: 5, name: 'Finance', companyId: 2 },
  ]);

  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');

  // Filter departments when company changes
  const handleCompanyChange = (e) => {
    const companyId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      companyId: companyId,
      departmentId: '', // Reset department when company changes
    }));
    
    if (companyId) {
      const filtered = allDepartments.filter(dept => dept.companyId === parseInt(companyId));
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments([]);
    }
    
    if (errors.companyId) {
      setErrors((prev) => ({
        ...prev,
        companyId: '',
      }));
    }
  };

  const designations = [
    'Team Leader',
    'Senior Developer',
    'Junior Developer',
    'Senior Designer',
    'Junior Designer',
    'Project Manager',
    'Product Manager',
    'Business Analyst',
    'QA Engineer',
    'DevOps Engineer',
    'Sales Executive',
    'Marketing Specialist',
    'HR Coordinator',
    'Financial Analyst',
    'Operations Associate',
    'Support Engineer',
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

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
      }
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyId) {
      newErrors.companyId = 'Please select a company';
    }
    // Department is now optional - no validation needed
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.designation) {
      newErrors.designation = 'Designation is required';
    }
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('User Data:', formData);
      // Add your API call here
      const deptInfo = formData.departmentId ? ' in selected department' : ' (no department assigned)';
      alert(`User created successfully with designation: ${formData.designation}${deptInfo}`);
      // Reset form or navigate
      navigate('/');
    }
  };

  const handleReset = () => {
    setFormData({
      companyId: '',
      departmentId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      designation: '',
      employeeId: '',
      joiningDate: '',
      expiryDate: '',
      isActive: true,
      skills: [],
      address: '',
      city: '',
      state: '',
      zipCode: '',
      emergencyContact: '',
      emergencyPhone: '',
    });
    setFilteredDepartments([]);
    setErrors({});
    setSkillInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Create User
        </h1>

        <div className="space-y-6">
          {/* Company & Department Selection */}
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h2 className="text-xl font-medium text-blue-700 mb-4">
              Company & Department Selection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Company <span className="text-red-500">*</span>
                </label>
                <select
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleCompanyChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.companyId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name} ({company.code})
                    </option>
                  ))}
                </select>
                {errors.companyId && (
                  <p className="text-sm text-red-500 mt-1">{errors.companyId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Department <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  disabled={!formData.companyId}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.departmentId ? 'border-red-500' : 'border-gray-300'
                  } ${!formData.companyId ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {formData.companyId ? 'Select a department (optional)' : 'First select a company'}
                  </option>
                  {filteredDepartments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="text-sm text-red-500 mt-1">{errors.departmentId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Employment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.employeeId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.employeeId && (
                  <p className="text-sm text-red-500 mt-1">{errors.employeeId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.designation ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select designation</option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
                {errors.designation && (
                  <p className="text-sm text-red-500 mt-1">{errors.designation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (Press Enter to add)
                </label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Type a skill and press Enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(skill)}
                          className="ml-2 text-blue-700 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Address Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PinCode
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
