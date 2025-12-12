import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Settings, Cloud, Cat, LogOut, Home, X } from 'lucide-react';

const Sidebar = ({ onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        if (onClose) onClose();
    };

    const handleNavigate = (path) => {
        navigate(path);
        if (onClose) onClose();
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Cat, label: 'Animals', path: '/admin/animals' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-surface border-r border-gray-800 flex flex-col h-full">
            <div className="p-6 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Cloud className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Zoolab
                    </span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-text-muted hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800 space-y-4">
                {/* Navigation Actions */}
                <div className="space-y-2">
                    <button
                        onClick={() => handleNavigate('/')}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>

                {/* System Status */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700">
                    <p className="text-xs text-text-muted mb-2">System Status</p>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-green-400">Operational</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
