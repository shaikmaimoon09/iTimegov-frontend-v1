import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

export const TaskRequestApprovalsTab = ({ taskRequests, onApprove, onReject }) => {
    return (
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
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Request ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Requested By</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Reason</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Proposed End Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Submitted On</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {taskRequests.length > 0 ? (
                        taskRequests.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50" data-testid={`task-request-${item.id}`}>
                                <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{item.id}</td>
                                <td className="py-3 px-4 text-sm text-blue-600 whitespace-nowrap">{item.taskId}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.taskName}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.requestedBy}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.reason}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.proposedEndDate}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.submittedOn}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <Badge className={item.status === 'Pending' ? 'bg-yellow-500 whitespace-nowrap' : item.status === 'Approved' ? 'bg-green-500 whitespace-nowrap' : 'bg-red-500 whitespace-nowrap'}>
                                        {item.status}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    {item.status === 'Pending' && (
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onApprove(item.id)} data-testid={`approve-task-${item.id}`}>
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Approve
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => onReject(item.id)} data-testid={`reject-task-${item.id}`}>
                                                <XCircle className="h-3 w-3 mr-1" />
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-8 text-gray-500">
                                No pending task request approvals
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
