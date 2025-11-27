import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TimesheetApprovalsTab } from '../components/approvals/TimesheetApprovalsTab';
import { TaskRequestApprovalsTab } from '../components/approvals/TaskRequestApprovalsTab';
import { BaselineRequestApprovalsTab } from '../components/approvals/BaselineRequestApprovalsTab';

export const Approvals = () => {
  const { approvals, approveTaskRequest, approveBaselineRequest } = useApp();
  const [activeTab, setActiveTab] = useState('timesheets');

  const handleApproveTimesheet = (id) => {
    // Implementation for timesheet approval
    console.log('Approve timesheet:', id);
  };

  const handleRejectTimesheet = (id) => {
    console.log('Reject timesheet:', id);
  };

  const handleApproveTaskRequest = (id) => {
    approveTaskRequest(id);
  };

  const handleRejectTaskRequest = (id) => {
    console.log('Reject task request:', id);
  };

  const handleApproveBaselineRequest = (id, level) => {
    approveBaselineRequest(id, level);
  };

  return (
    <div className="space-y-6" data-testid="approvals-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Approvals Management</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
              <TabsTrigger
                value="timesheets"
                data-testid="tab-timesheet-approvals"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Timesheet Approvals
              </TabsTrigger>
              <TabsTrigger
                value="task-requests"
                data-testid="tab-task-requests"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Task Request Approvals
              </TabsTrigger>
              <TabsTrigger
                value="baseline-requests"
                data-testid="tab-baseline-requests"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Baseline Request Approvals
              </TabsTrigger>
            </TabsList>

            {/* Timesheet Approvals */}
            <TabsContent value="timesheets" className="m-0">
              <TimesheetApprovalsTab
                timesheets={approvals.timesheets}
                onApprove={handleApproveTimesheet}
                onReject={handleRejectTimesheet}
              />
            </TabsContent>

            {/* Task Request Approvals */}
            <TabsContent value="task-requests" className="m-0">
              <TaskRequestApprovalsTab
                taskRequests={approvals.taskRequests}
                onApprove={handleApproveTaskRequest}
                onReject={handleRejectTaskRequest}
              />
            </TabsContent>

            {/* Baseline Request Approvals */}
            <TabsContent value="baseline-requests" className="m-0">
              <BaselineRequestApprovalsTab
                baselineRequests={approvals.baselineRequests}
                onApprove={handleApproveBaselineRequest}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};