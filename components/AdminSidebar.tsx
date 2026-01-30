'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Car, Wallet, Wrench, FileText, Settings, LogOut, Users } from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', href: '/admin/dashboard' },
    { icon: Car, label: 'Véhicules', href: '/admin/vehicles' },
    { icon: Wallet, label: 'Revenus & Charges', href: '/admin/financials' },
    { icon: Wrench, label: 'Entretiens', href: '/admin/maintenance' },
    { icon: FileText, label: 'Rapports', href: '/admin/reports' },
    { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-secondary border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-20">
            <div className="p-6 flex items-center justify-center border-b border-white/10">
                <h2 className="text-xl font-bold tracking-wider text-primary">ANISTOUR</h2>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${isActive
                                ? 'bg-primary/20 text-primary border border-primary/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => {
                        document.cookie = 'token=; Max-Age=0; path=/;';
                        window.location.href = '/';
                    }}
                    className="flex items-center space-x-3 p-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
