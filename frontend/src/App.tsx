
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { ProgramDetails } from './pages/ProgramDetails';
import { Impact } from './pages/Impact';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { ThankYou } from './pages/ThankYou';
import { Publication } from './pages/Publication';
import { PublicationDetails } from './pages/PublicationDetails';
import { ProjectReport } from './pages/ProjectReport';
import { ProjectManagement } from './pages/ProjectManagement';
import { Events } from './pages/Events';
import { Login } from './pages/Login';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { ExpensesPage } from './pages/dashboard/ExpensesPage';
import { DonationsPage } from './pages/dashboard/DonationsPage';
import { EventsPage } from './pages/dashboard/EventsPage';
import { GalleryPage } from './pages/dashboard/GalleryPage';
import { NewsPage } from './pages/dashboard/NewsPage';
import { VolunteersPage } from './pages/dashboard/VolunteersPage';
import { StaffPage } from './pages/dashboard/StaffPage';
import { ProjectsPage } from './pages/dashboard/ProjectsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:programId" element={<ProgramDetails />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/publication" element={<Publication />} />
              <Route path="/publication/:type/:id" element={<PublicationDetails />} />
              <Route path="/project-report/:projectId" element={<ProjectReport />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="volunteers" element={<VolunteersPage />} />
                <Route path="donations" element={<DonationsPage />} />
                <Route path="finance" element={<ExpensesPage />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              <Route
                path="/dashboard/project/:projectId"
                element={
                  <ProtectedRoute>
                    <ProjectManagement />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
