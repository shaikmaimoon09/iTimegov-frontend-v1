import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const TimesheetApprovalsTab = ({ timesheets, onApprove, onReject }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(timesheets.length / itemsPerPage);
    const paginatedTimesheets = timesheets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
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
                        {paginatedTimesheets.length > 0 ? (
                            paginatedTimesheets.map((item) => (
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600 whitespace-nowrap">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, timesheets.length)} of {timesheets.length}
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
