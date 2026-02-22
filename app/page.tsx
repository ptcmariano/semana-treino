'use client';

import { useState } from 'react';
import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { Plus, Check, Square } from 'lucide-react';

export default function ListPage() {
  const { exercises, settings, isLoaded, addExercise, toggleExercise } = useWorkoutStore();
  const [newExercise, setNewExercise] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExercise.trim()) {
      addExercise(newExercise);
      setNewExercise('');
    }
  };

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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          {settings.headerText}
        </h1>
        <p className="text-slate-400 font-medium">
          {exercises.length === 0
            ? "Comece adicionando um exercício"
            : `${exercises.filter(e => e.done).length} de ${exercises.length} concluídos`}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
          placeholder="Ex: Treino de Pernas"
          className="flex-1 bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
          aria-label="Nome do exercício"
        />
        <button
          type="submit"
          disabled={!newExercise.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          aria-label="Adicionar exercício"
        >
          <Plus size={24} />
        </button>
      </form>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => toggleExercise(exercise.id)}
            className={`glass group flex items-center justify-between p-5 rounded-3xl transition-all cursor-pointer ${exercise.done ? 'opacity-60 scale-[0.98]' : 'hover:border-white/20 active:scale-95'
              }`}
          >
            <span className={`text-lg font-semibold transition-all ${exercise.done ? 'line-through text-slate-500' : 'text-slate-200'
              }`}>
              {exercise.name}
            </span>

            <button
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${exercise.done
                  ? 'bg-blue-500 text-white shadow-inner shadow-blue-700/50'
                  : 'bg-slate-700 text-slate-400'
                }`}
              aria-label={exercise.done ? "Desmarcar" : "Marcar como feito"}
            >
              {exercise.done ? <Check size={20} /> : <Square size={20} />}
            </button>
          </div>
        ))}

        {isLoaded && exercises.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-800/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
              <Plus size={32} className="text-slate-500" />
            </div>
            <p className="text-slate-500 font-medium">Sua lista está vazia</p>
          </div>
        )}
      </div>
    </div>
  );
}
