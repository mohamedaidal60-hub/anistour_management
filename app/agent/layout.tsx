export default function AgentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <header className="h-16 border-b border-white/10 bg-secondary/50 backdrop-blur flex items-center justify-between px-6">
                <div className="flex items-center space-x-3">
                    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
                    <h1 className="text-xl font-bold text-primary">ANISTOUR <span className="text-white text-sm font-normal">| Espace Agent</span></h1>
                </div>
                <button className="text-sm text-gray-400 hover:text-white">Déconnexion</button>
            </header>
            <main className="p-6 max-w-5xl mx-auto animate-fade-in">
                {children}
            </main>
        </div>
    );
}
