import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';

import { Label } from '../ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const ClientContactsTab = ({ clientName }) => {
    const { contacts, setContacts } = useApp();

    // selection + dialogs
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // form state for adding a new contact
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        status: 'Active'
    });

    const [filters, setFilters] = useState({
        name: '',
        email: '',
        designation: '',
        company: '',
        status: ''
    });

    // Filter contacts for this client
    const clientContacts = contacts.filter(c => c.company === clientName);

    const filteredContacts = clientContacts.filter(contact => {
        if (filters.name && !contact.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
        if (filters.email && !contact.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
        if (filters.designation && !contact.designation.toLowerCase().includes(filters.designation.toLowerCase())) return false;
        if (filters.company && !contact.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
        if (filters.status && filters.status !== 'all' && contact.status !== filters.status) return false;
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filteredContacts.length / itemsPerPage));
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const clearFilters = () => {
        setFilters({
            name: '',
            email: '',
            designation: '',
            company: '',
            status: ''
        });
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(paginatedContacts.map(c => c.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (contactId, checked) => {
        if (checked) {
            setSelectedRows([...selectedRows, contactId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== contactId));
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 0) return;
        if (window.confirm(`Are you sure you want to delete ${selectedRows.length} contact(s)?`)) {
            setContacts(contacts.filter(c => !selectedRows.includes(c.id)));
            setSelectedRows([]);
        }
    };

    const handleView = () => {
        if (selectedRows.length === 1) {
            const contact = contacts.find(c => c.id === selectedRows[0]);
            alert(`Viewing contact: ${contact.name}`);
        }
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const contact = contacts.find(c => c.id === selectedRows[0]);
            alert(`Editing contact: ${contact.name}`);
        }
    };

    const handleAddContact = () => {
        if (!newContact.name) return;

        const contactEntry = {
            id: `con${Date.now()}`,
            ...newContact,
            company: clientName
        };

        setContacts([...contacts, contactEntry]);
        setShowAddDialog(false);
        setNewContact({
            name: '',
            email: '',
            phone: '',
            designation: '',
            status: 'Active'
        });
    };
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold">Related Contacts</h3>

                        {/* Toolbar - appears when rows are selected */}
                        {selectedRows.length > 0 && (
                            <div className="flex items-center gap-2 ml-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                                <span className="text-sm font-medium text-blue-900">
                                    {selectedRows.length} selected
                                </span>
                                <div className="flex items-center gap-1 ml-2 border-l border-blue-300 pl-2">
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
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear Filters
                        </Button>
                        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Contact
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Contact for {clientName}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div>
                                        <Label>Name *</Label>
                                        <Input
                                            value={newContact.name}
                                            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                            placeholder="Contact name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={newContact.email}
                                            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <Label>Phone</Label>
                                        <Input
                                            value={newContact.phone}
                                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                            placeholder="+1234567890"
                                        />
                                    </div>
                                    <div>
                                        <Label>Designation</Label>
                                        <Input
                                            value={newContact.designation}
                                            onChange={(e) => setNewContact({ ...newContact, designation: e.target.value })}
                                            placeholder="e.g. CTO, Manager"
                                        />
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                        <p className="text-sm text-blue-800">
                                            <strong>Company:</strong> {clientName}
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            This contact will be automatically associated with {clientName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                                    <Button onClick={handleAddContact} className="bg-blue-600 hover:bg-blue-700">Save</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 py-3 px-4">
                                    <Checkbox
                                        checked={selectedRows.length === paginatedContacts.length && paginatedContacts.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Contact Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Designation</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Company</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                            </tr>
                            {/* Filter Row */}
                            <tr className="bg-gray-50">
                                <th className="py-2 px-4"></th>
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
                                        placeholder="Filter Email..."
                                        value={filters.email}
                                        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                                        className="h-8 text-xs"
                                    />
                                </th>
                                <th className="py-2 px-4">
                                    <Input
                                        placeholder="Filter Designation..."
                                        value={filters.designation}
                                        onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
                                        className="h-8 text-xs"
                                    />
                                </th>
                                <th className="py-2 px-4">
                                    <Input
                                        placeholder="Filter Company..."
                                        value={filters.company}
                                        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
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
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </th>
                                <th className="py-2 px-4"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {paginatedContacts.length > 0 ? (
                                paginatedContacts.map((contact) => (
                                    <tr key={contact.id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <Checkbox
                                                checked={selectedRows.includes(contact.id)}
                                                onCheckedChange={(checked) => handleSelectRow(contact.id, checked)}
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium">{contact.name}</td>
                                        <td className="py-3 px-4 text-sm">{contact.email}</td>
                                        <td className="py-3 px-4 text-sm">{contact.designation}</td>
                                        <td className="py-3 px-4 text-sm">{contact.company}</td>
                                        <td className="py-3 px-4">
                                            <Badge className="bg-green-100 text-green-800">{contact.status}</Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            {/* Actions placeholder if needed */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-8 text-center text-gray-500">
                                        No contacts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredContacts.length)} of {filteredContacts.length}
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
            </CardContent>
        </Card>
    );
};

