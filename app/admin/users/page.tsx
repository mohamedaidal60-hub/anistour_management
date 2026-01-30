'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Lock, Ban, CheckCircle, Search } from 'lucide-react';

export default function UserManagement() {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Utilisateurs</h1>
                    <p className="text-gray-400">Gérez les accès de vos collaborateurs</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <UserPlus size={20} />
                    <span>Nouvel Utilisateur</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 border-l-4 border-l-red-600">
                    <h3 className="text-gray-400 text-sm font-medium">Total Utilisateurs</h3>
                    <p className="text-3xl font-bold mt-1">3</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-green-600">
                    <h3 className="text-gray-400 text-sm font-medium">Actifs</h3>
                    <p className="text-3xl font-bold mt-1">3</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-orange-600">
                    <h3 className="text-gray-400 text-sm font-medium">Agents</h3>
                    <p className="text-3xl font-bold mt-1">2</p>
                </div>
            </div>

            {/* User List */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Liste des comptes</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="pl-10 py-2 w-64 text-sm"
                        />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">Utilisateur</th>
                            <th className="p-4">Rôle</th>
                            <th className="p-4">Date Création</th>
                            <th className="p-4">Statut</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {/* Example Row - Admin */}
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">
                                        A
                                    </div>
                                    <div>
                                        <div className="font-medium">admin</div>
                                        <div className="text-sm text-gray-500">Administrateur Principal</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30">
                                    ADMIN
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-400">29/01/2026</td>
                            <td className="p-4">
                                <span className="flex items-center space-x-1 text-green-400 text-sm">
                                    <CheckCircle size={14} />
                                    <span>Actif</span>
                                </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                                <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Modifier mot de passe">
                                    <Lock size={18} />
                                </button>
                            </td>
                        </tr>

                        {/* Example Row - Agent */}
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-gray-300">
                                        S
                                    </div>
                                    <div>
                                        <div className="font-medium">sarah.agent</div>
                                        <div className="text-sm text-gray-500">Sarah M.</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                                    AGENT
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-400">29/01/2026</td>
                            <td className="p-4">
                                <span className="flex items-center space-x-1 text-green-400 text-sm">
                                    <CheckCircle size={14} />
                                    <span>Actif</span>
                                </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                                <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Modifier mot de passe">
                                    <Lock size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded text-red-400 hover:text-red-300" title="Bloquer">
                                    <Ban size={18} />
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            {/* Modal would go here */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="glass-card w-full max-w-lg p-6 animate-fade-in">
                        <h2 className="text-xl font-bold mb-6">Créer un nouvel utilisateur</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm mb-2 text-gray-400">Nom Complet</label>
                                <input type="text" placeholder="Ex: Sarah Connor" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-gray-400">Nom d'utilisateur</label>
                                <input type="text" placeholder="Ex: sarah.c" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-gray-400">Mot de passe</label>
                                <input type="password" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-gray-400">Rôle</label>
                                <select>
                                    <option value="AGENT">Agent / Assistante</option>
                                    <option value="ADMIN">Administrateur</option>
                                </select>
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
                                Créer le compte
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
