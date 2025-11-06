export const menuItems = {
  main: [
    { text: 'Dashboard', icon: '📊', path: '/', roles: ['admin', 'user'] },
  ],

  Company: [
    { text: 'Create Company', icon: '🏢', path: '/create-company', roles: ['admin'] },
  ],

  Department: [
    { text: 'Create Department(Optional)', icon: '🏛️', path: '/create-department', roles: ['admin'] },
  ],

   CreateUsers: [
    { text: 'Create User', icon: '👤', path: '/create-user', roles: ['admin'] },
  ],


  Organization: [
    // { text: 'Task Methodology', icon: '⚙️', path: '/task-methodology', roles: ['admin'] },
    { text: 'Organisational Hierarchy', icon: '🎯', path: '/designation', roles: ['admin'] },
  ],

  CreateUsers: [
    { text: 'Create User', icon: '👤', path: '/create-user', roles: ['admin'] },
  ],

  Assign: [
    { text: 'Individual Task', icon: '📝', path: '/assign-task', roles: ['admin'] },
    { text: 'Project', icon: '📁', path: '/create-project', roles: ['admin'] },
   ],

   Management: [
     { text: 'Task Management', icon: '📋', path: '/task-management', roles: ['admin'] },
     { text: 'Project Management', icon: '📂', path: '/project-management', roles: ['admin'] },
     { text: 'User Management', icon: '👥', path: '/user-management', roles: ['admin'] },
     { text: 'Holiday Calendar', icon: '📅', path: '/holiday-calendar', roles: ['admin'] },
  ],

  Communication: [
    { text: 'Project Group Chat', icon: '👥', path: '/project-chat', roles: ['admin', 'user'] },
    { text: 'Task Chat', icon: '💬', path: '/task-chat', roles: ['admin', 'user'] },
  ],

  MyWork: [
    { text: 'View Tasks', icon: '✅', path: '/my-tasks', roles: ['member'] },
    { text: 'Individual Tasks', icon: '🎯', path: '/individual-tasks', roles: ['member'] },
    // { text: 'My Queries', icon: '💬', path: '/member-query', roles: ['member'] },
    // { text: 'Query & Reply', icon: '💬', path: '/query-reply', roles: ['admin', 'user'] },
  ],

  // Alerts: [
  //   { text: 'Alert Management', icon: '🔔', path: '/alert-management', roles: ['admin', 'user'] },
  // ],

  // Reports: [
  //   { text: 'View Reports', icon: '📈', path: '/reports', roles: ['admin', 'user'] },
  // ],
};
