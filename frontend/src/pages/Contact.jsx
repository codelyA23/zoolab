import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
                    <p className="text-text-muted mb-10 text-lg">
                        Have questions about our research programs or software solutions?
                        We'd love to hear from you.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-surface p-3 rounded-lg border border-gray-800">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Email</p>
                                <p className="text-white font-medium">contact@zoolab.io</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-surface p-3 rounded-lg border border-gray-800">
                                <Phone className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Phone</p>
                                <p className="text-white font-medium">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-surface p-3 rounded-lg border border-gray-800">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted">Headquarters</p>
                                <p className="text-white font-medium">123 Cloud Way, Tech City</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface p-8 rounded-2xl border border-gray-800">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-2">Name</label>
                            <input type="text" className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
                            <input type="email" className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-2">Message</label>
                            <textarea rows="4" className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
