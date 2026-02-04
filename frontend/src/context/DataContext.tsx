import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { NewsUpdate, GalleryItem, Project, Volunteer, Donation, User, Expense, AppEvent } from '../types';
import { useAuth } from './AuthContext';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import NewsService from '../services/NewsService';
import GalleryService from '../services/GalleryService';
import EventService from '../services/EventService';
import VolunteerService from '../services/VolunteerService';
import DonationService from '../services/DonationService';
import ExpenseService from '../services/ExpenseService';
import DashboardService from '../services/DashboardService';

interface DataContextType {
    news: NewsUpdate[];
    newsMeta: { total: number; page: number; totalPages: number };
    gallery: GalleryItem[];
    galleryMeta: { total: number; page: number; totalPages: number };
    projects: Project[];
    projectsMeta: { total: number; page: number; totalPages: number };
    volunteers: Volunteer[];
    volunteersMeta: { total: number; page: number; totalPages: number };
    donations: Donation[];
    donationsMeta: { total: number; page: number; totalPages: number };
    expenses: Expense[];
    expensesMeta: { total: number; page: number; totalPages: number };
    helpers: User[];
    helpersMeta: { total: number; page: number; totalPages: number };
    events: AppEvent[];
    eventsMeta: { total: number; page: number; totalPages: number };
    isLoading: boolean;
    refreshData: () => Promise<void>;
    fetchNews: (page?: number, limit?: number) => Promise<void>;
    fetchGallery: (page?: number, limit?: number) => Promise<void>;
    fetchProjects: (page?: number, limit?: number) => Promise<void>;
    fetchVolunteers: (page?: number, limit?: number) => Promise<void>;
    fetchDonations: (page?: number, limit?: number) => Promise<void>;
    fetchExpenses: (page?: number, limit?: number) => Promise<void>;
    fetchHelpers: (page?: number, limit?: number) => Promise<void>;
    fetchEvents: (page?: number, limit?: number) => Promise<void>;
    addNews: (item: NewsUpdate) => Promise<void>;
    updateNews: (id: string, updates: Partial<NewsUpdate>) => Promise<void>;
    deleteNews: (id: string) => Promise<void>;
    addProject: (item: Project) => Promise<void>;
    updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    addImage: (item: GalleryItem) => Promise<void>;
    updateImage: (id: string, updates: Partial<GalleryItem>) => Promise<void>;
    deleteImage: (id: string) => Promise<void>;
    addDonation: (item: Donation) => Promise<void>;
    addExpense: (item: Expense) => Promise<void>;
    addVolunteer: (item: Volunteer) => Promise<void>;
    updateVolunteer: (id: string, updates: Partial<Volunteer>) => Promise<void>;
    deleteVolunteer: (id: string) => Promise<void>;
    approveVolunteer: (id: string) => Promise<void>;
    addEvent: (item: AppEvent) => Promise<void>;
    updateEvent: (id: string, updates: Partial<AppEvent>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    updateUser: (id: string, updates: Partial<User>) => Promise<void>;
    updateCurrentProfile: (updates: Partial<User>) => Promise<void>;
    resetDatabase: () => Promise<void>;
    getAggregates: () => Promise<{
        totalRevenue: number;
        totalExpenses: number;
        activeBeneficiaries: string;
        volunteerCount: number;
        projectCount: number;
        revenueHistory: { month: string; amount: number }[];
    }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser, isAuthenticated } = useAuth();
    const [news, setNews] = useState<NewsUpdate[]>([]);
    const [newsMeta, setNewsMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [galleryMeta, setGalleryMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsMeta, setProjectsMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [volunteersMeta, setVolunteersMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [donations, setDonations] = useState<Donation[]>([]);
    const [donationsMeta, setDonationsMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expensesMeta, setExpensesMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [helpers, setHelpers] = useState<User[]>([]);
    const [helpersMeta, setHelpersMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [eventsMeta, setEventsMeta] = useState({ total: 0, page: 1, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = async (page = 1, limit = 10) => {
        const res = await NewsService.getAll(page, limit);
        setNews(Array.isArray(res.data) ? res.data : []);
        setNewsMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchGallery = async (page = 1, limit = 10) => {
        const res = await GalleryService.getAll(page, limit);
        setGallery(Array.isArray(res.data) ? res.data : []);
        setGalleryMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchProjects = async (page = 1, limit = 10) => {
        const res = await ProjectService.getAll(page, limit);
        setProjects(Array.isArray(res.data) ? res.data : []);
        setProjectsMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchEvents = async (page = 1, limit = 10) => {
        const res = await EventService.getAll(page, limit);
        setEvents(Array.isArray(res.data) ? res.data : []);
        setEventsMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchHelpers = async (page = 1, limit = 10) => {
        const res = await UserService.getAll(page, limit);
        setHelpers(Array.isArray(res.data) ? res.data : []);
        setHelpersMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchVolunteers = async (page = 1, limit = 10) => {
        const res = await VolunteerService.getAll(page, limit);
        setVolunteers(Array.isArray(res.data) ? res.data : []);
        setVolunteersMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchDonations = async (page = 1, limit = 10) => {
        const res = await DonationService.getAll(page, limit);
        setDonations(Array.isArray(res.data) ? res.data : []);
        setDonationsMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    const fetchExpenses = async (page = 1, limit = 10) => {
        const res = await ExpenseService.getAll(page, limit);
        setExpenses(Array.isArray(res.data) ? res.data : []);
        setExpensesMeta({ total: res.total || 0, page: res.page || 1, totalPages: res.totalPages || 0 });
    };

    // Fetch all data
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch public data
            await Promise.all([
                fetchNews().catch(() => { }),
                fetchGallery().catch(() => { }),
                fetchProjects().catch(() => { }),
                fetchEvents().catch(() => { }),
            ]);

            // Fetch authenticated data if user is logged in
            if (isAuthenticated) {
                try {
                    await Promise.all([
                        fetchHelpers().catch(() => { }),
                        fetchVolunteers().catch(() => { }),
                        fetchDonations().catch(() => { }),
                        fetchExpenses().catch(() => { }),
                    ]);
                } catch (error) {
                    console.error('Error fetching authenticated data:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    // Fetch data on mount and when authentication changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // News operations
    const addNews = async (item: NewsUpdate) => {
        const newItem = await NewsService.create(item);
        setNews(prev => [newItem, ...prev]);
    };

    const updateNews = async (id: string, updates: Partial<NewsUpdate>) => {
        const updated = await NewsService.update(id, updates);
        setNews(prev => prev.map(n => n.id === id ? updated : n));
    };

    const deleteNews = async (id: string) => {
        await NewsService.delete(id);
        setNews(prev => prev.filter(n => n.id !== id));
    };

    // Project operations
    const addProject = async (item: Project) => {
        const newItem = await ProjectService.create(item);
        setProjects(prev => [newItem, ...prev]);
    };

    const updateProject = async (id: string, updates: Partial<Project>) => {
        const updated = await ProjectService.update(id, updates);
        setProjects(prev => prev.map(p => p.id === id ? updated : p));
    };

    const deleteProject = async (id: string) => {
        await ProjectService.delete(id);
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    // Gallery operations
    const addImage = async (item: GalleryItem) => {
        const newItem = await GalleryService.create(item);
        setGallery(prev => [newItem, ...prev]);
    };

    const updateImage = async (id: string, updates: Partial<GalleryItem>) => {
        const updated = await GalleryService.update(id, updates);
        setGallery(prev => prev.map(g => g.id === id ? updated : g));
    };

    const deleteImage = async (id: string) => {
        await GalleryService.delete(id);
        setGallery(prev => prev.filter(g => g.id !== id));
    };

    // Event operations
    const addEvent = async (item: AppEvent) => {
        const newItem = await EventService.create(item);
        setEvents(prev => [newItem, ...prev]);
    };

    const updateEvent = async (id: string, updates: Partial<AppEvent>) => {
        const updated = await EventService.update(id, updates);
        setEvents(prev => prev.map(e => e.id === id ? updated : e));
    };

    const deleteEvent = async (id: string) => {
        await EventService.delete(id);
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    // Volunteer operations
    const addVolunteer = async (item: Volunteer) => {
        const newItem = await VolunteerService.create(item);
        setVolunteers(prev => [newItem, ...prev]);
    };

    const updateVolunteer = async (id: string, updates: Partial<Volunteer>) => {
        const updated = await VolunteerService.update(id, updates);
        setVolunteers(prev => prev.map(v => v.id === id ? updated : v));
    };

    const deleteVolunteer = async (id: string) => {
        await VolunteerService.delete(id);
        setVolunteers(prev => prev.filter(v => v.id !== id));
    };

    const approveVolunteer = async (id: string) => {
        const approved = await VolunteerService.approve(id);
        setVolunteers(prev => prev.map(v => v.id === id ? approved : v));
    };

    // Donation operations
    const addDonation = async (item: Donation) => {
        const newItem = await DonationService.create(item);
        setDonations(prev => [newItem, ...prev]);
    };

    // Expense operations
    const addExpense = async (item: Expense) => {
        const newItem = await ExpenseService.create(item);
        setExpenses(prev => [newItem, ...prev]);
    };

    // User operations
    const updateUser = async (id: string, updates: Partial<User>) => {
        const updated = await UserService.update(id, updates);
        setHelpers(prev => prev.map(h => h.id === id ? updated : h));
    };

    const updateCurrentProfile = async (updates: Partial<User>) => {
        if (!currentUser) return;
        const updated = await UserService.updateProfile(updates);
        setHelpers(prev => prev.map(h => h.id === currentUser.id ? updated : h));
    };

    // Dashboard aggregates
    const getAggregates = async () => {
        try {
            return await DashboardService.getAggregates();
        } catch (error) {
            return {
                totalRevenue: 0,
                totalExpenses: 0,
                activeBeneficiaries: '0+',
                volunteerCount: 0,
                projectCount: 0,
                revenueHistory: []
            };
        }
    };

    const resetDatabase = async () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <DataContext.Provider
            value={{
                news,
                newsMeta,
                gallery,
                galleryMeta,
                projects,
                projectsMeta,
                volunteers,
                volunteersMeta,
                donations,
                donationsMeta,
                expenses,
                expensesMeta,
                helpers,
                helpersMeta,
                events,
                eventsMeta,
                isLoading,
                refreshData: fetchData,
                fetchNews,
                fetchGallery,
                fetchProjects,
                fetchVolunteers,
                fetchDonations,
                fetchExpenses,
                fetchHelpers,
                fetchEvents,
                addNews,
                updateNews,
                deleteNews,
                addProject,
                updateProject,
                deleteProject,
                addImage,
                updateImage,
                deleteImage,
                addDonation,
                addExpense,
                addVolunteer,
                updateVolunteer,
                deleteVolunteer,
                approveVolunteer,
                addEvent,
                updateEvent,
                deleteEvent,
                updateUser,
                updateCurrentProfile,
                resetDatabase,
                getAggregates,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};
