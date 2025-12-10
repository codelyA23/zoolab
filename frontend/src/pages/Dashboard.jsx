import React, { useState, useEffect } from 'react';
import { Server, Database, Activity, Users, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-surface p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 bg-background rounded-lg border border-gray-800 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <h3 className="text-text-muted text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        animals: 0,
        species: 0,
        habitats: 0,
        users: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [animalsRes, speciesRes, habitatsRes] = await Promise.all([
                    fetch('/api/animals'),
                    fetch('/api/species'),
                    fetch('/api/habitats')
                ]);

                const animalsData = await animalsRes.json();
                const speciesData = await speciesRes.json();
                const habitatsData = await habitatsRes.json();

                setStats({
                    animals: animalsData.data ? animalsData.data.length : 0,
                    species: speciesData.data ? speciesData.data.length : 0,
                    habitats: habitatsData.data ? habitatsData.data.length : 0,
                    users: 3 // Hardcoded as per seed data or could fetch if endpoint exists
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Animals', value: stats.animals, icon: Users, color: 'text-blue-400' },
        { title: 'Tracked Species', value: stats.species, icon: Globe, color: 'text-green-400' },
        { title: 'Active Habitats', value: stats.habitats, icon: Activity, color: 'text-purple-400' },
        { title: 'System Users', value: stats.users, icon: Server, color: 'text-orange-400' },
    ];

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Dashboard
                </h1>
                <p className="text-text-muted mt-2">Real-time system overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="bg-surface rounded-xl border border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">System Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-background rounded-lg border border-gray-800 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Web Tier</p>
                            <p className="text-green-400 font-bold">Operational</p>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-gray-800 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">App Tier</p>
                            <p className="text-green-400 font-bold">Operational</p>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-gray-800 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Database</p>
                            <p className="text-green-400 font-bold">Connected</p>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
