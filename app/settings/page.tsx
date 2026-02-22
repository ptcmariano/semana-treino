'use client';

import { useState, useEffect } from 'react';
import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { Save, Settings as SettingsIcon, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const { settings, updateSettings, isLoaded } = useWorkoutStore();
    const [headerText, setHeaderText] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (isLoaded) {
            setHeaderText(settings.headerText);
        }
    }, [isLoaded, settings.headerText]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (headerText.trim()) {
            updateSettings({ ...settings, headerText: headerText.trim() });
            router.push('/');
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-3 bg-slate-800/50 rounded-2xl border border-white/5 text-slate-400"
                    aria-label="Voltar"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <SettingsIcon size={28} className="text-blue-400" />
                    Ajustes
                </h1>
            </header>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="space-y-4">
                    <label htmlFor="headerText" className="block text-sm font-semibold text-slate-400 uppercase tracking-widest ml-1">
                        Título da Cabeçalho
                    </label>
                    <input
                        id="headerText"
                        type="text"
                        value={headerText}
                        onChange={(e) => setHeaderText(e.target.value)}
                        placeholder="Ex: Treino Semanal"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xl"
                        aria-label="Título do cabeçalho"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!headerText.trim() || headerText === settings.headerText}
                    className="btn-primary btn-large shadow-blue-500/20"
                    aria-label="Salvar configurações"
                >
                    <Save size={24} />
                    <span>Salvar Alterações</span>
                </button>
            </form>

            <div className="pt-10 border-t border-white/5">
                <div className="glass p-6 rounded-3xl space-y-2">
                    <h3 className="font-bold text-slate-300">Sobre o App</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Seu progresso é salvo automaticamente no seu navegador. Nenhuma informação é enviada para servidores, garantindo sua privacidade.
                    </p>
                </div>
            </div>
        </div>
    );
}
