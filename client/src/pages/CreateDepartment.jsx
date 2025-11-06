import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDepartment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyId: '',
    departmentName: '',
    departmentCode: '',
    headOfDepartment: '',
    description: '',
    location: '',
    email: '',
    phone: '',
    establishedDate: '',
  });

  const [companies] = useState([
    { id: 1, name: 'Tech Solutions Inc.', code: 'TSI' },
    { id: 2, name: 'Global Marketing Ltd.', code: 'GML' },
  ]);

  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Sales', code: 'SLS', head: 'John Smith', employees: 15, status: 'Active' },
    { id: 2, name: 'Marketing', code: 'MKT', head: 'Sarah Johnson', employees: 12, status: 'Active' },
    { id: 3, name: 'Engineering', code: 'ENG', head: 'Mike Chen', employees: 45, status: 'Active' },
    { id: 4, name: 'Human Resources', code: 'HR', head: 'Emily Davis', employees: 8, status: 'Active' },
  ]);

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

    if (!formData.companyId) {
      newErrors.companyId = 'Please select a company';
    }
    if (!formData.departmentName.trim()) {
      newErrors.departmentName = 'Department name is required';
    }
    if (!formData.departmentCode.trim()) {
      newErrors.departmentCode = 'Department code is required';
    } else if (formData.departmentCode.length > 5) {
      newErrors.departmentCode = 'Department code must be 5 characters or less';
    }
    if (!formData.headOfDepartment.trim()) {
      newErrors.headOfDepartment = 'Head of department is required';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Department Data:', formData);
      
      // Add new department to the list
      const newDepartment = {
        id: departments.length + 1,
        name: formData.departmentName,
        code: formData.departmentCode,
        head: formData.headOfDepartment,
        employees: 0,
        status: 'Active',
      };
      setDepartments([...departments, newDepartment]);
      
      alert('Department created successfully!');
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      companyId: '',
      departmentName: '',
      departmentCode: '',
      headOfDepartment: '',
      description: '',
      location: '',
      email: '',
      phone: '',
      establishedDate: '',
    });
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter((dept) => dept.id !== id));
      alert('Department deleted successfully!');
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      departmentName: dept.name,
      departmentCode: dept.code,
      headOfDepartment: dept.head,
      description: '',
      location: '',
      email: '',
      phone: '',
      budget: '',
      establishedDate: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Department Management
        </h1>

        {/* Create Department Form */}
        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Create New Department
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Company <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
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

                {/* Department Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.departmentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Engineering"
                  />
                  {errors.departmentName && (
                    <p className="text-sm text-red-500 mt-1">{errors.departmentName}</p>
                  )}
                </div>

                {/* Department Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="departmentCode"
                    value={formData.departmentCode}
                    onChange={handleChange}
                    required
                    maxLength="5"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.departmentCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., ENG"
                  />
                  {errors.departmentCode && (
                    <p className="text-sm text-red-500 mt-1">{errors.departmentCode}</p>
                  )}
                </div>

                {/* Head of Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Head of Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="headOfDepartment"
                    value={formData.headOfDepartment}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.headOfDepartment ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., John Doe"
                  />
                  {errors.headOfDepartment && (
                    <p className="text-sm text-red-500 mt-1">{errors.headOfDepartment}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Building A, Floor 3"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="dept@company.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the department's responsibilities..."
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>

          {/* Departments List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Existing Departments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Code</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Department Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Head</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Employees</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-blue-600">{dept.code}</td>
                      <td className="px-4 py-3">{dept.name}</td>
                      <td className="px-4 py-3">{dept.head}</td>
                      <td className="px-4 py-3">{dept.employees}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {dept.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(dept)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(dept.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-blue-600">{departments.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Active Departments</p>
                <p className="text-2xl font-bold text-green-600">
                  {departments.filter((d) => d.status === 'Active').length}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-purple-600">
                  {departments.reduce((sum, d) => sum + d.employees, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
