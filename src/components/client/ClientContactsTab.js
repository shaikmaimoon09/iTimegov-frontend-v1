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

export const ClientContactsTab = ({ clientName }) => {
    const { contacts, setContacts } = useApp();
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        status: 'Active'
    });

    const clientContacts = contacts.filter(contact => contact.company === clientName);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(clientContacts.map(c => c.id));
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

                    {/* Add Contact Button */}
                    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700" data-testid="add-contact-btn">
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

                <div className="border rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 py-3 px-4">
                                    <Checkbox
                                        checked={selectedRows.length === clientContacts.length && clientContacts.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Designation</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {clientContacts.length > 0 ? (
                                clientContacts.map((contact) => (
                                    <tr key={contact.id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <Checkbox
                                                checked={selectedRows.includes(contact.id)}
                                                onCheckedChange={(checked) => handleSelectRow(contact.id, checked)}
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium">{contact.name}</td>
                                        <td className="py-3 px-4 text-sm">{contact.email}</td>
                                        <td className="py-3 px-4 text-sm">{contact.phone}</td>
                                        <td className="py-3 px-4 text-sm">{contact.designation}</td>
                                        <td className="py-3 px-4">
                                            <Badge className="bg-green-100 text-green-800">{contact.status}</Badge>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-500">
                                        No contacts found for this client.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};
