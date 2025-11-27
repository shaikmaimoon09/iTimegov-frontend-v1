import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, ArrowLeft, Trash2, Eye, Edit } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

export const Contacts = () => {
  const { contacts, setContacts, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyFilter = searchParams.get('company');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: companyFilter || '',
    designation: '',
    status: 'Active'
  });

  // Filter contacts by company if query parameter exists
  const filteredContacts = companyFilter
    ? contacts.filter(contact => contact.company === companyFilter)
    : contacts;

  const handleAddContact = () => {
    if (!newContact.name || !newContact.company) return;

    const contactEntry = {
      id: `con${Date.now()}`,
      ...newContact
    };

    setContacts([...contacts, contactEntry]);
    setShowAddDialog(false);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      company: companyFilter || '',
      designation: '',
      status: 'Active'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(filteredContacts.map(c => c.id));
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

  return (
    <div className="space-y-6" data-testid="contacts-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {companyFilter && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate('/clients')}
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {companyFilter ? `Contacts - ${companyFilter}` : 'Contacts Management'}
                  </h2>
                  {companyFilter && (
                    <p className="text-sm text-gray-500 mt-1">
                      Showing contacts for {companyFilter}
                    </p>
                  )}
                </div>

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
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button data-testid="add-contact-btn" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
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
                    <Label>Company *</Label>
                    <Input
                      value={newContact.company}
                      onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                      placeholder="Company name"
                      disabled={!!companyFilter}
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
                      checked={selectedRows.length === filteredContacts.length && filteredContacts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Designation</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
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
                      <td className="py-3 px-4 text-sm">{contact.company}</td>
                      <td className="py-3 px-4 text-sm">{contact.designation}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">{contact.status}</Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      {companyFilter
                        ? `No contacts found for ${companyFilter}`
                        : 'No contacts available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};