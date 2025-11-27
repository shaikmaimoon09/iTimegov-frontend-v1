import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, FileText } from 'lucide-react';

export const BaselineTab = ({ project }) => {
  const { addBaseline, addBaselineRequest, currentUser } = useApp();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [newBaseline, setNewBaseline] = useState({
    id: '',
    name: '',
    notes: '',
    tasks: []
  });
  const [baselineRequest, setBaselineRequest] = useState({
    requestTitle: '',
    baselineName: '',
    requestedChanges: '',
    reason: '',
    evidence: null
  });

  const handleCreateBaseline = () => {
    if (!newBaseline.name) return;
    
    const baselineTasks = (project.tasks || []).map(task => ({
      taskId: task.id,
      taskName: task.name,
      plannedHours: task.estimatedHours,
      plannedCost: task.estimatedCost,
      plannedStartDate: task.startDate,
      plannedEndDate: task.endDate,
      assignedMember: task.assignedTo
    }));

    const totalHours = baselineTasks.reduce((sum, t) => sum + parseFloat(t.plannedHours || 0), 0);
    const totalCost = baselineTasks.reduce((sum, t) => sum + parseFloat(t.plannedCost || 0), 0);

    const baseline = {
      id: 'BL-' + Date.now(),
      ...newBaseline,
      tasks: baselineTasks,
      createdOn: new Date().toISOString().split('T')[0],
      createdBy: currentUser,
      totalEstimatedHours: totalHours,
      totalEstimatedCost: totalCost,
      totalTasks: baselineTasks.length
    };

    addBaseline(project.id, baseline);
    setShowCreateDialog(false);
    setNewBaseline({ id: '', name: '', notes: '', tasks: [] });
  };

  const handleRaiseBaselineRequest = () => {
    if (!baselineRequest.requestTitle || !baselineRequest.reason) return;

    const request = {
      id: 'BR-' + Date.now(),
      ...baselineRequest,
      requestedBy: currentUser,
      submittedOn: new Date().toISOString().split('T')[0],
      managerStatus: 'Pending',
      adminStatus: 'Pending',
      finalStatus: 'Pending',
      projectId: project.id
    };

    addBaselineRequest(request);
    setShowRequestDialog(false);
    setBaselineRequest({
      requestTitle: '',
      baselineName: '',
      requestedChanges: '',
      reason: '',
      evidence: null
    });
  };

  const latestBaseline = project.baselines && project.baselines.length > 0 ? project.baselines[project.baselines.length - 1] : null;

  return (
    <div className="space-y-6" data-testid="baseline-tab">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Baseline Management</h3>
        <div className="flex gap-2">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button data-testid="create-baseline-btn" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Baseline
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Baseline</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="baseline-name">Baseline Name *</Label>
                  <Input
                    id="baseline-name"
                    data-testid="input-baseline-name"
                    value={newBaseline.name}
                    onChange={(e) => setNewBaseline({ ...newBaseline, name: e.target.value })}
                    placeholder="Q1 2025 Baseline"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    data-testid="input-baseline-notes"
                    value={newBaseline.notes}
                    onChange={(e) => setNewBaseline({ ...newBaseline, notes: e.target.value })}
                    placeholder="Baseline notes"
                    rows={3}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">The following tasks will be captured in the baseline:</p>
                  <div className="border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
                    {(project.tasks || []).map(task => (
                      <div key={task.id} className="flex justify-between py-2 border-b last:border-0">
                        <span className="text-sm font-medium">{task.id} - {task.name}</span>
                        <span className="text-sm text-gray-600">{task.estimatedHours}h / ${task.estimatedCost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)} data-testid="cancel-baseline-btn">Cancel</Button>
                <Button onClick={handleCreateBaseline} className="bg-blue-600 hover:bg-blue-700" data-testid="save-baseline-btn">Create Baseline</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogTrigger asChild>
              <Button data-testid="baseline-request-btn" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                <FileText className="h-4 w-4 mr-2" />
                Raise Baseline Change Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Raise Baseline Change Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="request-title">Request Title *</Label>
                  <Input
                    id="request-title"
                    data-testid="input-br-title"
                    value={baselineRequest.requestTitle}
                    onChange={(e) => setBaselineRequest({ ...baselineRequest, requestTitle: e.target.value })}
                    placeholder="Baseline change request"
                  />
                </div>
                <div>
                  <Label htmlFor="baseline-name">Baseline Name *</Label>
                  <Input
                    id="baseline-name"
                    data-testid="input-br-baseline-name"
                    value={baselineRequest.baselineName}
                    onChange={(e) => setBaselineRequest({ ...baselineRequest, baselineName: e.target.value })}
                    placeholder="Select baseline"
                  />
                </div>
                <div>
                  <Label htmlFor="requested-changes">Requested Changes *</Label>
                  <Textarea
                    id="requested-changes"
                    data-testid="input-br-changes"
                    value={baselineRequest.requestedChanges}
                    onChange={(e) => setBaselineRequest({ ...baselineRequest, requestedChanges: e.target.value })}
                    placeholder="Describe the changes needed"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Reason *</Label>
                  <Textarea
                    id="reason"
                    data-testid="input-br-reason"
                    value={baselineRequest.reason}
                    onChange={(e) => setBaselineRequest({ ...baselineRequest, reason: e.target.value })}
                    placeholder="Reason for baseline change"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="evidence">Evidence Upload</Label>
                  <Input
                    id="evidence"
                    data-testid="input-br-evidence"
                    type="file"
                    onChange={(e) => setBaselineRequest({ ...baselineRequest, evidence: e.target.files[0]?.name || null })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowRequestDialog(false)} data-testid="cancel-br-btn">Cancel</Button>
                <Button onClick={handleRaiseBaselineRequest} className="bg-blue-600 hover:bg-blue-700" data-testid="submit-br-btn">Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current Baseline Summary */}
      {latestBaseline && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Current Baseline: {latestBaseline.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600">Created On</p>
                <p className="text-lg font-semibold">{latestBaseline.createdOn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created By</p>
                <p className="text-lg font-semibold">{latestBaseline.createdBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Estimated Hours</p>
                <p className="text-lg font-semibold text-blue-600">{latestBaseline.totalEstimatedHours}h</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Estimated Cost</p>
                <p className="text-lg font-semibold text-green-600">${latestBaseline.totalEstimatedCost?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-lg font-semibold">{latestBaseline.totalTasks}</p>
              </div>
            </div>

            {/* Baseline Tasks Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Planned Hours</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Planned Cost</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Planned Start Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Planned End Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assigned Member</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {latestBaseline.tasks.map((task, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">{task.taskId}</td>
                      <td className="py-3 px-4 text-sm">{task.taskName}</td>
                      <td className="py-3 px-4 text-sm">{task.plannedHours}h</td>
                      <td className="py-3 px-4 text-sm">${task.plannedCost}</td>
                      <td className="py-3 px-4 text-sm">{task.plannedStartDate}</td>
                      <td className="py-3 px-4 text-sm">{task.plannedEndDate}</td>
                      <td className="py-3 px-4 text-sm">{task.assignedMember}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!latestBaseline && (
        <Card className="shadow-md">
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No baseline created yet. Click "Create Baseline" to freeze the current plan.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};