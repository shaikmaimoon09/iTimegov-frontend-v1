import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Eye, Edit, Trash2 } from 'lucide-react';

export const ClientProjectsTab = ({ clientName }) => {
    const { projects, setProjects } = useApp();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    const clientProjects = projects.filter(project => project.client === clientName);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(clientProjects.map(p => p.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (projectId, checked) => {
        if (checked) {
            setSelectedRows([...selectedRows, projectId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== projectId));
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedRows.length} project(s)?`)) {
            setProjects(projects.filter(p => !selectedRows.includes(p.id)));
            setSelectedRows([]);
        }
    };

    const handleView = () => {
        if (selectedRows.length === 1) {
            navigate(`/projects/${selectedRows[0]}`);
        }
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const project = projects.find(p => p.id === selectedRows[0]);
            alert(`Editing project: ${project.name}`);
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold">Related Projects</h3>

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

                <div
                    className="border rounded-lg overflow-hidden shadow-sm overflow-x-auto"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'white #f3f4f6'
                    }}
                >
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 py-3 px-4">
                                    <Checkbox
                                        checked={selectedRows.length === clientProjects.length && clientProjects.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Project Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Client</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Contact</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Start Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">End Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {clientProjects.length > 0 ? (
                                clientProjects.map((project) => (
                                    <tr key={project.id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <Checkbox
                                                checked={selectedRows.includes(project.id)}
                                                onCheckedChange={(checked) => handleSelectRow(project.id, checked)}
                                            />
                                        </td>
                                        <td
                                            className="py-3 px-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                                            onClick={() => navigate(`/projects/${project.id}`)}
                                        >
                                            {project.id}
                                        </td>
                                        <td
                                            className="py-3 px-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap"
                                            onClick={() => navigate(`/projects/${project.id}`)}
                                        >
                                            {project.name}
                                        </td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.client}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.contact}</td>
                                        <td className="py-3 px-4">
                                            <Badge className={`${project.status === 'Completed' ? 'bg-green-500' : project.status === 'On Hold' ? 'bg-yellow-500' : 'bg-blue-500'} text-white whitespace-nowrap`}>
                                                {project.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.startDate}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.endDate}</td>
                                        <td className="py-3 px-4 text-sm whitespace-nowrap">{project.createdBy}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-8 text-center text-gray-500">
                                        No projects found for this client.
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
