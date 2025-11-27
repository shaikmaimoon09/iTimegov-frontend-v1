import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const BaselineRequestApprovalsTab = ({ baselineRequests, onApprove }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(baselineRequests.length / itemsPerPage);
    const paginatedBaselineRequests = baselineRequests.slice(
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
                        {paginatedBaselineRequests.length > 0 ? (
                            paginatedBaselineRequests.map((item) => (
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600 whitespace-nowrap">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, baselineRequests.length)} of {baselineRequests.length}
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
