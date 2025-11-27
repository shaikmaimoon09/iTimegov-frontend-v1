import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Plus, AlertCircle, Upload, Filter, Trash2, Eye, Edit } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import '../CSSFILES/TasksTab.css';
export const TasksTab = ({ project }) => {
  const { addTask, updateTask, employees, addTaskRequest, currentUser } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newTask, setNewTask] = useState({
    id: '',
    name: '',
    description: '',
    estimatedHours: '',
    assignedTo: '',
    costPerHour: '',
    estimatedCost: '',
    priority: 'Medium',
    status: 'Active',
    startDate: '',
    endDate: '',
    createdBy: currentUser,
    updatedBy: currentUser,
    actualHours: 0,
    locked: false
  });
  const [taskRequest, setTaskRequest] = useState({
    requestTitle: '',
    taskName: '',
    taskId: '',
    reason: '',
    evidence: null,
    proposedEndDate: ''
  });

  const [filters, setFilters] = useState({
    id: '',
    name: '',
    estimatedHours: '',
    costPerHour: '',
    estimatedCost: '',
    status: '',
    assignedTo: '',
    startDate: '',
    endDate: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tasks = project.tasks || [];

  const filteredTasks = tasks.filter(task => {
    if (filters.id && !task.id.toLowerCase().includes(filters.id.toLowerCase())) return false;
    if (filters.name && !task.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.estimatedHours && !task.estimatedHours.toString().includes(filters.estimatedHours)) return false;
    if (filters.costPerHour && !task.costPerHour.toString().includes(filters.costPerHour)) return false;
    if (filters.estimatedCost && !task.estimatedCost.toString().includes(filters.estimatedCost)) return false;
    if (filters.status && filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.assignedTo && filters.assignedTo !== 'all' && task.assignedTo !== filters.assignedTo) return false;
    if (filters.startDate && task.startDate < filters.startDate) return false;
    if (filters.endDate && task.endDate > filters.endDate) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setFilters({
      id: '',
      name: '',
      estimatedHours: '',
      costPerHour: '',
      estimatedCost: '',
      status: '',
      assignedTo: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleAssigneeChange = (value) => {
    const employee = employees.find(e => e.username === value);
    if (employee) {
      const cost = parseFloat(newTask.estimatedHours || 0) * employee.hourlyRate;
      setNewTask({
        ...newTask,
        assignedTo: value,
        costPerHour: employee.hourlyRate,
        estimatedCost: cost
      });
    }
  };

  const handleHoursChange = (value) => {
    const cost = parseFloat(value || 0) * (newTask.costPerHour || 0);
    setNewTask({
      ...newTask,
      estimatedHours: value,
      estimatedCost: cost
    });
  };

  const handleAddTask = () => {
    if (!newTask.id || !newTask.name) return;
    addTask(project.id, newTask);
    setShowAddDialog(false);
    setNewTask({
      id: '',
      name: '',
      description: '',
      estimatedHours: '',
      assignedTo: '',
      costPerHour: '',
      estimatedCost: '',
      priority: 'Medium',
      status: 'Active',
      startDate: '',
      endDate: '',
      createdBy: currentUser,
      updatedBy: currentUser,
      actualHours: 0,
      locked: false
    });
  };

  const handleRaiseTaskRequest = () => {
    if (!taskRequest.requestTitle || !taskRequest.reason) return;

    const request = {
      id: 'TR-' + Date.now(),
      ...taskRequest,
      requestedBy: currentUser,
      submittedOn: new Date().toISOString().split('T')[0],
      status: 'Pending',
      projectId: project.id
    };

    addTaskRequest(request);
    setShowRequestDialog(false);
    setTaskRequest({
      requestTitle: '',
      taskName: '',
      taskId: '',
      reason: '',
      evidence: null,
      proposedEndDate: ''
    });
  };

  const openRequestDialog = (task) => {
    setSelectedTask(task);
    setTaskRequest({
      ...taskRequest,
      taskName: task.name,
      taskId: task.id
    });
    setShowRequestDialog(true);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedTasks.map(t => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (taskId, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, taskId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== taskId));
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} task(s)?`)) {
      // Filter out selected tasks
      const updatedTasks = project.tasks.filter(t => !selectedRows.includes(t.id));
      // Update project tasks (you may need to add updateProject to context)
      alert('Delete functionality needs updateProject in context');
      setSelectedRows([]);
    }
  };

  const handleView = () => {
    if (selectedRows.length === 1) {
      const task = project.tasks.find(t => t.id === selectedRows[0]);
      alert(`Viewing task: ${task.name}`);
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const task = project.tasks.find(t => t.id === selectedRows[0]);
      alert(`Editing task: ${task.name}`);
    }
  };

  return (
    <div className="space-y-6" data-testid="tasks-tab">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-900">Tasks of Project {project.name}</h3>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
                <span className="text-sm text-blue-700 font-medium">{selectedRows.length} selected</span>
                <div className="h-4 w-px bg-blue-200 mx-2"></div>
                <div className="flex items-center gap-1">
                  {selectedRows.length === 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleView}
                        className="h-8 w-8 p-0 hover:bg-blue-100"
                        title="View"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEdit}
                        className="h-8 w-8 p-0 hover:bg-blue-100"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={clearFilters} className="text-gray-600 border-gray-300 hover:bg-gray-50" data-testid="clear-filters-btn">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            <Button
              data-testid="download-btn"
              variant="outline"
              size="icon"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button data-testid="add-task-btn" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <Label htmlFor="task-id">Task ID *</Label>
                    <Input
                      id="task-id"
                      data-testid="input-task-id"
                      value={newTask.id}
                      onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
                      placeholder="TSK-00742"
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-name">Task Name *</Label>
                    <Input
                      id="task-name"
                      data-testid="input-task-name"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      placeholder="Enter task name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      data-testid="input-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Task description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimated-hours">Estimated Hours *</Label>
                    <Input
                      id="estimated-hours"
                      data-testid="input-estimated-hours"
                      type="number"
                      value={newTask.estimatedHours}
                      onChange={(e) => handleHoursChange(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="assigned-to">Assign To *</Label>
                    <Select value={newTask.assignedTo} onValueChange={handleAssigneeChange}>
                      <SelectTrigger data-testid="select-assigned-to">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.username}>
                            {emp.username} (${emp.hourlyRate}/hr)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cost-per-hour">Cost Per Hour</Label>
                    <Input
                      id="cost-per-hour"
                      data-testid="input-cost-per-hour"
                      type="number"
                      value={newTask.costPerHour}
                      disabled
                      placeholder="Auto-calculated"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimated-cost">Estimated Cost</Label>
                    <Input
                      id="estimated-cost"
                      data-testid="input-estimated-cost"
                      type="number"
                      value={newTask.estimatedCost}
                      disabled
                      placeholder="Auto-calculated"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                      <SelectTrigger data-testid="select-priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                      <SelectTrigger data-testid="select-task-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="start-date">Start Date *</Label>
                    <Input
                      id="start-date"
                      data-testid="input-task-start-date"
                      type="date"
                      value={newTask.startDate}
                      onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date *</Label>
                    <Input
                      id="end-date"
                      data-testid="input-task-end-date"
                      type="date"
                      value={newTask.endDate}
                      onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="cancel-task-btn">Cancel</Button>
                  <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700" data-testid="save-task-btn">Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Task Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Raise Task Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="request-title">Request Title *</Label>
              <Input
                id="request-title"
                data-testid="input-request-title"
                value={taskRequest.requestTitle}
                onChange={(e) => setTaskRequest({ ...taskRequest, requestTitle: e.target.value })}
                placeholder="Task extension request"
              />
            </div>
            <div>
              <Label>Task Name</Label>
              <Input value={taskRequest.taskName} disabled />
            </div>
            <div>
              <Label>Task ID</Label>
              <Input value={taskRequest.taskId} disabled />
            </div>
            <div>
              <Label htmlFor="reason">Reason for Delay *</Label>
              <Textarea
                id="reason"
                data-testid="input-reason"
                value={taskRequest.reason}
                onChange={(e) => setTaskRequest({ ...taskRequest, reason: e.target.value })}
                placeholder="Explain the reason for delay"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="evidence">Upload Evidence</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="evidence"
                  data-testid="input-evidence"
                  type="file"
                  onChange={(e) => setTaskRequest({ ...taskRequest, evidence: e.target.files[0]?.name || null })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="proposed-end-date">Proposed New End Date *</Label>
              <Input
                id="proposed-end-date"
                data-testid="input-proposed-end-date"
                type="date"
                value={taskRequest.proposedEndDate}
                onChange={(e) => setTaskRequest({ ...taskRequest, proposedEndDate: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowRequestDialog(false)} data-testid="cancel-request-btn">Cancel</Button>
            <Button onClick={handleRaiseTaskRequest} className="bg-blue-600 hover:bg-blue-700" data-testid="submit-request-btn">Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tasks Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm overflow-x-auto" style={{ scrollbarColor: '#ffffff #f1f1f1', scrollbarWidth: 'thin' }}>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 py-3 px-4">
                <Checkbox
                  checked={selectedRows.length === paginatedTasks.length && paginatedTasks.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Estimated Hours</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost Per Hour</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Estimated Cost</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Assigned To</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Start Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">End Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
            </tr>
            {/* Filter Row */}
            <tr className="bg-gray-50">
              <th className="py-2 px-4"></th>
              <th className="py-2 px-4">
                <Input
                  placeholder="Filter ID..."
                  value={filters.id}
                  onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4">
                <Input
                  placeholder="Filter Name..."
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4">
                <Input
                  placeholder="Hours..."
                  value={filters.estimatedHours}
                  onChange={(e) => setFilters({ ...filters, estimatedHours: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4">
                <Input
                  placeholder="Rate..."
                  value={filters.costPerHour}
                  onChange={(e) => setFilters({ ...filters, costPerHour: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4">
                <Input
                  placeholder="Cost..."
                  value={filters.estimatedCost}
                  onChange={(e) => setFilters({ ...filters, estimatedCost: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4">
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? '' : value })}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </th>
              <th className="py-2 px-4">
                <Select value={filters.assignedTo} onValueChange={(value) => setFilters({ ...filters, assignedTo: value === 'all' ? '' : value })}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.username}>{emp.username}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </th>
              <th className="py-2 px-4">
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4">
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="h-8 text-xs"
                />
              </th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <tr key={task.id} className="border-t hover:bg-gray-50" data-testid={`task-row-${task.id}`}>
                  <td className="py-3 px-4">
                    <Checkbox
                      checked={selectedRows.includes(task.id)}
                      onCheckedChange={(checked) => handleSelectRow(task.id, checked)}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{task.id}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{task.name}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{task.estimatedHours}h</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">${task.costPerHour}/hr</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">${task.estimatedCost}</td>
                  <td className="py-3 px-4">
                    {task.locked ? (
                      <Badge variant="destructive" className="bg-red-600 whitespace-nowrap" data-testid={`locked-badge-${task.id}`}>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        LOCKED
                      </Badge>
                    ) : (
                      <Badge
                        className={`whitespace-nowrap ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {task.status}
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{task.assignedTo}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{task.startDate}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{task.endDate}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {task.locked && (
                      <Button
                        size="sm"
                        onClick={() => openRequestDialog(task)}
                        className="bg-orange-600 hover:bg-orange-700 text-xs"
                        data-testid={`raise-request-btn-${task.id}`}
                      >
                        Raise Task Request
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-8 text-gray-500 whitespace-nowrap">
                  No tasks found. Click "Add Task" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600 whitespace-nowrap">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTasks.length)} of {filteredTasks.length}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Select value={itemsPerPage.toString()} onValueChange={(val) => {
          setItemsPerPage(Number(val));
          setCurrentPage(1);
        }}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};