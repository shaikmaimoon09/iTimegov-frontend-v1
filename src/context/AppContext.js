import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, addDays, isAfter, parseISO } from 'date-fns';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentUser] = useState('Shatru Naik');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [approvals, setApprovals] = useState({
    timesheets: [],
    taskRequests: [],
    baselineRequests: []
  });
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [labourCategories, setLabourCategories] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    initializeSampleData();
  }, []);

  const initializeSampleData = () => {
    // Initialize Employees
    const sampleEmployees = [
      { id: 'emp1', username: 'shatru', email: 'naik@gmail.com', designation: 'Project Manager', hourlyRate: 150, billingRate: 200, allocation: 100, status: 'Active' },
      { id: 'emp2', username: 'Chandra', email: 'chandra.teepala@inferlabs.ai', designation: 'Senior Developer', hourlyRate: 140, billingRate: 190, allocation: 100, status: 'Active' },
      { id: 'emp3', username: 'Maimoon', email: 'maimoon.shaik@inferlabs.ai', designation: 'Developer', hourlyRate: 150, billingRate: 200, allocation: 80, status: 'Active' },
      { id: 'emp4', username: 'Ramesh', email: 'ramesh.domala@inferlabs.ai', designation: 'QA Engineer', hourlyRate: 120, billingRate: 160, allocation: 100, status: 'Active' },
      { id: 'emp5', username: 'Varun', email: 'varun.tatreddy@inferlabs.ai', designation: 'UI Designer', hourlyRate: 130, billingRate: 170, allocation: 90, status: 'Active' },
      { id: 'emp6', username: 'Ramya', email: 'ramya.morabkina@inferlabs.ai', designation: 'Developer', hourlyRate: 145, billingRate: 185, allocation: 100, status: 'Active' },
      { id: 'emp7', username: 'Sainath', email: 'sainath.medimi@inferlabs.ai', designation: 'DevOps Engineer', hourlyRate: 135, billingRate: 175, allocation: 100, status: 'Active' }
    ];
    setEmployees(sampleEmployees);

    // Initialize Clients
    const sampleClients = [
      { id: 'cl1', name: 'GTF', industry: 'Technology', status: 'Active', contactPerson: 'Mangesh Kulkarni', email: 'mangesh@gtf.com', phone: '+1234567890', createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'cl2', name: 'Infersol', industry: 'Consulting', status: 'Active', contactPerson: 'Thiru Bujala', email: 'thiru@infersol.com', phone: '+1234567891', createdOn: '2025-01-02', createdBy: 'shatru' }
    ];
    setClients(sampleClients);

    // Initialize Contacts
    const sampleContacts = [
      { id: 'con1', name: 'Mangesh Kulkarni', email: 'mangesh@gtf.com', phone: '+1234567890', company: 'GTF', designation: 'CTO', status: 'Active' },
      { id: 'con2', name: 'Thiru Bujala', email: 'thiru@infersol.com', phone: '+1234567891', company: 'Infersol', designation: 'CEO', status: 'Active' }
    ];
    setContacts(sampleContacts);

    // Initialize Projects with full HRMS data
    const sampleProjects = [
      {
        id: 'PRO-00018',
        name: 'Timesheets',
        client: 'GTF',
        status: 'Active',
        contact: 'Mangesh Kulkarni',
        startDate: '2025-01-06',
        endDate: '2025-12-31',
        createdBy: 'shatru',
        createdOn: '2025-01-01',
        updatedBy: 'shatru',
        tasks: [
          {
            id: 'TSK-00739',
            name: 'Testing',
            description: 'Unit testing for timesheet module',
            estimatedHours: 5,
            assignedTo: 'Ramesh',
            costPerHour: 120,
            estimatedCost: 600,
            priority: 'High',
            status: 'Completed',
            startDate: '2025-01-06',
            endDate: '2025-01-10',
            createdBy: 'shatru',
            updatedBy: 'shatru',
            actualHours: 6,
            locked: false
          },
          {
            id: 'TSK-00740',
            name: 'Brochure Design',
            description: 'Design marketing brochure',
            estimatedHours: 8,
            assignedTo: 'Varun',
            costPerHour: 130,
            estimatedCost: 1040,
            priority: 'Medium',
            status: 'In Progress',
            startDate: '2025-01-13',
            endDate: '2025-01-19',
            createdBy: 'shatru',
            updatedBy: 'shatru',
            actualHours: 5,
            locked: false
          },
          {
            id: 'TSK-00741',
            name: 'iPersonnel UI',
            description: 'User interface development',
            estimatedHours: 12,
            assignedTo: 'Maimoon',
            costPerHour: 150,
            estimatedCost: 1800,
            priority: 'High',
            status: 'Active',
            startDate: '2025-01-20',
            endDate: '2025-01-28',
            createdBy: 'shatru',
            updatedBy: 'shatru',
            actualHours: 0,
            locked: false
          }
        ],
        members: [
          { username: 'shatru', email: 'naik@gmail.com', designation: 'Project Manager', role: 'Manager', labourCategory: 'Project Manager', hourlyCostRate: 150, clientBillingRate: 200, allocation: 100, status: 'Active', assignedDate: '2025-01-01', assignedBy: 'shatru' },
          { username: 'Maimoon', email: 'maimoon.shaik@inferlabs.ai', designation: 'Developer', role: 'Developer', labourCategory: 'Developer', hourlyCostRate: 150, clientBillingRate: 200, allocation: 80, status: 'Active', assignedDate: '2025-01-02', assignedBy: 'shatru' },
          { username: 'Varun', email: 'varun.tatreddy@inferlabs.ai', designation: 'UI Designer', role: 'Designer', labourCategory: 'Designer', hourlyCostRate: 130, clientBillingRate: 170, allocation: 90, status: 'Active', assignedDate: '2025-01-02', assignedBy: 'shatru' },
          { username: 'Ramesh', email: 'ramesh.domala@inferlabs.ai', designation: 'QA Engineer', role: 'QA', labourCategory: 'QA Engineer', hourlyCostRate: 120, clientBillingRate: 160, allocation: 100, status: 'Active', assignedDate: '2025-01-03', assignedBy: 'shatru' }
        ],
        baselines: [
          {
            id: 'BL-001',
            name: 'Initial Baseline',
            createdOn: '2025-01-05',
            createdBy: 'shatru',
            totalEstimatedHours: 25,
            totalEstimatedCost: 3440,
            totalTasks: 3,
            tasks: [
              { taskId: 'TSK-00739', taskName: 'Testing', plannedHours: 5, plannedCost: 600, plannedStartDate: '2025-01-06', plannedEndDate: '2025-01-10', assignedMember: 'Ramesh' },
              { taskId: 'TSK-00740', taskName: 'Brochure Design', plannedHours: 8, plannedCost: 1040, plannedStartDate: '2025-01-13', plannedEndDate: '2025-01-19', assignedMember: 'Varun' },
              { taskId: 'TSK-00741', taskName: 'iPersonnel UI', plannedHours: 12, plannedCost: 1800, plannedStartDate: '2025-01-20', plannedEndDate: '2025-01-28', assignedMember: 'Maimoon' }
            ]
          }
        ],
        milestones: [
          {
            id: 'M1',
            name: 'Milestone 1 - Initial Development',
            startDate: '2025-01-06',
            endDate: '2025-01-19',
            status: 'Completed',
            tasks: [
              { taskId: 'TSK-00739', taskName: 'Testing', plannedHours: 5, assignedMember: 'Ramesh', carriedOver: false },
              { taskId: 'TSK-00740', taskName: 'Brochure Design', plannedHours: 8, assignedMember: 'Varun', carriedOver: false }
            ]
          },
          {
            id: 'M2',
            name: 'Milestone 2 - UI Development',
            startDate: '2025-01-20',
            endDate: '2025-01-31',
            status: 'Active',
            tasks: [
              { taskId: 'TSK-00741', taskName: 'iPersonnel UI', plannedHours: 12, assignedMember: 'Maimoon', carriedOver: false }
            ]
          }
        ],
        budget: [
          { month: 'January', plannedHours: 25, plannedBudget: 3440, actualHours: 11, actualCost: 1470, ev: 1470, sv: -1970, cv: 0, spi: 0.43, cpi: 1.0, associatedMilestones: ['M1', 'M2'] },
          { month: 'February', plannedHours: 40, plannedBudget: 5600, actualHours: 0, actualCost: 0, ev: 0, sv: -5600, cv: 0, spi: 0, cpi: 0, associatedMilestones: [] },
          { month: 'March', plannedHours: 35, plannedBudget: 4900, actualHours: 0, actualCost: 0, ev: 0, sv: -4900, cv: 0, spi: 0, cpi: 0, associatedMilestones: [] }
        ]
      },
      {
        id: 'PRO-00019',
        name: 'Oracle APEX',
        client: 'GTF',
        status: 'Active',
        contact: 'Mangesh Kulkarni',
        startDate: '2025-02-01',
        endDate: '2025-06-30',
        createdBy: 'shatru',
        createdOn: '2025-01-15',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00020',
        name: 'Nexus',
        client: 'Infersol',
        status: 'Active',
        contact: 'Thiru Bujala',
        startDate: '2025-03-01',
        endDate: '2025-09-30',
        createdBy: 'shatru',
        createdOn: '2025-02-01',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00021',
        name: 'Infersol Website',
        client: 'Infersol',
        status: 'Active',
        contact: 'Thiru Bujala',
        startDate: '2025-02-15',
        endDate: '2025-05-15',
        createdBy: 'shatru',
        createdOn: '2025-02-10',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00022',
        name: 'Inferlabs Website',
        client: 'Infersol',
        status: 'Active',
        contact: 'Thiru Bujala',
        startDate: '2025-03-01',
        endDate: '2025-06-30',
        createdBy: 'shatru',
        createdOn: '2025-02-20',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00023',
        name: 'HR Operations',
        client: 'Infersol',
        status: 'Active',
        contact: 'Thiru Bujala',
        startDate: '2025-04-01',
        endDate: '2025-08-31',
        createdBy: 'shatru',
        createdOn: '2025-03-15',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00024',
        name: 'Thumbarakonta Temple Website',
        client: 'Infersol',
        status: 'Active',
        contact: 'Thiru Bujala',
        startDate: '2025-05-01',
        endDate: '2025-07-31',
        createdBy: 'shatru',
        createdOn: '2025-04-15',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00025',
        name: 'iTimeDox',
        client: 'Infersol',
        status: 'Active',
        contact: 'Thiru Bujala',
        startDate: '2025-11-20',
        endDate: '2025-12-28',
        createdBy: 'ramesh',
        createdOn: '2025-11-15',
        updatedBy: 'ramesh',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      }
    ];
    setProjects(sampleProjects);

    // Initialize sample timesheets
    const sampleTimesheets = [
      {
        id: 'TS-001',
        employee: 'Ramesh',
        project: 'Timesheets',
        projectId: 'PRO-00018',
        task: 'Testing',
        taskId: 'TSK-00739',
        hours: 6,
        date: '2025-01-08',
        notes: 'Completed unit tests',
        status: 'Approved',
        submittedOn: '2025-01-08',
        approvedBy: 'shatru',
        approvedOn: '2025-01-09',
        billingAmount: 960,
        costToCompany: 720
      },
      {
        id: 'TS-002',
        employee: 'Varun',
        project: 'Timesheets',
        projectId: 'PRO-00018',
        task: 'Brochure Design',
        taskId: 'TSK-00740',
        hours: 5,
        date: '2025-01-15',
        notes: 'Initial design drafts',
        status: 'Pending',
        submittedOn: '2025-01-15',
        approvedBy: null,
        approvedOn: null,
        billingAmount: 850,
        costToCompany: 650
      }
    ];
    setTimesheets(sampleTimesheets);

    // Initialize approvals
    setApprovals({
      timesheets: [
        {
          id: 'TA-001',
          employee: 'Varun',
          project: 'Timesheets',
          task: 'Brochure Design',
          hours: 5,
          billingAmount: 850,
          costToCompany: 650,
          status: 'Pending',
          approver: 'shatru',
          submittedOn: '2025-01-15'
        }
      ],
      taskRequests: [],
      baselineRequests: []
    });

    // Initialize Roles
    setRoles([
      { id: 'r1', name: 'Admin', description: 'Full system access', permissions: ['all'], createdOn: '2025-01-01' },
      { id: 'r2', name: 'Manager', description: 'Project management access', permissions: ['projects', 'approvals', 'reports'], createdOn: '2025-01-01' },
      { id: 'r3', name: 'Employee', description: 'Basic access', permissions: ['timesheets', 'tasks'], createdOn: '2025-01-01' }
    ]);

    // Initialize Users
    setUsers([
      { id: 'u1', username: 'shatru', email: 'naik@gmail.com', role: 'Admin', status: 'Active', createdOn: '2025-01-01' },
      { id: 'u2', username: 'Chandra', email: 'chandra.teepala@inferlabs.ai', role: 'Manager', status: 'Active', createdOn: '2025-01-02' }
    ]);

    // Initialize Labour Categories
    setLabourCategories([
      { id: 'lc1', name: 'Project Manager', hourlyCost: 150, billingRate: 200, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc2', name: 'Senior Developer', hourlyCost: 140, billingRate: 190, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc3', name: 'Developer', hourlyCost: 100, billingRate: 150, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc4', name: 'Designer', hourlyCost: 90, billingRate: 130, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc5', name: 'QA Engineer', hourlyCost: 80, billingRate: 120, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc6', name: 'DevOps Engineer', hourlyCost: 110, billingRate: 160, createdOn: '2025-01-01', createdBy: 'shatru' }
    ]);
  };

  // Auto-lock tasks that passed end date
  useEffect(() => {
    const checkTaskLocks = () => {
      const today = new Date();
      const updatedProjects = projects.map(project => ({
        ...project,
        tasks: project.tasks?.map(task => {
          if (task.endDate && task.status !== 'Completed') {
            const endDate = parseISO(task.endDate);
            if (isAfter(today, endDate)) {
              return { ...task, locked: true };
            }
          }
          return task;
        }) || []
      }));
      setProjects(updatedProjects);
    };

    if (projects.length > 0) {
      checkTaskLocks();
    }
  }, [projects.length]);

  const addProject = (project) => {
    setProjects([...projects, { ...project, tasks: [], members: [], baselines: [], milestones: [], budget: [] }]);
  };

  const updateProject = (id, updatedData) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const addTask = (projectId, task) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, tasks: [...(p.tasks || []), task] } : p
    ));
  };

  const updateTask = (projectId, taskId, updatedTask) => {
    setProjects(projects.map(p =>
      p.id === projectId ? {
        ...p,
        tasks: p.tasks?.map(t => t.id === taskId ? { ...t, ...updatedTask } : t) || []
      } : p
    ));
  };

  const addMember = (projectId, member) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, members: [...(p.members || []), member] } : p
    ));
  };

  const addBaseline = (projectId, baseline) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, baselines: [...(p.baselines || []), baseline] } : p
    ));
  };

  const addMilestone = (projectId, milestone) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, milestones: [...(p.milestones || []), milestone] } : p
    ));
  };

  const addTimesheet = (timesheet) => {
    setTimesheets([...timesheets, timesheet]);

    // Update actual hours in task
    const project = projects.find(p => p.id === timesheet.projectId);
    if (project) {
      const task = project.tasks?.find(t => t.id === timesheet.taskId);
      if (task) {
        const newActualHours = (task.actualHours || 0) + timesheet.hours;
        updateTask(timesheet.projectId, timesheet.taskId, { actualHours: newActualHours });
      }
    }
  };

  const addTaskRequest = (request) => {
    setApprovals(prev => ({
      ...prev,
      taskRequests: [...prev.taskRequests, request]
    }));
  };

  const addBaselineRequest = (request) => {
    setApprovals(prev => ({
      ...prev,
      baselineRequests: [...prev.baselineRequests, request]
    }));
  };

  const approveTaskRequest = (requestId) => {
    setApprovals(prev => ({
      ...prev,
      taskRequests: prev.taskRequests.map(r =>
        r.id === requestId ? { ...r, status: 'Approved' } : r
      )
    }));

    // Unlock the task
    const request = approvals.taskRequests.find(r => r.id === requestId);
    if (request) {
      updateTask(request.projectId, request.taskId, {
        locked: false,
        endDate: request.proposedEndDate,
        status: 'Active'
      });
    }
  };

  const approveBaselineRequest = (requestId, level) => {
    setApprovals(prev => ({
      ...prev,
      baselineRequests: prev.baselineRequests.map(r => {
        if (r.id === requestId) {
          if (level === 'manager') {
            return { ...r, managerStatus: 'Approved', managerApprovedBy: currentUser, managerApprovedOn: new Date().toISOString() };
          } else if (level === 'admin') {
            return { ...r, adminStatus: 'Approved', adminApprovedBy: currentUser, adminApprovedOn: new Date().toISOString(), finalStatus: 'Approved' };
          }
        }
        return r;
      })
    }));
  };

  const addLabourCategory = (category) => {
    setLabourCategories([...labourCategories, category]);
  };

  const addMonthlyBudget = (projectId, budgetItem) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, budget: [...(p.budget || []), budgetItem] } : p
    ));
  };

  const value = {
    currentUser,
    projects,
    clients,
    contacts,
    employees,
    timesheets,
    approvals,
    roles,
    users,
    addProject,
    updateProject,
    addTask,
    updateTask,
    addMember,
    addBaseline,
    addMilestone,
    addTimesheet,
    addTaskRequest,
    addBaselineRequest,
    approveTaskRequest,
    approveBaselineRequest,
    labourCategories,
    addLabourCategory,
    addMonthlyBudget,
    setClients,
    setContacts,
    setEmployees,
    setRoles,
    setUsers
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};