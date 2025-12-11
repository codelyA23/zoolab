import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, Globe } from 'lucide-react';

const Home = () => {
    const [stats, setStats] = useState({ species: 0, animals: 0 });

    useEffect(() => {
        // Ideally fetch public stats from API here
        // For now using static or simple fetch
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // We can reuse the existing endpoints to get counts
            const animalsRes = await fetch('/api/animals');
            const speciesRes = await fetch('/api/species');
            const animalsData = await animalsRes.json();
            const speciesData = await speciesRes.json();

            if (animalsData.status === 'success') {
                setStats(prev => ({ ...prev, animals: animalsData.data.length }));
            }
            if (speciesData.status === 'success') {
                setStats(prev => ({ ...prev, species: speciesData.data.length }));
            }
        } catch (err) {
            console.error("Failed to fetch public stats");
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6 tracking-tight">
                        Advancing Animal<br />Science & Welfare
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
                        Zoolab is at the forefront of conservation research. We leverage cloud technology to monitor, study, and protect biodiversity across the globe.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/research" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/25 flex items-center">
                            Explore Research <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/contact" className="bg-surface border border-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-surface/50 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2">{stats.species}+</h3>
                            <p className="text-text-muted uppercase tracking-wider text-sm font-medium">Species Monitored</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2">{stats.animals}+</h3>
                            <p className="text-text-muted uppercase tracking-wider text-sm font-medium">Animals Tracked</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Activity className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2">24/7</h3>
                            <p className="text-text-muted uppercase tracking-wider text-sm font-medium">Real-time Monitoring</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
