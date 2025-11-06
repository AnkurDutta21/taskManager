import React from 'react';

// Step 1: Create Project
export const Step1CreateProject = ({ formData, errors, handleChange, priorities }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Step 1: Project Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="e.g., SKYTRON BACK END"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.projectName && <p className="text-sm text-red-500 mt-1">{errors.projectName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="projectCode"
          value={formData.projectCode}
          onChange={handleChange}
          placeholder="e.g., PROJ-2024-001"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectCode ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.projectCode && <p className="text-sm text-red-500 mt-1">{errors.projectCode}</p>}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Describe the project..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.startDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.endDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority <span className="text-red-500">*</span>
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
            errors.priority ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select priority</option>
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="e.g., 150000"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

// Step 2: Assign Members/Invite
export const Step2AssignMembers = ({
  formData,
  selectedMember,
  setSelectedMember,
  handleAddMember,
  handleRemoveMember,
  availableMembers,
  inviteEmail,
  setInviteEmail,
  handleInviteEmail,
  handleRemoveInvite,
  generateInviteUrl,
}) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">👥 Step 2: Assign Members & Invite</h2>
    
    {/* Add Team Members */}
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Add Team Members</h3>
      <div className="flex gap-3 mb-4">
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Select a team member</option>
          {availableMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} - {member.designation}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAddMember}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Member
        </button>
      </div>

      {formData.teamMembers.length > 0 && (
        <div className="bg-white rounded-md border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Selected Members ({formData.teamMembers.length})
          </h4>
          <div className="space-y-2">
            {formData.teamMembers.map((member) => (
              <div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">{member.name} - {member.designation}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Invite via Email */}
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Invite via Email</h3>
      <div className="flex gap-3 mb-4">
        <input
          type="email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder="Enter email address"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleInviteEmail}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Send Invite
        </button>
      </div>

      {formData.invitedEmails.length > 0 && (
        <div className="bg-white rounded-md border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Invited ({formData.invitedEmails.length})
          </h4>
          <div className="space-y-2">
            {formData.invitedEmails.map((email, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">{email}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInvite(email)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Generate Invite URL */}
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-3">Generate Invite Link</h3>
      <button
        type="button"
        onClick={generateInviteUrl}
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        🔗 Generate & Copy Invite URL
      </button>
      {formData.inviteUrl && (
        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
          <p className="text-xs text-gray-600 mb-1">Invite URL:</p>
          <p className="text-sm text-purple-700 font-mono break-all">{formData.inviteUrl}</p>
        </div>
      )}
    </div>
  </div>
);

// Step 3: Assign Tasks
export const Step3AssignTasks = ({
  formData,
  newTask,
  setNewTask,
  handleAddTask,
  handleRemoveTask,
  priorities,
}) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">✓ Step 3: Assign Tasks</h2>
    
    <div className="bg-white rounded-md border border-gray-200 p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Add New Task</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="e.g., Design database schema"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            rows="2"
            placeholder="Task description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
          <select
            value={newTask.assignee}
            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select assignee</option>
            {formData.teamMembers.map((member) => (
              <option key={member.id} value={member.name}>{member.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleAddTask}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>

    {/* Task List */}
    {formData.tasks.length > 0 ? (
      <div className="bg-white rounded-md border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Tasks ({formData.tasks.length})
        </h4>
        <div className="space-y-3">
          {formData.tasks.map((task) => (
            <div key={task.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-gray-800">{task.title}</h5>
                <button
                  type="button"
                  onClick={() => handleRemoveTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              {task.description && <p className="text-sm text-gray-600 mb-2">{task.description}</p>}
              <div className="flex gap-4 text-xs text-gray-500">
                {task.assignee && <span>👤 {task.assignee}</span>}
                <span className={`font-semibold ${
                  task.priority === 'Critical' ? 'text-red-600' :
                  task.priority === 'High' ? 'text-orange-600' :
                  task.priority === 'Medium' ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {task.priority}
                </span>
                {task.dueDate && <span>📅 {task.dueDate}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500 py-8">No tasks added yet</p>
    )}
  </div>
);

// Step 4: Go Live
export const Step4GoLive = ({ formData }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
    <div className="text-center mb-6">
      <div className="text-6xl mb-4">🚀</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Go Live!</h2>
      <p className="text-gray-600">Review your project details before launching</p>
    </div>

    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Overview</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.projectName}</span></div>
          <div><span className="text-gray-600">Code:</span> <span className="font-medium">{formData.projectCode}</span></div>
          <div><span className="text-gray-600">Start:</span> <span className="font-medium">{formData.startDate}</span></div>
          <div><span className="text-gray-600">End:</span> <span className="font-medium">{formData.endDate}</span></div>
          <div><span className="text-gray-600">Priority:</span> <span className="font-medium">{formData.priority}</span></div>
          {formData.budget && <div><span className="text-gray-600">Budget:</span> <span className="font-medium">${formData.budget}</span></div>}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Team</h3>
        <p className="text-sm text-gray-600">
          {formData.teamMembers.length} member(s) assigned, {formData.invitedEmails.length} invitation(s) sent
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Tasks</h3>
        <p className="text-sm text-gray-600">{formData.tasks.length} task(s) created</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Click "Go Live" to create and activate your project!
        </p>
      </div>
    </div>
  </div>
);
