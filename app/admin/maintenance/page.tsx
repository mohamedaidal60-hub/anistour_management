'use client';

import { useState, useEffect } from 'react';
import { Search, Wrench, Calendar, AlertTriangle } from 'lucide-react';

export default function MaintenancePage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetching maintenance logs (Schema has Maintenance model, need API)
        // For now, let's assume we fetch them. 
        // Ideally create /api/maintenance endpoint.
        // Simulating empty state or mock data for UI demo.
        setLoading(false);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Carnet d'Entretien</h1>
                    <p className="text-gray-400">Historique des interventions et réparations</p>
                </div>
            </div>

            <div className="glass-card p-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher par véhicule, type d'entretien..."
                        className="pl-10 py-2 w-full"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {/* Mock Data Entry */}
                <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-primary/30 transition-colors">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Wrench size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Vidange + Filtres</h3>
                            <p className="text-gray-400 text-sm">Renault Symbol (123-456-16)</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center"><Calendar size={14} className="mr-1" /> 29 Jan 2026</span>
                                <span className="font-mono bg-white/5 px-2 py-0.5 rounded">124,500 km</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-xl font-bold text-white">4,500 DA</p>
                        <p className="text-xs text-gray-500">Effectué par: sarah.agent</p>
                    </div>
                </div>

                {/* Empty State */}
                {logs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <div className="flex justify-center mb-4">
                            <Wrench size={48} className="opacity-20" />
                        </div>
                        <p>Aucun historique d'entretien disponible.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
