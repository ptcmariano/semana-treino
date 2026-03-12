'use client';

import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { Trophy, Star, History, ArrowUpCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function ProgressPage() {
    const { gamification, isLoaded } = useWorkoutStore();

    const progress = useMemo(() => {
        const pointsIntoLevel = gamification.points % 100;
        const pointsToNextLevel = 100 - pointsIntoLevel;
        const percent = pointsIntoLevel;
        return {
            pointsIntoLevel,
            pointsToNextLevel,
            percent
        };
    }, [gamification.points]);

    const sortedHistory = useMemo(() => {
        return [...gamification.history].sort((a, b) => b.createdAt - a.createdAt);
    }, [gamification.history]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Meus Conquistas
                </h1>
                <p className="text-slate-400 font-medium">
                    Acompanhe sua evolução e pontos
                </p>
            </header>

            {/* Level Card */}
            <div className="glass p-8 rounded-[2rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700" />
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg shadow-yellow-900/40">
                        <Trophy size={32} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Nível Atual</h2>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">{gamification.level}</span>
                            <span className="text-slate-500 font-bold uppercase text-xs">Apreciador</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-300">Próximo Nível</span>
                        <span className="text-yellow-400">{progress.pointsIntoLevel} / 100 XP</span>
                    </div>
                    <div className="h-4 bg-slate-800/80 rounded-full overflow-hidden p-1 border border-white/5">
                        <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress.percent}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 font-medium text-center">
                        Faltam <span className="text-slate-300">{progress.pointsToNextLevel} pontos</span> para o nível {gamification.level + 1}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass p-6 rounded-3xl">
                    <div className="text-yellow-400 mb-2">
                        <Star size={20} />
                    </div>
                    <div className="text-2xl font-bold text-white">{gamification.points}</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pontos Totais</div>
                </div>
                <div className="glass p-6 rounded-3xl">
                    <div className="text-blue-400 mb-2">
                        <ArrowUpCircle size={20} />
                    </div>
                    <div className="text-2xl font-bold text-white">{gamification.history.filter(h => h.type === 'exercise_done').length}</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Treinos Feitos</div>
                </div>
            </div>

            {/* History */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-300 font-bold px-2">
                    <History size={18} />
                    <h3>Extrato de Pontos</h3>
                </div>

                <div className="space-y-3">
                    {sortedHistory.length === 0 ? (
                        <div className="glass p-8 rounded-3xl text-center">
                            <p className="text-slate-500 text-sm">Nenhum ponto conquistado ainda.</p>
                        </div>
                    ) : (
                        sortedHistory.map((item) => (
                            <div key={item.id} className="glass p-4 rounded-2xl flex items-center justify-between border-l-4 border-yellow-500/50">
                                <div>
                                    <div className="text-slate-200 font-semibold">{item.description}</div>
                                    <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">
                                        {new Intl.DateTimeFormat('pt-BR', { 
                                            day: '2-digit', 
                                            month: '2-digit', 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        }).format(item.createdAt)}
                                    </div>
                                </div>
                                <div className="text-yellow-400 font-black text-lg">
                                    +{item.points}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
