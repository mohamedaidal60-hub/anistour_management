import { prisma } from '@/lib/prisma';
import { BadgeDollarSign, Car, Wrench, AlertTriangle } from 'lucide-react';

async function getStats() {
    const vehicleCount = await prisma.vehicle.count({ where: { isSold: false } });

    // Calculate revenue for current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const transactions = await prisma.transaction.findMany({
        where: {
            date: { gte: firstDay },
        },
    });

    const revenue = transactions
        .filter(t => t.type === 'INCOME')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const pendingNotifications = await prisma.notification.count({
        where: { isActive: true },
    });

    return { vehicleCount, revenue, expenses, pendingNotifications };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Vehicles Card */}
                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Car size={64} />
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase">Véhicules Actifs</h3>
                    <p className="text-3xl font-bold">{stats.vehicleCount}</p>
                </div>

                {/* Revenue Card */}
                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <BadgeDollarSign size={64} />
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase">Revenus (Mois)</h3>
                    <p className="text-3xl font-bold text-green-400">
                        {stats.revenue.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                    </p>
                </div>

                {/* Expenses Card */}
                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Wrench size={64} />
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase">Charges (Mois)</h3>
                    <p className="text-3xl font-bold text-red-400">
                        {stats.expenses.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                    </p>
                </div>

                {/* Alerts Card */}
                <div className="glass-card p-6 flex flex-col justify-between h-32 relative overflow-hidden group border-orange-500/30">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-orange-500">
                        <AlertTriangle size={64} />
                    </div>
                    <h3 className="text-orange-200 text-sm font-medium uppercase">Alertes Entretien</h3>
                    <p className="text-3xl font-bold text-orange-500">{stats.pendingNotifications}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4">Activités Récentes</h3>
                    <p className="text-gray-400">Aucune activité récente pour le moment.</p>
                </div>

                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4">Aperçu Financier</h3>
                    <div className="flex items-center justify-center h-48 text-gray-500">
                        Graphique des performances
                    </div>
                </div>
            </div>
        </div>
    );
}
