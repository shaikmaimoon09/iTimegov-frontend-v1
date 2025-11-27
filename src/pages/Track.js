import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Plus, Calendar, Upload, Trash2, Edit } from 'lucide-react';
import { format, startOfWeek, addDays } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

// Sample labour categories - replace with your data source
const LABOUR_CATEGORIES = [
  { id: 1, name: 'Senior Developer' },
  { id: 2, name: 'Junior Developer' },
  { id: 3, name: 'QA Engineer' },
  { id: 4, name: 'DevOps Engineer' },
  { id: 5, name: 'Project Manager' },
  { id: 6, name: 'UI/UX Designer' },
];

export const Track = () => {
  const { projects, addTimesheet, currentUser, employees } = useApp();
  const [viewMode, setViewMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState('shatru');

  // State for managing multiple timesheet rows in week view
  const [timesheetRows, setTimesheetRows] = useState([
    { id: Date.now(), project: '', task: '', labourCategory: '', hours: {} }
  ]);

  // State for edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editFormData, setEditFormData] = useState({
    duration: '',
    notes: '',
    tags: '',
    files: null
  });

  const [dayEntry, setDayEntry] = useState({
    project: '',
    task: '',
    labourCategory: '',
    duration: '',
    notes: '',
    tags: '',
    files: null
  });

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Add a new timesheet row
  const handleAddTimesheetRow = () => {
    setTimesheetRows([...timesheetRows, { id: Date.now(), project: '', task: '', labourCategory: '', hours: {} }]);
  };

  // Delete a timesheet row
  const handleDeleteRow = (rowId) => {
    if (timesheetRows.length > 1) {
      setTimesheetRows(timesheetRows.filter(row => row.id !== rowId));
    }
  };

  // Update project for a row
  const handleProjectChange = (rowId, projectName) => {
    setTimesheetRows(timesheetRows.map(row =>
      row.id === rowId ? { ...row, project: projectName, task: '' } : row
    ));
  };

  // Update task for a row
  const handleTaskChange = (rowId, taskName) => {
    setTimesheetRows(timesheetRows.map(row =>
      row.id === rowId ? { ...row, task: taskName } : row
    ));
  };

  // Update labour category for a row
  const handleLabourCategoryChange = (rowId, labourCategory) => {
    setTimesheetRows(timesheetRows.map(row =>
      row.id === rowId ? { ...row, labourCategory } : row
    ));
  };

  // Update hours for a specific day in a row
  const handleHoursChange = (rowId, dayIndex, hours) => {
    setTimesheetRows(timesheetRows.map(row =>
      row.id === rowId ? { ...row, hours: { ...row.hours, [dayIndex]: hours } } : row
    ));
  };

  // Get available tasks for a specific row
  const getAvailableTasks = (projectName) => {
    if (!projectName) return [];
    const project = projects.find(p => p.name === projectName);
    return project?.tasks || [];
  };

  // Calculate total hours for a row
  const getRowTotal = (row) => {
    return Object.values(row.hours).reduce((sum, h) => sum + (parseFloat(h) || 0), 0).toFixed(2);
  };

  // Calculate total hours for a specific day
  const getDayTotal = (dayIndex) => {
    return timesheetRows.reduce((sum, row) => sum + (parseFloat(row.hours[dayIndex]) || 0), 0).toFixed(2);
  };

  // Calculate grand total
  const getGrandTotal = () => {
    return timesheetRows.reduce((sum, row) => sum + parseFloat(getRowTotal(row)), 0).toFixed(2);
  };

  // Open edit dialog for a specific time entry cell
  const handleEditTimeEntry = (rowId, dayIndex, date) => {
    const row = timesheetRows.find(r => r.id === rowId);
    setEditingEntry({ rowId, dayIndex, date, project: row.project, task: row.task, labourCategory: row.labourCategory });
    setEditFormData({
      duration: row.hours[dayIndex] || '',
      notes: '',
      tags: '',
      files: null
    });
    setShowEditDialog(true);
  };

  // Save edited time entry
  const handleSaveEditedEntry = () => {
    if (!editFormData.duration) return;

    handleHoursChange(editingEntry.rowId, editingEntry.dayIndex, editFormData.duration);

    setShowEditDialog(false);
    setEditingEntry(null);
    setEditFormData({
      duration: '',
      notes: '',
      tags: '',
      files: null
    });
  };

  const handleSaveDayEntry = () => {
    if (!dayEntry.project || !dayEntry.task || !dayEntry.labourCategory || !dayEntry.duration) return;

    const selectedProject = projects.find(p => p.name === dayEntry.project);
    const selectedTask = selectedProject?.tasks?.find(t => t.name === dayEntry.task);

    const timesheet = {
      id: 'TS-' + Date.now(),
      employee: currentUser,
      project: dayEntry.project,
      projectId: selectedProject?.id,
      task: dayEntry.task,
      taskId: selectedTask?.id,
      labourCategory: dayEntry.labourCategory,
      hours: parseFloat(dayEntry.duration),
      date: format(selectedDate, 'yyyy-MM-dd'),
      notes: dayEntry.notes,
      status: 'Pending',
      submittedOn: new Date().toISOString().split('T')[0],
      billingAmount: parseFloat(dayEntry.duration) * 150,
      costToCompany: parseFloat(dayEntry.duration) * 120
    };

    addTimesheet(timesheet);
    setDayEntry({
      project: '',
      task: '',
      labourCategory: '',
      duration: '',
      notes: '',
      tags: '',
      files: null
    });
  };

  const availableTasks = dayEntry.project
    ? projects.find(p => p.name === dayEntry.project)?.tasks || []
    : [];

  return (
    <div className="space-y-6" data-testid="track-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Time Tracking</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                onClick={() => setViewMode('week')}
                data-testid="week-view-btn"
                className={viewMode === 'week' ? 'bg-blue-600' : ''}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'day' ? 'default' : 'outline'}
                onClick={() => setViewMode('day')}
                data-testid="day-view-btn"
                className={viewMode === 'day' ? 'bg-blue-600' : ''}
              >
                Day
              </Button>
              <Button onClick={handleAddTimesheetRow} data-testid="add-timesheet-btn" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add timesheet
              </Button>
            </div>
          </div>

          {viewMode === 'week' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, -7))}>
                    ←
                  </Button>
                  <span className="font-medium">
                    This week, {format(weekStart, 'dd MMM')} – {format(addDays(weekStart, 6), 'dd MMM yyyy')}
                  </span>
                  <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
                    →
                  </Button>
                </div>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="w-48" data-testid="user-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.username}>{emp.username}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Week View Table */}
              <div
                className="border rounded-lg overflow-hidden overflow-x-auto"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'white #f3f4f6'
                }}
              >
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Project</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Labour Category</th>
                      {weekDays.map((day, i) => (
                        <th key={i} className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          {format(day, 'EEE dd')}
                        </th>
                      ))}
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {timesheetRows.map((row) => (
                      <tr key={row.id} className="border-t">
                        <td className="py-3 px-4">
                          <Select
                            value={row.project}
                            onValueChange={(value) => handleProjectChange(row.id, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map(p => (
                                <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={row.task}
                            onValueChange={(value) => handleTaskChange(row.id, value)}
                            disabled={!row.project}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Task" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableTasks(row.project).map(t => (
                                <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={row.labourCategory}
                            onValueChange={(value) => handleLabourCategoryChange(row.id, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {LABOUR_CATEGORIES.map(cat => (
                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        {weekDays.map((_, dayIndex) => (
                          <td key={dayIndex} className="py-3 px-4">
                            <div className="relative">
                              <Input
                                placeholder="0.0"
                                className="w-24 pr-7"
                                type="number"
                                step="0.5"
                                value={row.hours[dayIndex] || ''}
                                onChange={(e) => handleHoursChange(row.id, dayIndex, e.target.value)}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-blue-600"
                                onClick={() => handleEditTimeEntry(row.id, dayIndex, weekDays[dayIndex])}
                                title="Edit entry"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        ))}
                        <td className="py-3 px-4 text-sm font-semibold">{getRowTotal(row)}</td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRow(row.id)}
                            className="h-8 w-8 p-0 hover:bg-red-100"
                            title="Delete row"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t bg-gray-50">
                      <td colSpan="3" className="py-3 px-4 font-semibold">Total</td>
                      {weekDays.map((_, dayIndex) => (
                        <td key={dayIndex} className="py-3 px-4 text-sm font-semibold">{getDayTotal(dayIndex)}</td>
                      ))}
                      <td className="py-3 px-4 text-sm font-semibold">{getGrandTotal()}</td>
                      <td className="py-3 px-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'day' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
                    ←
                  </Button>
                  <span className="font-medium">{format(selectedDate, 'EEEE, MMMM dd, yyyy')}</span>
                  <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                    →
                  </Button>
                </div>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="w-48" data-testid="day-user-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.username}>{emp.username}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Log Time for {format(selectedDate, 'EEEE, MMMM dd, yyyy')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project">Project</Label>
                    <Select value={dayEntry.project} onValueChange={(value) => setDayEntry({ ...dayEntry, project: value, task: '' })}>
                      <SelectTrigger data-testid="select-project">
                        <SelectValue placeholder="Select A Project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(p => (
                          <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task">Task</Label>
                    <Select value={dayEntry.task} onValueChange={(value) => setDayEntry({ ...dayEntry, task: value })}>
                      <SelectTrigger data-testid="select-task" disabled={!dayEntry.project}>
                        <SelectValue placeholder="Select A Task" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTasks.map(t => (
                          <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="labourCategory">Labour Category</Label>
                    <Select value={dayEntry.labourCategory} onValueChange={(value) => setDayEntry({ ...dayEntry, labourCategory: value })}>
                      <SelectTrigger data-testid="select-labour-category">
                        <SelectValue placeholder="Select Labour Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {LABOUR_CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      data-testid="input-duration"
                      type="number"
                      step="0.5"
                      value={dayEntry.duration}
                      onChange={(e) => setDayEntry({ ...dayEntry, duration: e.target.value })}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      data-testid="input-tags"
                      value={dayEntry.tags}
                      onChange={(e) => setDayEntry({ ...dayEntry, tags: e.target.value })}
                      placeholder="Add tags..."
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      data-testid="input-notes"
                      value={dayEntry.notes}
                      onChange={(e) => setDayEntry({ ...dayEntry, notes: e.target.value })}
                      placeholder="Add any notes..."
                      rows={3}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="attachments">Attachments</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="w-full justify-start" data-testid="upload-files-btn">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" data-testid="cancel-timesheet-btn">Cancel</Button>
                  <Button onClick={handleSaveDayEntry} className="bg-blue-600 hover:bg-blue-700" data-testid="save-timesheet-btn">Save</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Time Entry - {editingEntry?.date ? format(editingEntry.date, 'EEEE, MMMM dd, yyyy') : ''}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Project</Label>
                <Input value={editingEntry?.project || ''} disabled className="bg-gray-100" />
              </div>
              <div>
                <Label>Task</Label>
                <Input value={editingEntry?.task || ''} disabled className="bg-gray-100" />
              </div>
            </div>
            <div>
              <Label>Labour Category</Label>
              <Input value={editingEntry?.labourCategory || ''} disabled className="bg-gray-100" />
            </div>
            <div>
              <Label htmlFor="edit-duration">Duration (hours)</Label>
              <Input
                id="edit-duration"
                type="number"
                step="0.5"
                value={editFormData.duration}
                onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                value={editFormData.tags}
                onChange={(e) => setEditFormData({ ...editFormData, tags: e.target.value })}
                placeholder="Add tags..."
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={editFormData.notes}
                onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                placeholder="Add any notes..."
                rows={3}
              />
            </div>
            <div>
              <Label>Attachments</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveEditedEntry} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};