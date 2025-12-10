import React, { useState, useEffect } from 'react';

const Species = () => {
    const [speciesList, setSpeciesList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/species')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') setSpeciesList(data.data);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white mb-2">Species Catalog</h1>
            <p className="text-text-muted mb-10 text-lg">Taxonomy and conservation status of monitored species.</p>

            <div className="space-y-4">
                {speciesList.map((species) => (
                    <div key={species.id} className="bg-surface p-6 rounded-xl border border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">{species.common_name}</h3>
                            <p className="text-text-muted italic">{species.scientific_name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${species.conservation_status.includes('Endangered') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                            }`}>
                            {species.conservation_status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Species;
