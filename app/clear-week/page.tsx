'use client';

import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { RefreshCcw, AlertTriangle, Wand2, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const COACH_EXERCISES_KEY = 'coach_exercises';

const DEFAULT_COACH_EXERCISES = [
    "Supino reto (Peito)", "Supino inclinado (Peito)", "Tríceps pulley (Tríceps)",
    "Puxada frontal (Costas)", "Remada curvada (Costas)", "Rosca direta (Bíceps)",
    "Agachamento livre (Pernas)", "Leg press (Pernas)", "Elevação de panturrilha (Pernas)",
    "Desenvolvimento com halteres (Ombros)", "Elevação lateral (Ombros)",
    "Abdominal tradicional (Abdômen)", "Stiff (Pernas/Glúteos)", "Mesa flexora (Pernas)",
    "Prancha isométrica (Abdômen)"
];

export default function ClearWeekPage() {
    const { clearWeek, generateCoachWorkout, exercises, isLoaded } = useWorkoutStore();
    const router = useRouter();
    const [coachExercises, setCoachExercises] = useState<string[]>([]);
    const [newExercise, setNewExercise] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem(COACH_EXERCISES_KEY);
        if (stored) {
            setCoachExercises(JSON.parse(stored));
        } else {
            setCoachExercises(DEFAULT_COACH_EXERCISES);
            localStorage.setItem(COACH_EXERCISES_KEY, JSON.stringify(DEFAULT_COACH_EXERCISES));
        }
    }, []);

    const saveCoachExercises = (updated: string[]) => {
        setCoachExercises(updated);
        localStorage.setItem(COACH_EXERCISES_KEY, JSON.stringify(updated));
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newExercise.trim()) return;
        saveCoachExercises([...coachExercises, newExercise.trim()]);
        setNewExercise('');
    };

    const handleRemove = (index: number) => {
        const updated = coachExercises.filter((_, i) => i !== index);
        saveCoachExercises(updated);
    };

    const handleClear = () => {
        clearWeek();
        router.push('/');
    };

    const handleGenerate = () => {
        generateCoachWorkout();
        router.push('/');
    };

    if (!isLoaded) return null;

    const completedCount = exercises.filter(e => e.done).length;

    return (
        <div className="max-w-xl mx-auto py-12 px-4 space-y-12 animate-in fade-in zoom-in-95 duration-500 min-h-[70vh]">
            <div className="text-center space-y-4">
                <div className="bg-yellow-500/10 p-6 rounded-full inline-block mb-4 border border-yellow-500/20">
                    <AlertTriangle size={48} className="text-yellow-500" />
                </div>
                <h1 className="text-3xl font-bold text-white">Pronto para uma nova semana?</h1>
                <p className="text-slate-400 max-w-xs mx-auto text-center">
                    Isso irá desmarcar todos os {completedCount} exercícios concluídos e preparar sua lista para o próximo ciclo.
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
                <button
                    onClick={handleClear}
                    className="btn-primary btn-large bg-blue-600 hover:bg-blue-500 group w-full flex items-center justify-center gap-2"
                    aria-label="Limpar semana"
                >
                    <RefreshCcw size={24} className="group-active:rotate-180 transition-transform duration-500" />
                    <span>Limpar Semana</span>
                </button>

                <button
                    onClick={handleGenerate}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all active:scale-95"
                    aria-label="Gerar treino coach"
                >
                    <Wand2 size={24} className="text-blue-400" />
                    <span className="font-semibold uppercase tracking-wider text-sm">Gerar treino coach</span>
                </button>

                <button
                    onClick={() => router.back()}
                    className="text-slate-500 font-medium hover:text-slate-400 transition-colors"
                >
                    Voltar
                </button>
            </div>

            <div className="space-y-6 pt-12 border-t border-white/10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-white">Configurar Treino Coach</h2>
                    <p className="text-sm text-slate-400">Essa lista será usada quando você clicar em "Gerar treino coach".</p>
                </div>

                <form onSubmit={handleAdd} className="flex gap-2">
                    <input
                        type="text"
                        value={newExercise}
                        onChange={(e) => setNewExercise(e.target.value)}
                        placeholder="Nome do novo exercício..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-all active:scale-95"
                        disabled={!newExercise.trim()}
                    >
                        <Plus size={24} />
                    </button>
                </form>

                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                    {coachExercises.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {coachExercises.map((exercise, index) => (
                                <div key={index} className="flex items-center justify-between p-4 group">
                                    <span className="text-slate-200">{exercise}</span>
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="text-red-400/50 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all"
                                        aria-label="Remover exercício"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-500 italic">
                            Nenhum exercício configurado.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
