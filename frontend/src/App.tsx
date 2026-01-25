import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { HelmetProvider } from 'react-helmet-async';
import { LoadingScreen } from './components/LoadingScreen';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Programs = React.lazy(() => import('./pages/Programs').then(module => ({ default: module.Programs })));
const ProgramDetails = React.lazy(() => import('./pages/ProgramDetails').then(module => ({ default: module.ProgramDetails })));
const Impact = React.lazy(() => import('./pages/Impact').then(module => ({ default: module.Impact })));
const Events = React.lazy(() => import('./pages/Events').then(module => ({ default: module.Events })));
const Publication = React.lazy(() => import('./pages/Publication').then(module => ({ default: module.Publication })));
const PublicationDetails = React.lazy(() => import('./pages/PublicationDetails').then(module => ({ default: module.PublicationDetails })));
const ProjectReport = React.lazy(() => import('./pages/ProjectReport').then(module => ({ default: module.ProjectReport })));
const GetInvolved = React.lazy(() => import('./pages/GetInvolved').then(module => ({ default: module.GetInvolved })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Donate = React.lazy(() => import('./pages/Donate').then(module => ({ default: module.Donate })));
const ThankYou = React.lazy(() => import('./pages/ThankYou').then(module => ({ default: module.ThankYou })));
const Login = React.lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));

// Dashboard pages
const DashboardOverview = React.lazy(() => import('./pages/dashboard/DashboardOverview').then(module => ({ default: module.DashboardOverview })));
const ExpensesPage = React.lazy(() => import('./pages/dashboard/ExpensesPage').then(module => ({ default: module.ExpensesPage })));
const DonationsPage = React.lazy(() => import('./pages/dashboard/DonationsPage').then(module => ({ default: module.DonationsPage })));
const EventsPage = React.lazy(() => import('./pages/dashboard/EventsPage').then(module => ({ default: module.EventsPage })));
const GalleryPage = React.lazy(() => import('./pages/dashboard/GalleryPage').then(module => ({ default: module.GalleryPage })));
const NewsPage = React.lazy(() => import('./pages/dashboard/NewsPage').then(module => ({ default: module.NewsPage })));
const VolunteersPage = React.lazy(() => import('./pages/dashboard/VolunteersPage').then(module => ({ default: module.VolunteersPage })));
const StaffPage = React.lazy(() => import('./pages/dashboard/StaffPage').then(module => ({ default: module.StaffPage })));
const ProjectsPage = React.lazy(() => import('./pages/dashboard/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ProfilePage = React.lazy(() => import('./pages/dashboard/ProfilePage').then(module => ({ default: module.ProfilePage })));
const ProjectManagement = React.lazy(() => import('./pages/ProjectManagement').then(module => ({ default: module.ProjectManagement })));

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Layout>
              <Suspense fallback={<LoadingScreen />}>
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
              </Suspense>
            </Layout>
          </Router>
        </DataProvider>
      </AuthProvider>
    </HelmetProvider >
  );
};

export default App;
