import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';

export const MilestonesTab = ({ project }) => {
  const { addMilestone, currentUser } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    tasks: []
  });

  // Added state for task dropdown and selections
  const [taskDropdownOpen, setTaskDropdownOpen] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const handleAddMilestone = () => {
    if (!newMilestone.name) return;
    const selectedTasks = (project.tasks || []).filter(t => selectedTaskIds.includes(t.id));
    addMilestone(project.id, { ...newMilestone, tasks: selectedTasks });
    setShowAddDialog(false);
    setSelectedTaskIds([]);
    setTaskDropdownOpen(false);
    setNewMilestone({
      id: '',
      name: '',
      startDate: '',
      endDate: '',
      status: 'Active',
      tasks: []
    });
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTaskIds(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const selectedCount = selectedTaskIds.length;
  const selectedNamesPreview = (project.tasks || [])
    .filter(t => selectedTaskIds.includes(t.id))
    .map(t => t.name)
    .slice(0, 3)
    .join(', ');

  return (
    <div className="space-y-6" data-testid="milestones-tab">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Milestones</h3>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button data-testid="add-milestone-btn" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="milestone-name">Milestone Name *</Label>
                <Input
                  id="milestone-name"
                  data-testid="input-milestone-name"
                  value={newMilestone.name}
                  onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
                  placeholder="Milestone 3 - Testing Phase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date *</Label>
                  <Input
                    id="start-date"
                    data-testid="input-milestone-start"
                    type="date"
                    value={newMilestone.startDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date *</Label>
                  <Input
                    id="end-date"
                    data-testid="input-milestone-end"
                    type="date"
                    value={newMilestone.endDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* New Tasks multi-select dropdown with checkboxes */}
              <div>
                <Label>Tasks</Label>
                <div className="relative">
                  <button
                    type="button"
                    data-testid="task-dropdown-btn"
                    onClick={() => setTaskDropdownOpen(open => !open)}
                    className="w-full text-left border rounded px-3 py-2 flex items-center justify-between bg-white"
                  >
                    <div className="flex-1 min-w-0 flex items-center flex-wrap gap-1">
                      {selectedCount === 0 ? (
                        <span className="text-sm text-gray-500">Select tasks...</span>
                      ) : (
                        (project.tasks || [])
                          .filter(t => selectedTaskIds.includes(t.id))
                          .map(task => (
                            <span
                              key={task.id}
                              className="inline-flex items-center bg-gray-100 text-sm text-gray-800 rounded-full px-2 py-0.5 mr-1"
                              data-testid={`selected-task-token-${task.id}`}
                            >
                              <span className="truncate max-w-[8rem] block">{task.name}</span>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); toggleTaskSelection(task.id); }}
                                className="ml-2 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={`Remove ${task.name}`}
                              >
                                ×
                              </button>
                            </span>
                          ))
                      )}
                    </div>
                    <svg className="h-4 w-4 text-gray-500 ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {taskDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
                      {(project.tasks && project.tasks.length > 0) ? (
                        (project.tasks || []).map(task => (
                          <label key={task.id} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              data-testid={`task-option-${task.id}`}
                              checked={selectedTaskIds.includes(task.id)}
                              onChange={() => toggleTaskSelection(task.id)}
                              className="mr-3"
                            />
                            <div className="text-sm">
                              <div className="font-medium text-gray-800">{task.name}</div>
                              <div className="text-xs text-gray-500">{task.taskId ? `ID: ${task.taskId}` : ''}</div>
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">No tasks available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setShowAddDialog(false); setSelectedTaskIds([]); setTaskDropdownOpen(false); }} data-testid="cancel-milestone-btn">Cancel</Button>
              <Button onClick={handleAddMilestone} className="bg-blue-600 hover:bg-blue-700" data-testid="save-milestone-btn">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Milestones List */}
      <div className="grid gap-6">
        {project.milestones && project.milestones.length > 0 ? (
          project.milestones.map((milestone) => (
            <Card key={milestone.id} className="shadow-md" data-testid={`milestone-card-${milestone.id}`}>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{milestone.name}</CardTitle>
                  <Badge 
                    className={`${
                      milestone.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                    } text-white`}
                  >
                    {milestone.status === 'Completed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {milestone.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {milestone.startDate} to {milestone.endDate}
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Planned Hours</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assigned Member</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Carried Over</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {milestone.tasks && milestone.tasks.length > 0 ? (
                        milestone.tasks.map((task, index) => (
                          <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-blue-600 font-medium">{task.taskId}</td>
                            <td className="py-3 px-4 text-sm">{task.taskName}</td>
                            <td className="py-3 px-4 text-sm">{task.plannedHours}h</td>
                            <td className="py-3 px-4 text-sm">{task.assignedMember}</td>
                            <td className="py-3 px-4">
                              <Badge variant={task.carriedOver ? 'destructive' : 'secondary'}>
                                {task.carriedOver ? 'Yes' : 'No'}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-6 text-gray-500">No tasks assigned to this milestone</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-md">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No milestones created yet. Click "Add Milestone" to create one.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};