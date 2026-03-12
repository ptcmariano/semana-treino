'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, CheckSquare, Trophy, Settings as SettingsIcon } from 'lucide-react';

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Lista', icon: List },
        { href: '/progress/', label: 'Progresso', icon: Trophy },
        { href: '/clear-week/', label: 'Limpar', icon: CheckSquare },
        { href: '/settings/', label: 'Ajustes', icon: SettingsIcon },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass pb-safe border-t border-white/10 z-50">
            <div className="flex h-16 md:h-20 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex-1 flex flex-col items-center justify-center transition-all ${isActive ? 'text-blue-400' : 'text-slate-400'
                                } active:scale-90`}
                            aria-label={item.label}
                        >
                            <Icon size={24} className={isActive ? 'animate-pulse' : ''} />
                            <span className="text-xs font-medium mt-1 uppercase tracking-wider">{item.label}</span>
                            {isActive && (
                                <div className="absolute bottom-0 w-8 h-1 bg-blue-400 rounded-t-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
