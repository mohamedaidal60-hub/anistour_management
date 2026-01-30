'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';

export default function DailyRevenuePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [vehicles, setVehicles] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        amount: '',
        clientName: '',
        vehicleId: '',
        description: '',
        date: new Date().toISOString().split('T')[0] // Default to today
    });

    useEffect(() => {
        // Fetch vehicles for dropdown
        fetch('/api/vehicles')
            .then(res => res.json())
            .then(data => setVehicles(data));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/transactions/revenue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Revenu enregistré avec succès !');
                router.push('/agent/dashboard');
            } else {
                alert('Erreur lors de l\'enregistrement.');
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
                <h1 className="text-2xl font-bold">Saisie Revenu Journalier</h1>
            </div>

            <div className="glass-card max-w-2xl mx-auto p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2 text-gray-400">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                className="opacity-50 cursor-not-allowed"
                                disabled // Agent usage strict: Today only
                            />
                            <p className="text-xs text-yellow-500 mt-1">Saisie autorisée uniquement pour aujourd'hui.</p>
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-gray-400">Véhicule concerné</label>
                            <select
                                value={formData.vehicleId}
                                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                                required
                            >
                                <option value="">Sélectionnez un véhicule</option>
                                {vehicles.map(v => (
                                    <option key={v.id} value={v.id}>{v.name} ({v.licensePlate})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Montant (DA)</label>
                        <input
                            type="number"
                            placeholder="Ex: 5000"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                            className="text-2xl font-bold text-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Nom du Client</label>
                        <input
                            type="text"
                            placeholder="Nom Prénom"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Information / Note</label>
                        <textarea
                            rows={3}
                            placeholder="Détails supplémentaires..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-400">Photo Bon / Facture</label>
                        <input type="file" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center space-x-2 text-lg"
                    >
                        {loading ? <span>Enregistrement...</span> : (
                            <>
                                <Save size={20} />
                                <span>Valider le Revenu</span>
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
