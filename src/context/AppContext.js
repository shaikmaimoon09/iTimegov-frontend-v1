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
      { id: 'cl2', name: 'Infersol', industry: 'Consulting', status: 'Active', contactPerson: 'Thiru Bujala', email: 'thiru@infersol.com', phone: '+1234567891', createdOn: '2025-01-02', createdBy: 'shatru' },
      { id: 'cl3', name: 'TechCorp', industry: 'Software', status: 'Active', contactPerson: 'John Smith', email: 'john@techcorp.com', phone: '+1234567892', createdOn: '2025-01-03', createdBy: 'shatru' },
      { id: 'cl4', name: 'DataSystems Inc', industry: 'Data Analytics', status: 'Active', contactPerson: 'Sarah Johnson', email: 'sarah@datasystems.com', phone: '+1234567893', createdOn: '2025-01-04', createdBy: 'shatru' },
      { id: 'cl5', name: 'CloudNet Solutions', industry: 'Cloud Services', status: 'Active', contactPerson: 'Michael Brown', email: 'michael@cloudnet.com', phone: '+1234567894', createdOn: '2025-01-05', createdBy: 'shatru' },
      { id: 'cl6', name: 'FinTech Global', industry: 'Finance', status: 'Active', contactPerson: 'Emily Davis', email: 'emily@fintech.com', phone: '+1234567895', createdOn: '2025-01-06', createdBy: 'shatru' },
      { id: 'cl7', name: 'HealthCare Plus', industry: 'Healthcare', status: 'Active', contactPerson: 'Robert Wilson', email: 'robert@healthcare.com', phone: '+1234567896', createdOn: '2025-01-07', createdBy: 'shatru' },
      { id: 'cl8', name: 'EduTech Systems', industry: 'Education', status: 'Active', contactPerson: 'Lisa Anderson', email: 'lisa@edutech.com', phone: '+1234567897', createdOn: '2025-01-08', createdBy: 'shatru' },
      { id: 'cl9', name: 'RetailMax', industry: 'Retail', status: 'Active', contactPerson: 'David Martinez', email: 'david@retailmax.com', phone: '+1234567898', createdOn: '2025-01-09', createdBy: 'shatru' },
      { id: 'cl10', name: 'AutoDrive Corp', industry: 'Automotive', status: 'Active', contactPerson: 'Jennifer Taylor', email: 'jennifer@autodrive.com', phone: '+1234567899', createdOn: '2025-01-10', createdBy: 'shatru' },
      { id: 'cl11', name: 'MediaWorks', industry: 'Media', status: 'Active', contactPerson: 'Christopher Lee', email: 'chris@mediaworks.com', phone: '+1234567900', createdOn: '2025-01-11', createdBy: 'shatru' },
      { id: 'cl12', name: 'GreenEnergy Ltd', industry: 'Energy', status: 'Active', contactPerson: 'Amanda White', email: 'amanda@greenenergy.com', phone: '+1234567901', createdOn: '2025-01-12', createdBy: 'shatru' },
      { id: 'cl13', name: 'TravelHub', industry: 'Travel', status: 'Active', contactPerson: 'Daniel Harris', email: 'daniel@travelhub.com', phone: '+1234567902', createdOn: '2025-01-13', createdBy: 'shatru' },
      { id: 'cl14', name: 'FoodChain Systems', industry: 'Food & Beverage', status: 'Active', contactPerson: 'Jessica Clark', email: 'jessica@foodchain.com', phone: '+1234567903', createdOn: '2025-01-14', createdBy: 'shatru' },
      { id: 'cl15', name: 'SportsTech', industry: 'Sports', status: 'Active', contactPerson: 'Matthew Lewis', email: 'matthew@sportstech.com', phone: '+1234567904', createdOn: '2025-01-15', createdBy: 'shatru' }
    ];
    setClients(sampleClients);

    // Initialize Contacts
    const sampleContacts = [
      { id: 'con1', name: 'Mangesh Kulkarni', email: 'mangesh@gtf.com', phone: '+1234567890', company: 'GTF', designation: 'CTO', status: 'Active' },
      { id: 'con2', name: 'Thiru Bujala', email: 'thiru@infersol.com', phone: '+1234567891', company: 'Infersol', designation: 'CEO', status: 'Active' },
      { id: 'con3', name: 'John Smith', email: 'john@techcorp.com', phone: '+1234567892', company: 'TechCorp', designation: 'VP Engineering', status: 'Active' },
      { id: 'con4', name: 'Sarah Johnson', email: 'sarah@datasystems.com', phone: '+1234567893', company: 'DataSystems Inc', designation: 'Director', status: 'Active' },
      { id: 'con5', name: 'Michael Brown', email: 'michael@cloudnet.com', phone: '+1234567894', company: 'CloudNet Solutions', designation: 'CTO', status: 'Active' },
      { id: 'con6', name: 'Emily Davis', email: 'emily@fintech.com', phone: '+1234567895', company: 'FinTech Global', designation: 'Product Manager', status: 'Active' },
      { id: 'con7', name: 'Robert Wilson', email: 'robert@healthcare.com', phone: '+1234567896', company: 'HealthCare Plus', designation: 'IT Director', status: 'Active' },
      { id: 'con8', name: 'Lisa Anderson', email: 'lisa@edutech.com', phone: '+1234567897', company: 'EduTech Systems', designation: 'VP Technology', status: 'Active' },
      { id: 'con9', name: 'David Martinez', email: 'david@retailmax.com', phone: '+1234567898', company: 'RetailMax', designation: 'CIO', status: 'Active' },
      { id: 'con10', name: 'Jennifer Taylor', email: 'jennifer@autodrive.com', phone: '+1234567899', company: 'AutoDrive Corp', designation: 'Tech Lead', status: 'Active' },
      { id: 'con11', name: 'Christopher Lee', email: 'chris@mediaworks.com', phone: '+1234567900', company: 'MediaWorks', designation: 'Senior Manager', status: 'Active' },
      { id: 'con12', name: 'Amanda White', email: 'amanda@greenenergy.com', phone: '+1234567901', company: 'GreenEnergy Ltd', designation: 'Project Manager', status: 'Active' },
      { id: 'con13', name: 'Daniel Harris', email: 'daniel@travelhub.com', phone: '+1234567902', company: 'TravelHub', designation: 'Operations Head', status: 'Active' },
      { id: 'con14', name: 'Jessica Clark', email: 'jessica@foodchain.com', phone: '+1234567903', company: 'FoodChain Systems', designation: 'Business Analyst', status: 'Active' },
      { id: 'con15', name: 'Matthew Lewis', email: 'matthew@sportstech.com', phone: '+1234567904', company: 'SportsTech', designation: 'Development Lead', status: 'Active' }
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
          { id: 'TSK-00739', name: 'Testing', description: 'Unit testing for timesheet module', estimatedHours: 5, assignedTo: 'Ramesh', costPerHour: 120, estimatedCost: 600, priority: 'High', status: 'Completed', startDate: '2025-01-06', endDate: '2025-01-10', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 6, locked: false },
          { id: 'TSK-00740', name: 'Brochure Design', description: 'Design marketing brochure', estimatedHours: 8, assignedTo: 'Varun', costPerHour: 130, estimatedCost: 1040, priority: 'Medium', status: 'Completed', startDate: '2025-01-13', endDate: '2025-01-19', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 8, locked: false },
          { id: 'TSK-00751', name: 'Data Migration', description: 'Migrate legacy data', estimatedHours: 14, assignedTo: 'Sainath', costPerHour: 135, estimatedCost: 1890, priority: 'High', status: 'Active', startDate: '2025-03-15', endDate: '2025-11-20', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: true },
          { id: 'TSK-00752', name: 'Reporting Module', description: 'Build reporting dashboard', estimatedHours: 13, assignedTo: 'Chandra', costPerHour: 140, estimatedCost: 1820, priority: 'Medium', status: 'Active', startDate: '2025-03-20', endDate: '2025-11-15', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: true },
          { id: 'TSK-00741', name: 'iPersonnel UI', description: 'User interface development', estimatedHours: 12, assignedTo: 'Maimoon', costPerHour: 150, estimatedCost: 1800, priority: 'High', status: 'Completed', startDate: '2025-01-20', endDate: '2025-01-28', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 12, locked: false },
          { id: 'TSK-00742', name: 'API Development', description: 'Backend API implementation', estimatedHours: 15, assignedTo: 'Chandra', costPerHour: 140, estimatedCost: 2100, priority: 'High', status: 'In Progress', startDate: '2025-01-22', endDate: '2025-12-05', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 8, locked: false },
          { id: 'TSK-00743', name: 'Database Schema', description: 'Design database structure', estimatedHours: 10, assignedTo: 'Ramya', costPerHour: 145, estimatedCost: 1450, priority: 'High', status: 'In Progress', startDate: '2025-01-25', endDate: '2025-12-03', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 5, locked: false },
          { id: 'TSK-00744', name: 'DevOps Setup', description: 'CI/CD pipeline configuration', estimatedHours: 8, assignedTo: 'Sainath', costPerHour: 135, estimatedCost: 1080, priority: 'Medium', status: 'Active', startDate: '2025-02-01', endDate: '2025-12-08', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00745', name: 'Security Audit', description: 'Security review and testing', estimatedHours: 12, assignedTo: 'Ramesh', costPerHour: 120, estimatedCost: 1440, priority: 'High', status: 'Active', startDate: '2025-02-10', endDate: '2025-12-20', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00746', name: 'Performance Optimization', description: 'Optimize application performance', estimatedHours: 10, assignedTo: 'Chandra', costPerHour: 140, estimatedCost: 1400, priority: 'Medium', status: 'Active', startDate: '2025-02-15', endDate: '2025-12-25', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00747', name: 'Mobile Responsive Design', description: 'Make UI mobile friendly', estimatedHours: 9, assignedTo: 'Varun', costPerHour: 130, estimatedCost: 1170, priority: 'Medium', status: 'Pending', startDate: '2025-02-18', endDate: '2025-12-27', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00748', name: 'Documentation', description: 'Technical documentation', estimatedHours: 6, assignedTo: 'Maimoon', costPerHour: 150, estimatedCost: 900, priority: 'Low', status: 'Pending', startDate: '2025-03-01', endDate: '2025-12-07', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00749', name: 'User Training', description: 'End user training sessions', estimatedHours: 8, assignedTo: 'Ramya', costPerHour: 145, estimatedCost: 1160, priority: 'Medium', status: 'Pending', startDate: '2025-03-05', endDate: '2025-12-12', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00750', name: 'Integration Testing', description: 'System integration tests', estimatedHours: 11, assignedTo: 'Ramesh', costPerHour: 120, estimatedCost: 1320, priority: 'High', status: 'Pending', startDate: '2025-03-10', endDate: '2025-12-21', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false },
          { id: 'TSK-00753', name: 'Final Deployment', description: 'Production deployment', estimatedHours: 7, assignedTo: 'Sainath', costPerHour: 135, estimatedCost: 945, priority: 'High', status: 'Pending', startDate: '2025-04-05', endDate: '2025-12-12', createdBy: 'shatru', updatedBy: 'shatru', actualHours: 0, locked: false }
        ],
        members: [
          { username: 'shatru', email: 'naik@gmail.com', designation: 'Project Manager', role: 'Manager', labourCategory: 'Project Manager', hourlyCostRate: 150, clientBillingRate: 200, allocation: 100, status: 'Active', assignedDate: '2025-01-01', assignedBy: 'shatru' },
          { username: 'Maimoon', email: 'maimoon.shaik@inferlabs.ai', designation: 'Developer', role: 'Developer', labourCategory: 'Developer', hourlyCostRate: 150, clientBillingRate: 200, allocation: 80, status: 'Active', assignedDate: '2025-01-02', assignedBy: 'shatru' },
          { username: 'Varun', email: 'varun.tatreddy@inferlabs.ai', designation: 'UI Designer', role: 'Designer', labourCategory: 'Designer', hourlyCostRate: 130, clientBillingRate: 170, allocation: 90, status: 'Active', assignedDate: '2025-01-02', assignedBy: 'shatru' },
          { username: 'Ramesh', email: 'ramesh.domala@inferlabs.ai', designation: 'QA Engineer', role: 'QA', labourCategory: 'QA Engineer', hourlyCostRate: 120, clientBillingRate: 160, allocation: 100, status: 'Active', assignedDate: '2025-01-03', assignedBy: 'shatru' },
          { username: 'Chandra', email: 'chandra.teepala@inferlabs.ai', designation: 'Senior Developer', role: 'Developer', labourCategory: 'Senior Developer', hourlyCostRate: 140, clientBillingRate: 190, allocation: 100, status: 'Active', assignedDate: '2025-01-03', assignedBy: 'shatru' },
          { username: 'Ramya', email: 'ramya.morabkina@inferlabs.ai', designation: 'Developer', role: 'Developer', labourCategory: 'Developer', hourlyCostRate: 145, clientBillingRate: 185, allocation: 100, status: 'Active', assignedDate: '2025-01-04', assignedBy: 'shatru' },
          { username: 'Sainath', email: 'sainath.medimi@inferlabs.ai', designation: 'DevOps Engineer', role: 'DevOps', labourCategory: 'DevOps Engineer', hourlyCostRate: 135, clientBillingRate: 175, allocation: 100, status: 'Active', assignedDate: '2025-01-04', assignedBy: 'shatru' },
          { username: 'Priya', email: 'priya.sharma@inferlabs.ai', designation: 'Team Lead', role: 'Lead', labourCategory: 'Team Lead', hourlyCostRate: 130, clientBillingRate: 180, allocation: 100, status: 'Active', assignedDate: '2025-01-05', assignedBy: 'shatru' },
          { username: 'Arjun', email: 'arjun.reddy@inferlabs.ai', designation: 'Business Analyst', role: 'Analyst', labourCategory: 'Business Analyst', hourlyCostRate: 95, clientBillingRate: 140, allocation: 80, status: 'Active', assignedDate: '2025-01-05', assignedBy: 'shatru' },
          { username: 'Sneha', email: 'sneha.patel@inferlabs.ai', designation: 'Architect', role: 'Architect', labourCategory: 'Architect', hourlyCostRate: 160, clientBillingRate: 220, allocation: 90, status: 'Active', assignedDate: '2025-01-06', assignedBy: 'shatru' },
          { username: 'Karthik', email: 'karthik.kumar@inferlabs.ai', designation: 'Product Owner', role: 'PO', labourCategory: 'Product Owner', hourlyCostRate: 145, clientBillingRate: 195, allocation: 100, status: 'Active', assignedDate: '2025-01-06', assignedBy: 'shatru' },
          { username: 'Divya', email: 'divya.singh@inferlabs.ai', designation: 'Scrum Master', role: 'SM', labourCategory: 'Scrum Master', hourlyCostRate: 125, clientBillingRate: 175, allocation: 100, status: 'Active', assignedDate: '2025-01-07', assignedBy: 'shatru' },
          { username: 'Rahul', email: 'rahul.verma@inferlabs.ai', designation: 'Technical Writer', role: 'Writer', labourCategory: 'Technical Writer', hourlyCostRate: 75, clientBillingRate: 110, allocation: 70, status: 'Active', assignedDate: '2025-01-07', assignedBy: 'shatru' },
          { username: 'Anjali', email: 'anjali.gupta@inferlabs.ai', designation: 'Support Engineer', role: 'Support', labourCategory: 'Support Engineer', hourlyCostRate: 85, clientBillingRate: 125, allocation: 90, status: 'Active', assignedDate: '2025-01-08', assignedBy: 'shatru' },
          { username: 'Vikram', email: 'vikram.joshi@inferlabs.ai', designation: 'Consultant', role: 'Consultant', labourCategory: 'Consultant', hourlyCostRate: 155, clientBillingRate: 210, allocation: 80, status: 'Active', assignedDate: '2025-01-08', assignedBy: 'shatru' }
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
      },
      {
        id: 'PRO-00026',
        name: 'E-Commerce Platform',
        client: 'TechCorp',
        status: 'Active',
        contact: 'John Smith',
        startDate: '2025-02-01',
        endDate: '2025-08-31',
        createdBy: 'shatru',
        createdOn: '2025-01-20',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00027',
        name: 'Data Analytics Dashboard',
        client: 'DataSystems Inc',
        status: 'Active',
        contact: 'Sarah Johnson',
        startDate: '2025-03-01',
        endDate: '2025-07-31',
        createdBy: 'shatru',
        createdOn: '2025-02-15',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00028',
        name: 'Cloud Migration',
        client: 'CloudNet Solutions',
        status: 'Active',
        contact: 'Michael Brown',
        startDate: '2025-04-01',
        endDate: '2025-10-31',
        createdBy: 'shatru',
        createdOn: '2025-03-10',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00029',
        name: 'Mobile Banking App',
        client: 'FinTech Global',
        status: 'Active',
        contact: 'Emily Davis',
        startDate: '2025-05-01',
        endDate: '2025-11-30',
        createdBy: 'shatru',
        createdOn: '2025-04-01',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00030',
        name: 'Patient Portal',
        client: 'HealthCare Plus',
        status: 'Active',
        contact: 'Robert Wilson',
        startDate: '2025-06-01',
        endDate: '2025-12-31',
        createdBy: 'shatru',
        createdOn: '2025-05-01',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00031',
        name: 'Learning Management System',
        client: 'EduTech Systems',
        status: 'Active',
        contact: 'Lisa Anderson',
        startDate: '2025-07-01',
        endDate: '2026-01-31',
        createdBy: 'shatru',
        createdOn: '2025-06-01',
        updatedBy: 'shatru',
        tasks: [],
        members: [],
        baselines: [],
        milestones: [],
        budget: []
      },
      {
        id: 'PRO-00032',
        name: 'Inventory Management',
        client: 'RetailMax',
        status: 'Active',
        contact: 'David Martinez',
        startDate: '2025-08-01',
        endDate: '2026-02-28',
        createdBy: 'shatru',
        createdOn: '2025-07-01',
        updatedBy: 'shatru',
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
        { id: 'TA-001', employee: 'Varun', project: 'Timesheets', task: 'Brochure Design', hours: 5, billingAmount: 850, costToCompany: 650, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-15' },
        { id: 'TA-002', employee: 'Maimoon', project: 'Timesheets', task: 'iPersonnel UI', hours: 8, billingAmount: 1600, costToCompany: 1200, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-16' },
        { id: 'TA-003', employee: 'Chandra', project: 'Oracle APEX', task: 'Database Design', hours: 6, billingAmount: 1140, costToCompany: 840, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-17' },
        { id: 'TA-004', employee: 'Ramya', project: 'Nexus', task: 'API Development', hours: 7, billingAmount: 1295, costToCompany: 1015, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-18' },
        { id: 'TA-005', employee: 'Sainath', project: 'Infersol Website', task: 'DevOps Setup', hours: 5, billingAmount: 875, costToCompany: 675, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-19' },
        { id: 'TA-006', employee: 'Varun', project: 'Inferlabs Website', task: 'UI Design', hours: 6, billingAmount: 1020, costToCompany: 780, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-20' },
        { id: 'TA-007', employee: 'Ramesh', project: 'HR Operations', task: 'Testing', hours: 4, billingAmount: 640, costToCompany: 480, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-21' },
        { id: 'TA-008', employee: 'Maimoon', project: 'Thumbarakonta Temple Website', task: 'Frontend Development', hours: 9, billingAmount: 1800, costToCompany: 1350, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-22' },
        { id: 'TA-009', employee: 'Chandra', project: 'iTimeDox', task: 'Backend Development', hours: 7, billingAmount: 1330, costToCompany: 980, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-23' },
        { id: 'TA-010', employee: 'Ramya', project: 'Timesheets', task: 'Code Review', hours: 3, billingAmount: 555, costToCompany: 435, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-24' },
        { id: 'TA-011', employee: 'Sainath', project: 'Oracle APEX', task: 'Deployment', hours: 5, billingAmount: 875, costToCompany: 675, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-25' },
        { id: 'TA-012', employee: 'Varun', project: 'Nexus', task: 'UI Components', hours: 6, billingAmount: 1020, costToCompany: 780, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-26' },
        { id: 'TA-013', employee: 'Ramesh', project: 'Infersol Website', task: 'QA Testing', hours: 5, billingAmount: 800, costToCompany: 600, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-27' },
        { id: 'TA-014', employee: 'Maimoon', project: 'Inferlabs Website', task: 'Integration', hours: 8, billingAmount: 1600, costToCompany: 1200, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-28' },
        { id: 'TA-015', employee: 'Chandra', project: 'HR Operations', task: 'Module Development', hours: 7, billingAmount: 1330, costToCompany: 980, status: 'Pending', approver: 'shatru', submittedOn: '2025-01-29' }
      ],
      taskRequests: [],
      baselineRequests: []
    });

    // Initialize Roles
    setRoles([
      { id: 'r1', name: 'Admin', description: 'Full system access', permissions: ['all'], createdOn: '2025-01-01' },
      { id: 'r2', name: 'Manager', description: 'Project management access', permissions: ['projects', 'approvals', 'reports'], createdOn: '2025-01-01' },
      { id: 'r3', name: 'Employee', description: 'Basic access', permissions: ['timesheets', 'tasks'], createdOn: '2025-01-01' },
      { id: 'r4', name: 'Team Lead', description: 'Team management access', permissions: ['projects', 'tasks', 'team'], createdOn: '2025-01-02' },
      { id: 'r5', name: 'Developer', description: 'Development access', permissions: ['tasks', 'code', 'timesheets'], createdOn: '2025-01-02' },
      { id: 'r6', name: 'QA Engineer', description: 'Quality assurance access', permissions: ['tasks', 'testing', 'timesheets'], createdOn: '2025-01-03' },
      { id: 'r7', name: 'Designer', description: 'Design access', permissions: ['tasks', 'design', 'timesheets'], createdOn: '2025-01-03' },
      { id: 'r8', name: 'DevOps', description: 'DevOps access', permissions: ['tasks', 'deployment', 'timesheets'], createdOn: '2025-01-04' },
      { id: 'r9', name: 'Business Analyst', description: 'Analysis access', permissions: ['projects', 'reports', 'timesheets'], createdOn: '2025-01-04' },
      { id: 'r10', name: 'Architect', description: 'Architecture access', permissions: ['projects', 'design', 'code'], createdOn: '2025-01-05' },
      { id: 'r11', name: 'Product Owner', description: 'Product management', permissions: ['projects', 'requirements', 'approvals'], createdOn: '2025-01-05' },
      { id: 'r12', name: 'Scrum Master', description: 'Agile facilitation', permissions: ['projects', 'team', 'reports'], createdOn: '2025-01-06' },
      { id: 'r13', name: 'Technical Writer', description: 'Documentation access', permissions: ['tasks', 'documentation'], createdOn: '2025-01-06' },
      { id: 'r14', name: 'Support Engineer', description: 'Support access', permissions: ['tasks', 'support', 'timesheets'], createdOn: '2025-01-07' },
      { id: 'r15', name: 'Consultant', description: 'Consulting access', permissions: ['projects', 'reports', 'timesheets'], createdOn: '2025-01-07' }
    ]);

    // Initialize Users
    setUsers([
      { id: 'u1', username: 'shatru', email: 'naik@gmail.com', role: 'Admin', status: 'Active', createdOn: '2025-01-01' },
      { id: 'u2', username: 'Chandra', email: 'chandra.teegala@inferlabs.ai', role: 'Manager', status: 'Active', createdOn: '2025-01-02' },
      { id: 'u3', username: 'Maimoon', email: 'maimoon.shaik@inferlabs.ai', role: 'Developer', status: 'Active', createdOn: '2025-01-03' },
      { id: 'u4', username: 'Ramesh', email: 'ramesh.dornala@inferlabs.ai', role: 'QA Engineer', status: 'Active', createdOn: '2025-01-04' },
      { id: 'u5', username: 'Varun', email: 'varun.tatireddy@inferlabs.ai', role: 'Designer', status: 'Active', createdOn: '2025-01-05' },
      { id: 'u6', username: 'Divya', email: 'divya.chigullarevu@inferlabs.ai', role: 'Developer', status: 'Active', createdOn: '2025-01-06' },
      { id: 'u7', username: 'Sainath', email: 'sainath.medimi@inferlabs.ai', role: 'DevOps', status: 'Active', createdOn: '2025-01-07' },
      { id: 'u8', username: 'Priya', email: 'priya.sharma@inferlabs.ai', role: 'Team Lead', status: 'Active', createdOn: '2025-01-08' },
      { id: 'u9', username: 'Arjun', email: 'arjun.reddy@inferlabs.ai', role: 'Business Analyst', status: 'Active', createdOn: '2025-01-09' },
      { id: 'u10', username: 'Sneha', email: 'sneha.patel@inferlabs.ai', role: 'Architect', status: 'Active', createdOn: '2025-01-10' },
      { id: 'u11', username: 'Karthik', email: 'karthik.kumar@inferlabs.ai', role: 'Product Owner', status: 'Active', createdOn: '2025-01-11' },
      { id: 'u12', username: 'Divya', email: 'divya.singh@inferlabs.ai', role: 'Scrum Master', status: 'Active', createdOn: '2025-01-12' },
      { id: 'u13', username: 'Rahul', email: 'rahul.verma@inferlabs.ai', role: 'Technical Writer', status: 'Active', createdOn: '2025-01-13' },
      { id: 'u14', username: 'Anjali', email: 'anjali.gupta@inferlabs.ai', role: 'Support Engineer', status: 'Active', createdOn: '2025-01-14' },
      { id: 'u15', username: 'Vikram', email: 'vikram.joshi@inferlabs.ai', role: 'Consultant', status: 'Active', createdOn: '2025-01-15' }
    ]);

    // Initialize Labour Categories
    setLabourCategories([
      { id: 'lc1', name: 'Project Manager', hourlyCost: 150, billingRate: 200, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc2', name: 'Senior Developer', hourlyCost: 140, billingRate: 190, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc3', name: 'Developer', hourlyCost: 100, billingRate: 150, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc4', name: 'Designer', hourlyCost: 90, billingRate: 130, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc5', name: 'QA Engineer', hourlyCost: 80, billingRate: 120, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc6', name: 'DevOps Engineer', hourlyCost: 110, billingRate: 160, createdOn: '2025-01-01', createdBy: 'shatru' },
      { id: 'lc7', name: 'Junior Developer', hourlyCost: 70, billingRate: 100, createdOn: '2025-01-02', createdBy: 'shatru' },
      { id: 'lc8', name: 'Team Lead', hourlyCost: 130, billingRate: 180, createdOn: '2025-01-02', createdBy: 'shatru' },
      { id: 'lc9', name: 'Business Analyst', hourlyCost: 95, billingRate: 140, createdOn: '2025-01-03', createdBy: 'shatru' },
      { id: 'lc10', name: 'Architect', hourlyCost: 160, billingRate: 220, createdOn: '2025-01-03', createdBy: 'shatru' },
      { id: 'lc11', name: 'Product Owner', hourlyCost: 145, billingRate: 195, createdOn: '2025-01-04', createdBy: 'shatru' },
      { id: 'lc12', name: 'Scrum Master', hourlyCost: 125, billingRate: 175, createdOn: '2025-01-04', createdBy: 'shatru' },
      { id: 'lc13', name: 'Technical Writer', hourlyCost: 75, billingRate: 110, createdOn: '2025-01-05', createdBy: 'shatru' },
      { id: 'lc14', name: 'Support Engineer', hourlyCost: 85, billingRate: 125, createdOn: '2025-01-05', createdBy: 'shatru' },
      { id: 'lc15', name: 'Consultant', hourlyCost: 155, billingRate: 210, createdOn: '2025-01-06', createdBy: 'shatru' }
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