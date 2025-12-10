import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cloud, Lock, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Research', path: '/research' },
        { label: 'Species', path: '/species' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-surface/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <Cloud className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Zoolab
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-text-muted hover:text-white'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Auth Actions */}
                    <div>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/admin"
                                    className="flex items-center space-x-2 text-text-muted hover:text-white transition-colors"
                                    title="Dashboard"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="hidden sm:inline text-sm font-medium">Dashboard</span>
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-red-500/20"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-text-muted px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                                <Lock className="w-4 h-4" />
                                <span>Staff Portal</span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
