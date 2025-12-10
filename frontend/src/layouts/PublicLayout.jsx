import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PublicLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-background text-text overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
