import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from './AuthContext';
import { type NewsUpdate, type GalleryItem, type Project, type Volunteer, type Donation, type User, type Expense, type AppEvent, type ProjectGoal } from '../types';

const SUPABASE_URL = 'https://mzxyyrtafthhdreqnvak.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YrkPUfGhRfSQTlu2SVCPyg_qEJVRIFo';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface MockDataContextType {
  news: NewsUpdate[];
  gallery: GalleryItem[];
  projects: Project[];
  volunteers: Volunteer[];
  donations: Donation[];
  expenses: Expense[];
  helpers: User[];
  events: AppEvent[];
  currentUser: User | null;
  isLoading: boolean;
  isDbHealthy: boolean;
  refreshData: () => Promise<void>;
  addNews: (item: NewsUpdate) => void;
  updateNews: (id: string, updates: Partial<NewsUpdate>) => void;
  deleteNews: (id: string) => void;
  addProject: (item: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addImage: (item: GalleryItem) => void;
  updateImage: (id: string, updates: Partial<GalleryItem>) => void;
  deleteImage: (id: string) => void;
  addDonation: (item: Donation) => void;
  addExpense: (item: Expense) => void;
  addVolunteer: (item: Volunteer) => void;
  addEvent: (item: AppEvent) => void;
  updateEvent: (id: string, updates: Partial<AppEvent>) => void;
  deleteEvent: (id: string) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  updateCurrentProfile: (updates: Partial<User>) => void;
  resetDatabase: () => void;
  getAggregates: () => Promise<{
    totalRevenue: number;
    totalExpenses: number;
    activeBeneficiaries: string;
    volunteerCount: number;
    projectCount: number;
    revenueHistory: { month: string; amount: number }[];
  }>;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [news, setNews] = useState<NewsUpdate[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [helpers, setHelpers] = useState<User[]>([]);
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDbHealthy, setIsDbHealthy] = useState(true);

  const calculateProjectProgress = (goals: ProjectGoal[]) => {
    if (!goals || goals.length === 0) return 0;
    const completed = goals.filter(g => g.isCompleted).length;
    return Math.round((completed / goals.length) * 100);
  };

  const syncRecord = async (table: string, record: any) => {
    try {
      const { error } = await supabase.from(table).upsert(record);
      if (error) {
        console.error(`Sync error [${table}]:`, error.message);
        if (error.code === '42P01' || error.message.includes('schema cache')) {
          setIsDbHealthy(false);
        }
      }
    } catch (err) {
      console.error(`Fatal sync error [${table}]:`, err);
    }
  };

  const deleteRecord = async (table: string, id: string) => {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) console.error(`Delete error [${table}]:`, error.message);
    } catch (err) {
      console.error(`Fatal delete error [${table}]:`, err);
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        { data: hData },
        { data: nData },
        { data: pData },
        { data: dData },
        { data: eData },
        { data: vData },
        { data: gData },
        { data: evData }
      ] = await Promise.all([
        supabase.from('helpers').select('*'),
        supabase.from('news').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('donations').select('*'),
        supabase.from('expenses').select('*'),
        supabase.from('volunteers').select('*'),
        supabase.from('gallery').select('*'),
        supabase.from('events').select('*')
      ]);

      if (hData) {
        setHelpers(hData.map((h: any) => ({
          id: h.id,
          name: h.name,
          email: h.email,
          role: h.role,
          isValidated: h.is_validated,
          profilePicture: h.profile_picture
        })));
      } else {
        seedHelpers();
      }

      if (nData) setNews(nData);

      if (pData) {
        setProjects(pData.map((p: any) => ({
          ...p,
          goals: Array.isArray(p.goals) ? p.goals : [],
          currentFunding: Number(p.current_funding) || 0,
          targetFunding: Number(p.target_funding) || 0,
          purpose: p.purpose || '',
          duration: p.duration || '',
          field: p.field || 'Health'
        })));
      }

      if (dData) setDonations(dData);
      if (eData) setExpenses(eData);

      if (vData) {
        setVolunteers(vData.map((v: any) => ({
          id: v.id,
          firstName: v.firstName,
          lastName: v.lastName,
          email: v.email,
          country: v.country,
          interests: Array.isArray(v.interests) ? v.interests : []
        })));
      }

      if (gData) setGallery(gData);

      if (evData) {
        setEvents(evData.map((e: any) => ({
          id: e.id,
          title: e.title,
          date: e.date,
          startTime: e.start_time,
          endTime: e.end_time,
          location: e.location,
          description: e.description,
          type: e.type
        })));
      }

    } catch (err) {
      console.error("Critical database error.");
      setIsDbHealthy(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const seedHelpers = async () => {
    const root: User = {
      id: 'admin-root',
      name: 'Kenny Tohne',
      email: 'kennytohne@gmail.com',
      role: 'admin',
      isValidated: true
    };
    setHelpers([root]);
    await syncRecord('helpers', {
      id: root.id,
      name: root.name,
      email: root.email,
      role: root.role,
      is_validated: root.isValidated
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getAggregates = async () => {
    const totalRev = donations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalExp = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const benCount = projects.reduce((acc, p) => acc + (parseInt(p.beneficiaries.replace(/\D/g, '')) || 0), 0);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyData: { [key: string]: number } = {};
    months.forEach(m => monthlyData[m] = 0);

    donations.forEach(d => {
      const dDate = new Date(d.date);
      if (!isNaN(dDate.getTime())) {
        const monthIndex = dDate.getMonth();
        const monthName = months[monthIndex];
        if (monthlyData[monthName] !== undefined) {
          monthlyData[monthName] += Number(d.amount) || 0;
        }
      }
    });

    return {
      totalRevenue: totalRev,
      totalExpenses: totalExp,
      activeBeneficiaries: benCount.toLocaleString() + "+",
      volunteerCount: volunteers.length,
      projectCount: projects.length,
      revenueHistory: months.map(m => ({ month: m, amount: monthlyData[m] }))
    };
  };

  const addNews = (item: NewsUpdate) => {
    setNews(prev => [item, ...prev]);
    syncRecord('news', item);
  };

  const updateNews = (id: string, updates: Partial<NewsUpdate>) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    const newsItem = news.find(n => n.id === id);
    if (newsItem) {
      syncRecord('news', { ...newsItem, ...updates });
    }
  };

  const deleteNews = (id: string) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setNews(prev => prev.filter(n => n.id !== id));
    deleteRecord('news', id);
  };

  const addProject = (item: Project) => {
    const updatedProject = { ...item, progress: calculateProjectProgress(item.goals) };
    setProjects(prev => [updatedProject, ...prev]);
    syncRecord('projects', {
      ...updatedProject,
      current_funding: updatedProject.currentFunding,
      target_funding: updatedProject.targetFunding
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updates };
        if (updates.goals) {
          merged.progress = calculateProjectProgress(merged.goals);
        }
        return merged;
      }
      return p;
    }));

    const project = projects.find(p => p.id === id);
    if (project) {
      const merged = { ...project, ...updates };
      if (updates.goals) merged.progress = calculateProjectProgress(merged.goals);
      syncRecord('projects', {
        ...merged,
        current_funding: merged.currentFunding,
        target_funding: merged.targetFunding
      });
    }
  };

  const deleteProject = (id: string) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    deleteRecord('projects', id);
  };

  const addImage = (item: GalleryItem) => {
    setGallery(prev => [item, ...prev]);
    syncRecord('gallery', item);
  };

  const updateImage = (id: string, updates: Partial<GalleryItem>) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    const imageItem = gallery.find(g => g.id === id);
    if (imageItem) {
      syncRecord('gallery', { ...imageItem, ...updates });
    }
  };

  const deleteImage = (id: string) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setGallery(prev => prev.filter(g => g.id !== id));
    deleteRecord('gallery', id);
  };

  const addDonation = (item: Donation) => {
    setDonations(prev => [item, ...prev]);
    syncRecord('donations', item);
  };

  const addExpense = (item: Expense) => {
    setExpenses(prev => [item, ...prev]);
    syncRecord('expenses', item);
  };

  const addVolunteer = (item: Volunteer) => {
    setVolunteers(prev => [item, ...prev]);
    syncRecord('volunteers', {
      id: item.id,
      first_name: item.firstName,
      last_name: item.lastName,
      email: item.email,
      country: item.country,
      interests: item.interests
    });
  };

  const addEvent = (item: AppEvent) => {
    setEvents(prev => [item, ...prev]);
    syncRecord('events', {
      id: item.id,
      title: item.title,
      date: item.date,
      start_time: item.startTime,
      end_time: item.endTime,
      location: item.location,
      description: item.description,
      type: item.type
    });
  };

  const updateEvent = (id: string, updates: Partial<AppEvent>) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    const eventItem = events.find(e => e.id === id);
    if (eventItem) {
      syncRecord('events', {
        ...eventItem,
        ...updates,
        start_time: updates.startTime ?? eventItem.startTime,
        end_time: updates.endTime ?? eventItem.endTime
      });
    }
  };

  const deleteEvent = (id: string) => {
    if (!['admin', 'helper'].includes(currentUser?.role || '')) return;
    setEvents(prev => prev.filter(e => e.id !== id));
    deleteRecord('events', id);
  };


  const updateUser = (id: string, updates: Partial<User>) => {
    setHelpers(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
    const user = helpers.find(h => h.id === id);
    if (user) {
      const merged = { ...user, ...updates };
      syncRecord('helpers', {
        id: merged.id,
        name: merged.name,
        email: merged.email,
        role: merged.role,
        is_validated: merged.isValidated,
        profile_picture: merged.profilePicture
      });
    }
    if (currentUser?.id === id) {
      // Note: In mock mode, we might want to update local state too if we had it, 
      // but currentUser should come from AuthContext now.
    }
  };

  const updateCurrentProfile = (updates: Partial<User>) => currentUser && updateUser(currentUser.id, updates);

  const resetDatabase = async () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <MockDataContext.Provider value={{
      news, gallery, projects, volunteers, donations, expenses, helpers, events, currentUser, isLoading, isDbHealthy,
      refreshData: fetchData, addNews, updateNews, deleteNews, addProject, updateProject, deleteProject, addImage, updateImage, deleteImage,
      addDonation, addExpense, addVolunteer, addEvent, updateEvent, deleteEvent,
      updateUser, updateCurrentProfile, resetDatabase, getAggregates
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(MockDataContext);
  if (!context) throw new Error('useData must be used within MockDataProvider');
  return context;
};