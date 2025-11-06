import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Designation = () => {
  const navigate = useNavigate();
  
  // Predefined designations to choose from
  const availableDesignations = [
    'CEO',
    'CTO',
    'CFO',
    'COO',
    'Team Leader',
    'Senior Team Leader',
    'Project Manager',
    'Product Manager',
    'Senior Developer',
    'Junior Developer',
    'Senior Designer',
    'Junior Designer',
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

  const [designations, setDesignations] = useState([
    { id: 1, title: 'CEO', level: 1, reportsTo: null },
    { id: 2, title: 'CTO', level: 2, reportsTo: 'CEO' },
    { id: 3, title: 'Team Leader', level: 3, reportsTo: 'CTO' },
    { id: 4, title: 'Senior Developer', level: 4, reportsTo: 'Team Leader' },
    { id: 5, title: 'Junior Developer', level: 5, reportsTo: 'Senior Developer' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    level: '',
    reportsTo: '',
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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
    if (!formData.title.trim()) {
      newErrors.title = 'Designation title is required';
    }
    if (!formData.level) {
      newErrors.level = 'Hierarchy level is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        setDesignations(
          designations.map((d) =>
            d.id === editId ? { ...formData, id: editId } : d
          )
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        const newDesignation = {
          ...formData,
          id: designations.length + 1,
        };
        setDesignations([...designations, newDesignation]);
      }
      handleReset();
      alert(
        isEditing
          ? 'Designation updated successfully!'
          : 'Designation added successfully!'
      );
    }
  };

  const handleEdit = (designation) => {
    setFormData({
      title: designation.title,
      level: designation.level,
      reportsTo: designation.reportsTo || '',
    });
    setIsEditing(true);
    setEditId(designation.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this designation?')) {
      setDesignations(designations.filter((d) => d.id !== id));
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      level: '',
      reportsTo: '',
    });
    setErrors({});
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Organisational Hierarchy Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              {isEditing ? 'Edit Designation' : 'Select Designation'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Designation <span className="text-red-500">*</span>
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a designation</option>
                  {availableDesignations
                    .filter(des => !designations.find(d => d.title === des))
                    .map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                </select>
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hierarchy Level <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  min="1"
                  placeholder="1 = Highest"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.level ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.level && (
                  <p className="text-sm text-red-500 mt-1">{errors.level}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reports To
                </label>
                <select
                  name="reportsTo"
                  value={formData.reportsTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select reporting designation</option>
                  {designations.map((d) => (
                    <option key={d.id} value={d.title}>
                      {d.title}
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
                  {isEditing ? 'Cancel' : 'Reset'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditing ? 'Update' : 'Add to'} Hierarchy
                </button>
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Current Hierarchy
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {designations
                .sort((a, b) => a.level - b.level)
                .map((designation) => (
                  <div
                    key={designation.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            Level {designation.level}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {designation.title}
                          </h3>
                        </div>
                        {designation.reportsTo && (
                          <p className="text-sm text-gray-600 mt-2">
                            Reports to: <span className="font-medium">{designation.reportsTo}</span>
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(designation)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(designation.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

export default Designation;
