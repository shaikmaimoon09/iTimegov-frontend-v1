import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const BaselineRequestApprovalsTab = ({ baselineRequests, onApprove }) => {
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
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Baseline Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Requested By</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Change Summary</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Manager Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Admin Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Final Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {baselineRequests.length > 0 ? (
                        baselineRequests.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50" data-testid={`baseline-request-${item.id}`}>
                                <td className="py-3 px-4 text-sm text-blue-600 font-medium whitespace-nowrap">{item.id}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.baselineName}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.requestedBy}</td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">{item.requestedChanges}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <Badge className={item.managerStatus === 'Pending' ? 'bg-yellow-500 whitespace-nowrap' : 'bg-green-500 whitespace-nowrap'}>
                                        {item.managerStatus}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <Badge className={item.adminStatus === 'Pending' ? 'bg-yellow-500 whitespace-nowrap' : 'bg-green-500 whitespace-nowrap'}>
                                        {item.adminStatus}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <Badge className={item.finalStatus === 'Pending' ? 'bg-yellow-500 whitespace-nowrap' : 'bg-green-500 whitespace-nowrap'}>
                                        {item.finalStatus}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {item.managerStatus === 'Pending' && (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onApprove(item.id, 'manager')} data-testid={`approve-manager-${item.id}`}>
                                                Approve (Manager)
                                            </Button>
                                        )}
                                        {item.managerStatus === 'Approved' && item.adminStatus === 'Pending' && (
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => onApprove(item.id, 'admin')} data-testid={`approve-admin-${item.id}`}>
                                                Approve (Admin)
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-8 text-gray-500">
                                No pending baseline request approvals
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
