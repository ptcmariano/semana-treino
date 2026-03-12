'use client';

import { Star } from 'lucide-react';

interface PointsNotificationProps {
    amount: number;
    message: string;
}

export function PointsNotification({ amount, message }: PointsNotificationProps) {
    if (!amount) return null;

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="glass px-6 py-4 rounded-full border-yellow-500/30 flex items-center gap-3 shadow-2xl shadow-yellow-900/20">
                <div className="bg-yellow-400 p-1.5 rounded-full">
                    <Star size={16} className="text-slate-900 fill-slate-900" />
                </div>
                <div className="flex flex-col">
                    <span className="text-yellow-400 font-black text-sm">+{amount} PONTOS!</span>
                    <span className="text-slate-300 text-xs font-medium">{message}</span>
                </div>
            </div>
        </div>
    );
}
