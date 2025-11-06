import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyCode: '',
    registrationNumber: '',
    taxId: '',
    industry: '',
    foundedDate: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [companies, setCompanies] = useState([
    { 
      id: 1, 
      name: 'Tech Solutions Inc.', 
      code: 'TSI', 
      industry: 'Technology',
      departments: 4,
      employees: 80,
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Global Marketing Ltd.', 
      code: 'GML', 
      industry: 'Marketing',
      departments: 3,
      employees: 45,
      status: 'Active' 
    },
  ]);

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Marketing',
    'Consulting',
    'Real Estate',
    'Other',
  ];

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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.companyCode.trim()) {
      newErrors.companyCode = 'Company code is required';
    } else if (formData.companyCode.length > 10) {
      newErrors.companyCode = 'Company code must be 10 characters or less';
    }
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
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
      console.log('Company Data:', formData);
      
      const newCompany = {
        id: companies.length + 1,
        name: formData.companyName,
        code: formData.companyCode,
        industry: formData.industry,
        departments: 0,
        employees: 0,
        status: 'Active',
      };
      setCompanies([...companies, newCompany]);
      
      alert('Company created successfully! You can now create departments for this company.');
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      companyCode: '',
      registrationNumber: '',
      taxId: '',
      industry: '',
      foundedDate: '',
      website: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      description: '',
    });
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this company? This will also delete all associated departments and users.')) {
      setCompanies(companies.filter((company) => company.id !== id));
      alert('Company deleted successfully!');
    }
  };

  const handleEdit = (company) => {
    setFormData({
      companyName: company.name,
      companyCode: company.code,
      industry: company.industry,
      registrationNumber: '',
      taxId: '',
      foundedDate: '',
      website: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      description: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4 sm:mb-6">
          Company Management
        </h1>

        {/* Create Company Form */}
        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Create New Company
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyCode"
                      value={formData.companyCode}
                      onChange={handleChange}
                      required
                      maxLength="10"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.companyCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                     
                    />
                    {errors.companyCode && (
                      <p className="text-sm text-red-500 mt-1">{errors.companyCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                        errors.industry ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-sm text-red-500 mt-1">{errors.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Establishment
                    </label>
                    <input
                      type="date"
                      name="foundedDate"
                      value={formData.foundedDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="info@company.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 9101033202"
                    />
                  </div>

                      <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Address Information</h3>
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
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pin Code
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

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description about the company..."
                />
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
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Company
                </button>
              </div>
            </form>
          </div>

          {/* Companies List */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Existing Companies
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Code</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Company Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Departments</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Employees</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-blue-600">{company.code}</td>
                      <td className="px-4 py-3 font-medium">{company.name}</td>
                      <td className="px-4 py-3">{company.industry}</td>
                      <td className="px-4 py-3">{company.departments}</td>
                      <td className="px-4 py-3">{company.employees}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {company.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(company)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(company.id)}
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
                <p className="text-sm text-gray-600">Total Companies</p>
                <p className="text-2xl font-bold text-blue-600">{companies.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-green-600">
                  {companies.reduce((sum, c) => sum + c.departments, 0)}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-purple-600">
                  {companies.reduce((sum, c) => sum + c.employees, 0)}
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

export default CreateCompany;
