import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-background text-text overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
