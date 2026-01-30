'use client';

import { PlusCircle, Search, Filter, Car, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function VehiclesPage() {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Parc Automobile</h1>
                    <p className="text-gray-400">Gérez votre flotte de véhicules</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <PlusCircle size={20} />
                    <span>Ajouter un véhicule</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="glass-card p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher (Marque, Matricule...)"
                        className="pl-10 py-2 w-full"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="btn-secondary flex items-center gap-2">
                        <Filter size={18} />
                        <span>Filtres</span>
                    </button>
                </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder Vehicle Card */}
                <div className="glass-card overflow-hidden group">
                    <div className="h-48 bg-gray-800 relative">
                        {/* Image placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <Car size={48} />
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-black text-xs font-bold rounded">
                            EN SERVICE
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg">Renault Symbol</h3>
                                <p className="text-sm text-gray-400">123-456-16</p>
                            </div>
                            <button className="text-gray-400 hover:text-white">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="space-y-2 mt-4 text-sm text-gray-300">
                            <div className="flex justify-between">
                                <span>Kilométrage:</span>
                                <span className="font-mono">124,500 km</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Prochain Entretien:</span>
                                <span className="text-orange-400 font-mono">dans 500 km</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors">
                                Voir Détails
                            </button>
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors text-red-400 hover:text-red-300">
                                Historique
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="glass-card w-full max-w-2xl p-6 m-auto animate-fade-in my-8">
                        <h2 className="text-xl font-bold mb-6">Nouveau Véhicule</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Nom / Modèle</label>
                                    <input type="text" placeholder="Ex: Renault Symbol" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Immatriculation</label>
                                    <input type="text" placeholder="Ex: 00123 116 16" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Kilométrage Actuel</label>
                                    <input type="number" placeholder="Ex: 50000" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Date Mise en Circulation</label>
                                    <input type="date" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Prix d'Achat (DA)</label>
                                    <input type="number" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Photo</label>
                                    <div className="h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                                        <span className="text-sm text-gray-500">Cliquez pour ajouter</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <h3 className="font-bold mb-4">Configuration Entretien</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Fréquence Vidange (Km)</label>
                                    <select>
                                        <option>7 000 km</option>
                                        <option>8 000 km</option>
                                        <option>9 000 km</option>
                                        <option>10 000 km</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-8">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="btn-secondary"
                            >
                                Annuler
                            </button>
                            <button className="btn-primary">
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
