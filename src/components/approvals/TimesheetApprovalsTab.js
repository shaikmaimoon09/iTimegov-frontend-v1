import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

export const TimesheetApprovalsTab = ({ timesheets, onApprove, onReject }) => {
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
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Employee</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Task</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Hours</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Billing Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Cost to Company</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Approver</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Submitted On</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {timesheets.length > 0 ? (
                        timesheets.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50" data-testid={`timesheet-approval-${item.id}`}>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.employee}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.project}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.task}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.hours}h</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">${item.billingAmount}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">${item.costToCompany}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <Badge className={item.status === 'Pending' ? 'bg-yellow-500 whitespace-nowrap' : 'bg-green-500 whitespace-nowrap'}>
                                        {item.status}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.approver}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.submittedOn}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onApprove(item.id)} data-testid={`approve-timesheet-${item.id}`}>
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => onReject(item.id)} data-testid={`reject-timesheet-${item.id}`}>
                                            <XCircle className="h-3 w-3 mr-1" />
                                            Reject
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center py-8 text-gray-500">
                                No pending timesheet approvals
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
