import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background text-text overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - hidden on mobile, shown on lg+ */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-surface sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Menu className="w-6 h-6 text-white" />
                    </button>
                    <span className="text-lg font-bold text-white">Admin Dashboard</span>
                    <div className="w-10" /> {/* Spacer for centering */}
                </div>

                <div className="p-4 sm:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

