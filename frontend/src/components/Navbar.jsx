import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cloud, Lock, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Research', path: '/research' },
        { label: 'Species', path: '/species' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

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

                    {/* Desktop Auth Actions */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/admin"
                                    className="flex items-center space-x-2 text-text-muted hover:text-white transition-colors"
                                    title="Dashboard"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="text-sm font-medium">Dashboard</span>
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-surface border-t border-gray-800">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {/* Mobile Auth */}
                        <div className="pt-4 border-t border-gray-800 mt-4">
                            {user ? (
                                <>
                                    <NavLink
                                        to="/admin"
                                        onClick={closeMobileMenu}
                                        className="flex items-center space-x-2 px-4 py-3 rounded-lg text-text-muted hover:bg-gray-800 hover:text-white"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-800 text-text-muted"
                                >
                                    <Lock className="w-5 h-5" />
                                    <span>Staff Portal</span>
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

