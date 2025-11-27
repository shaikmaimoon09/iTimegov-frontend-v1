import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Track } from './pages/Track';
import { Approvals } from './pages/Approvals';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Clients } from './pages/Clients';
import { ClientDetail } from './pages/ClientDetail';
import { Contacts } from './pages/Contacts';
import { Employees } from './pages/Employees';
import { Reports } from './pages/Reports';
import { AdminRoles } from './pages/AdminRoles';
import { AdminUsers } from './pages/AdminUsers';
import { AdminLookups } from './pages/AdminLookups';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/track" element={<Track />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports/*" element={<Reports />} />
            <Route path="/admin/roles" element={<AdminRoles />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/lookups" element={<AdminLookups />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;