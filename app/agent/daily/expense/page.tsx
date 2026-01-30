'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';

export default function DailyExpensePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [vehicles, setVehicles] = useState<any[]>([]);

    const [type, setType] = useState('SIMPLE'); // SIMPLE | MAINTENANCE

    const [formData, setFormData] = useState({
        amount: '',
        vehicleId: '',
        description: '',
        expenseType: 'SIMPLE',
        maintenanceType: '', // For maintenance
        kmAtMaintenance: '', // For maintenance
        date: new Date().toISOString().split('T')[0] // Default to today
    });

    useEffect(() => {
        fetch('/api/vehicles')
            .then(res => res.json())
            .then(data => setVehicles(data));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/transactions/expense', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, expenseType: type }),
            });

            if (res.ok) {
                alert('Dépense enregistrée avec succès !');
                router.push('/agent/dashboard');
            } else {
                const err = await res.json();
                alert('Erreur: ' + err.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center space-x-4 mb-6">
                <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Saisie Dépense / Entretien</h1>
            </div>

            <div className="glass-card max-w-2xl mx-auto p-8">

                {/* Type Toggle */}
                <div className="flex p-1 bg-black/40 rounded-lg mb-8">
                    <button
                        onClick={() => setType('SIMPLE')}
                        className={`flex-1 py-2 rounded-md font-medium transition-all ${type === 'SIMPLE' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Charge Simple
                    </button>
                    <button
                        onClick={() => setType('MAINTENANCE')}
                        className={`flex-1 py-2 rounded-md font-medium transition-all ${type === 'MAINTENANCE' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Entretien Véhicule
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">


                    {type === 'MAINTENANCE' && (
                        <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg mb-6 animate-fade-in">
                            <h3 className="font-bold text-primary mb-4">Détails de l'entretien</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Véhicule</label>
                                    <select
                                        value={formData.vehicleId}
                                        onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                                        required
                                    >
                                        <option value="">Sélectionnez un véhicule</option>
                                        {vehicles.map(v => (
                                            <option key={v.id} value={v.id}>{v.name} ({v.currentKm} km)</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2 text-gray-400">Nouveau Kilométrage</label>
                                    <input
                                        type="number"
                                        placeholder="Ex: 50100"
                                        value={formData.kmAtMaintenance}
                                        onChange={(e) => setFormData({ ...formData, kmAtMaintenance: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm mb-2 text-gray-400">Type d'entretien</label>
                                    <select
                                        value={formData.maintenanceType}
                                        onChange={(e) => setFormData({ ...formData, maintenanceType: e.target.value })}
                                        required
                                    >
                                        <option value="">Sélectionnez le type</option>
                                        <option value="VIDANGE">Vidange</option>
                                        <option value="FILTRE_HUILE">Filtre à Huile</option>
                                        <option value="FILTRE_AIR">Filtre à Air</option>
                                        <option value="PLAQUETTES">Plaquettes de Frein</option>
                                        <option value="AUTRE">Autre...</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Désignation / Motif</label>
                        <input
                            type="text"
                            placeholder={type === 'SIMPLE' ? "Ex: Location Local, Facture Électricité..." : "Ex: Changement filtre à huile + Vidange 10k"}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Montant (DA)</label>
                        <input
                            type="number"
                            placeholder="Ex: 5000"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                            className="text-2xl font-bold text-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Photo Justificatif</label>
                        <input type="file" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center space-x-2 text-lg"
                    >
                        {loading ? <span>Enregistrement...</span> : (
                            <>
                                <Save size={20} />
                                <span>Valider la Dépense</span>
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
