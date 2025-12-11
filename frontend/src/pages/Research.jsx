import React, { useState, useEffect } from 'react';

const Research = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch('/api/animals')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') setAnimals(data.data);
            })
            .catch(err => console.error(err));
    }, []);


    const calculateAge = (dob) => {
        if (!dob) return 'Unknown';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white mb-2">Current Research</h1>
            <p className="text-text-muted mb-10 text-lg">Detailed observations of our active subjects.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals.map((animal) => (
                    <div key={animal.id} className="bg-surface border border-gray-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all group">
                        <div className="h-48 bg-gray-900 flex items-center justify-center">
                            {/* Placeholder image logic based on species */}
                            <span className="text-4xl">
                                {animal.species_name?.includes('Elephant') ? '🐘' :
                                    animal.species_name?.includes('Tiger') ? '🐅' :
                                        animal.species_name?.includes('Penguin') ? '🐧' : '🐾'}
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">{animal.name}</h3>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{animal.species_name}</span>
                            </div>
                            <p className="text-text-muted text-sm mb-4">
                                Observed in <span className="text-white">{animal.habitat_name}</span>
                            </p>
                            <div className="flex items-center text-sm text-text-muted">
                                <span className={`w-2 h-2 rounded-full mr-2 ${animal.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}></span>
                                {animal.gender} • {calculateAge(animal.date_of_birth)} years old
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Research;
