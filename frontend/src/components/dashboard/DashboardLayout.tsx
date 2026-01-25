import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export const DashboardLayout: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
            <DashboardSidebar isCollapsed={isCollapsed} />

            <div className="flex-grow flex flex-col h-screen overflow-y-auto">
                <DashboardHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                <main className="p-8 md:p-12 space-y-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
