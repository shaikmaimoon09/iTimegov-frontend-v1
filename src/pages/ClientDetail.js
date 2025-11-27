import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ClientContactsTab } from '../components/client/ClientContactsTab';
import { ClientProjectsTab } from '../components/client/ClientProjectsTab';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { clients } = useApp();
    const [activeTab, setActiveTab] = useState('contacts');

    const client = clients.find(c => c.id === id);

    if (!client) {
        return <div className="p-6">Client not found</div>;
    }

    return (
        <div className="space-y-6" data-testid="client-detail-page">
            <Card className="shadow-md">
                <CardContent className="p-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => navigate('/clients')}
                                className="hover:bg-gray-100"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <h2 className="text-2xl font-bold text-gray-900">Client: {client.name}</h2>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span><strong>Industry:</strong> {client.industry}</span>
                            <span><strong>Status:</strong> <Badge className="bg-green-100 text-green-800 ml-2">{client.status}</Badge></span>
                            <span><strong>Email:</strong> {client.email}</span>
                            <span><strong>Phone:</strong> {client.phone}</span>
                        </div>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                            <TabsTrigger
                                value="contacts"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                            >
                                Contacts
                            </TabsTrigger>
                            <TabsTrigger
                                value="projects"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                            >
                                Projects
                            </TabsTrigger>
                        </TabsList>

                        <div className="mt-6">
                            <TabsContent value="contacts" className="m-0">
                                <ClientContactsTab clientName={client.name} />
                            </TabsContent>
                            <TabsContent value="projects" className="m-0">
                                <ClientProjectsTab clientName={client.name} />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};
