import { PlusCircle, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function AgentDashboard() {
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Bonjour, Agent</h2>
                <p className="text-gray-400 capitalize">{today}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/agent/daily/revenue" className="glass-card p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500 group-hover:scale-110 transition-transform">
                        <Wallet size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Saisir Revenu</h3>
                    <p className="text-sm text-gray-400 text-center">Ajouter un versement client pour aujourd'hui</p>
                </Link>

                <Link href="/agent/daily/expense" className="glass-card p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-500 group-hover:scale-110 transition-transform">
                        <PlusCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Saisir Charge / Entretien</h3>
                    <p className="text-sm text-gray-400 text-center">Enregistrer une dépense ou un entretien</p>
                </Link>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Vos saisies du jour</h3>
                <div className="glass-card p-6 text-center text-gray-400">
                    Aucune saisie pour le moment.
                </div>
            </div>
        </div>
    );
}
