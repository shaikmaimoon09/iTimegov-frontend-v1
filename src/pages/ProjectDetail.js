import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TasksTab } from '../components/project/TasksTab';
import { MembersTab } from '../components/project/MembersTab';
import { BaselineTab } from '../components/project/BaselineTab';
import { MilestonesTab } from '../components/project/MilestonesTab';
import { VarianceTab } from '../components/project/VarianceTab';
import { BudgetTab } from '../components/project/BudgetTab';
import { EVMTab } from '../components/project/EVMTab';
import { CostAnalysisTab } from '../components/project/CostAnalysisTab';
import { LabourCategory } from '../components/project/LabourCategory';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useApp();
  const [activeTab, setActiveTab] = useState('tasks');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="space-y-6" data-testid="project-detail-page">
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('/projects')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold text-gray-900">Project: {project.name}</h2>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span><strong>Project ID:</strong> {project.id}</span>
              <span><strong>Client:</strong> {project.client}</span>
              <span><strong>Status:</strong> <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{project.status}</span></span>
              <span><strong>Duration:</strong> {project.startDate} to {project.endDate}</span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="tasks"
                data-testid="tab-tasks"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="members"
                data-testid="tab-members"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Members
              </TabsTrigger>
              <TabsTrigger
                value="labour-category"
                data-testid="tab-labour-category"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Labour Category
              </TabsTrigger>
              <TabsTrigger
                value="baseline"
                data-testid="tab-baseline"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Baseline
              </TabsTrigger>
              <TabsTrigger
                value="milestones"
                data-testid="tab-milestones"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Milestones
              </TabsTrigger>
              <TabsTrigger
                value="variance"
                data-testid="tab-variance"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Variance
              </TabsTrigger>
              <TabsTrigger
                value="budget"
                data-testid="tab-budget"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Budget
              </TabsTrigger>
              <TabsTrigger
                value="evm"
                data-testid="tab-evm"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                EVM
              </TabsTrigger>
              <TabsTrigger
                value="cost-analysis"
                data-testid="tab-cost-analysis"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent px-6 py-3"
              >
                Cost Analysis
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="tasks" className="m-0">
                <TasksTab project={project} />
              </TabsContent>
              <TabsContent value="members" className="m-0">
                <MembersTab project={project} />
              </TabsContent>
              <TabsContent value="labour-category" className="m-0">
                <LabourCategory />
              </TabsContent>
              <TabsContent value="baseline" className="m-0">
                <BaselineTab project={project} />
              </TabsContent>
              <TabsContent value="milestones" className="m-0">
                <MilestonesTab project={project} />
              </TabsContent>
              <TabsContent value="variance" className="m-0">
                <VarianceTab project={project} />
              </TabsContent>
              <TabsContent value="budget" className="m-0">
                <BudgetTab project={project} />
              </TabsContent>
              <TabsContent value="evm" className="m-0">
                <EVMTab project={project} />
              </TabsContent>
              <TabsContent value="cost-analysis" className="m-0">
                <CostAnalysisTab project={project} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
