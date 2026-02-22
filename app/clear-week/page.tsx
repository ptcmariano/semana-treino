'use client';

import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ClearWeekPage() {
    const { clearWeek, exercises, isLoaded } = useWorkoutStore();
    const router = useRouter();

    const handleClear = () => {
        clearWeek();
        // Redirect to list after clearing
        router.push('/');
    };

    if (!isLoaded) return null;

    const completedCount = exercises.filter(e => e.done).length;

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center space-y-4">
                <div className="bg-yellow-500/10 p-6 rounded-full inline-block mb-4 border border-yellow-500/20">
                    <AlertTriangle size={48} className="text-yellow-500" />
                </div>
                <h1 className="text-3xl font-bold text-white">Pronto para uma nova semana?</h1>
                <p className="text-slate-400 max-w-xs mx-auto">
                    Isso irá desmarcar todos os {completedCount} exercícios concluídos e preparar sua lista para o próximo ciclo.
                </p>
            </div>

            <button
                onClick={handleClear}
                className="btn-primary btn-large bg-blue-600 hover:bg-blue-500 group"
                aria-label="Limpar semana"
            >
                <RefreshCcw size={24} className="group-active:rotate-180 transition-transform duration-500" />
                <span>Limpar Semana</span>
            </button>

            <button
                onClick={() => router.back()}
                className="text-slate-500 font-medium hover:text-slate-400 transition-colors"
            >
                Voltar
            </button>
        </div>
    );
}
