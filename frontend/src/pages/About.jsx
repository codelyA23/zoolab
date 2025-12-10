import React from 'react';
import { Heart, Shield, Zap, Target } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 bg-surface/30 border-b border-gray-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">Advancing Conservation Through Technology</h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        Founded in 2025, Zoolab operates at the intersection of technology and biology.
                        We empower researchers, zookeepers, and conservationists with the
                        data tools they need to ensure the highest standard of care for every animal.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
                        <p className="text-text-muted text-lg leading-relaxed mb-6">
                            We envision a world where every animal's health and habitat needs are understood and met
                            through precise, data-driven insights. By bridging the gap between field observation and
                            digital analysis, we unlock new possibilities for species preservation.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="h-1 w-12 bg-primary rounded-full"></div>
                            <span className="text-white font-medium">Global Impact</span>
                        </div>
                    </div>
                    <div className="bg-surface p-8 rounded-2xl border border-gray-800 h-80 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Target className="w-32 h-32 text-gray-700 group-hover:text-primary transition-colors duration-500" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ValueCard
                        icon={Heart}
                        title="Animal Welfare First"
                        desc="Every line of code we write is dedicated to improving the lives of the animals under our care."
                        color="text-red-500"
                        bg="bg-red-500/10"
                    />
                    <ValueCard
                        icon={Shield}
                        title="Data Integrity"
                        desc="We provide rigorous, tamper-proof data logs that researchers can trust for peer-reviewed studies."
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                    />
                    <ValueCard
                        icon={Zap}
                        title="Real-time Action"
                        desc="Our systems are designed for speed, alerting teams instantly when critical habitat parameters shift."
                        color="text-yellow-500"
                        bg="bg-yellow-500/10"
                    />
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon: Icon, title, desc, color, bg }) => (
    <div className="bg-surface p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
        <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-6`}>
            <Icon className={`w-7 h-7 ${color}`} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-text-muted leading-relaxed">
            {desc}
        </p>
    </div>
);

export default About;
