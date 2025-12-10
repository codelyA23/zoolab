import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, X } from 'lucide-react';

const Animals = () => {
    const [animals, setAnimals] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [habitatList, setHabitatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        species_id: '',
        habitat_id: '',
        gender: 'Male',
        date_of_birth: '',
        microchip_id: ''
    });

    useEffect(() => {
        fetchAnimals();
        fetchResources();
    }, []);

    const fetchAnimals = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/animals');
            const data = await response.json();
            if (data.status === 'success') setAnimals(data.data);
            else setError(data.message);
        } catch (err) {
            setError('Connection failed');
        } finally {
            setLoading(false);
        }
    };

    const fetchResources = async () => {
        try {
            const [specRes, habRes] = await Promise.all([
                fetch('http://localhost:3000/api/species'),
                fetch('http://localhost:3000/api/habitats')
            ]);

            const specData = await specRes.json();
            const habData = await habRes.json();

            if (specData.status === 'success') setSpeciesList(specData.data);
            if (habData.status === 'success') setHabitatList(habData.data);
        } catch (e) {
            console.error("Failed to load resources");
        }
    };

    const handleAddClick = () => {
        setFormData({
            name: '',
            species_id: '',
            habitat_id: '',
            gender: 'Male',
            date_of_birth: '',
            microchip_id: ''
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEditClick = (animal) => {
        // Format date to YYYY-MM-DD for input
        const dob = animal.date_of_birth ? animal.date_of_birth.split('T')[0] : '';

        setFormData({
            name: animal.name,
            species_id: animal.species_id,
            habitat_id: animal.habitat_id || '',
            gender: animal.gender,
            date_of_birth: dob,
            microchip_id: animal.microchip_id || ''
        });
        setCurrentId(animal.id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (!window.confirm('Are you sure you want to delete this animal?')) return;

        try {
            const res = await fetch(`http://localhost:3000/api/animals/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.status === 'success') {
                fetchAnimals();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isEditing
            ? `http://localhost:3000/api/animals/${currentId}`
            : 'http://localhost:3000/api/animals';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.status === 'success') {
                setIsModalOpen(false);
                fetchAnimals();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Operation failed');
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Animal Management
                    </h1>
                    <p className="text-text-muted mt-2">View and manage the research subjects.</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Animal</span>
                </button>
            </div>

            <div className="flex space-x-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search animals..."
                        className="w-full bg-surface border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            <div className="bg-surface rounded-xl border border-gray-800 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-text-muted">Loading animals...</div>
                ) : animals.length === 0 ? (
                    <div className="p-12 text-center text-text-muted">No animals found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-800 bg-gray-900/50">
                                    <th className="p-4 text-sm font-medium text-text-muted">Name</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Species</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Habitat</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Gender</th>
                                    <th className="p-4 text-sm font-medium text-text-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animals.map((animal) => (
                                    <tr key={animal.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                                        <td className="p-4 font-medium text-white">{animal.name}</td>
                                        <td className="p-4 text-text-muted">{animal.species_name}</td>
                                        <td className="p-4 text-text-muted">{animal.habitat_name || 'Unassigned'}</td>
                                        <td className="p-4 text-text-muted">{animal.gender}</td>
                                        <td className="p-4 text-right flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleEditClick(animal)}
                                                className="p-2 hover:bg-gray-700 rounded-lg text-blue-400"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(animal.id)}
                                                className="p-2 hover:bg-gray-700 rounded-lg text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-surface border border-gray-700 rounded-xl p-6 w-full max-w-2xl shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {isEditing ? 'Edit Animal' : 'Add New Animal'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Microchip ID</label>
                                    <input
                                        type="text"
                                        className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        placeholder="Optional"
                                        value={formData.microchip_id}
                                        onChange={e => setFormData({ ...formData, microchip_id: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Species *</label>
                                    <select
                                        required
                                        className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        value={formData.species_id}
                                        onChange={e => setFormData({ ...formData, species_id: e.target.value })}
                                    >
                                        <option value="">Select Species</option>
                                        {speciesList.map(s => (
                                            <option key={s.id} value={s.id}>{s.common_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        value={formData.date_of_birth}
                                        onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Gender</label>
                                    <select
                                        className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        value={formData.gender}
                                        onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Habitat</label>
                                    <select
                                        className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        value={formData.habitat_id}
                                        onChange={e => setFormData({ ...formData, habitat_id: e.target.value })}
                                    >
                                        <option value="">Assign Habitat (Optional)</option>
                                        {habitatList.map(h => (
                                            <option key={h.id} value={h.id}>{h.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg hover:bg-gray-800 text-text-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    {isEditing ? 'Save Changes' : 'Create Animal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Animals;
