'use client';

import { useState, useEffect } from 'react';
import { Exercise, Settings, Gamification, PointsHistoryEntry, PointsType } from '@/types';

const EXERCISES_KEY = 'weekly_exercises';
const SETTINGS_KEY = 'weekly_settings';
const GAMIFICATION_KEY = 'weekly_gamification';

const INITIAL_GAMIFICATION: Gamification = {
    points: 0,
    level: 0,
    history: []
};

export function useWorkoutStore() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [settings, setSettings] = useState<Settings>({ headerText: 'Minha Semana' });
    const [gamification, setGamification] = useState<Gamification>(INITIAL_GAMIFICATION);
    const [lastPointsGained, setLastPointsGained] = useState<{ amount: number, message: string } | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedExercises = localStorage.getItem(EXERCISES_KEY);
        const storedSettings = localStorage.getItem(SETTINGS_KEY);
        const storedGamification = localStorage.getItem(GAMIFICATION_KEY);

        if (storedExercises) {
            try {
                setExercises(JSON.parse(storedExercises));
            } catch (e) {
                console.error('Error parsing exercises', e);
            }
        }

        if (storedSettings) {
            try {
                setSettings(JSON.parse(storedSettings));
            } catch (e) {
                console.error('Error parsing settings', e);
            }
        }

        if (storedGamification) {
            try {
                setGamification(JSON.parse(storedGamification));
            } catch (e) {
                console.error('Error parsing gamification', e);
                setGamification(INITIAL_GAMIFICATION);
            }
        }

        setIsLoaded(true);
    }, []);

    const saveExercises = (newExercises: Exercise[]) => {
        setExercises(newExercises);
        localStorage.setItem(EXERCISES_KEY, JSON.stringify(newExercises));
    };

    const saveGamification = (newGamification: Gamification) => {
        setGamification(newGamification);
        localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(newGamification));
    };

    const addPoints = (amount: number, type: PointsType, description: string, exerciseId?: string) => {
        const newEntry: PointsHistoryEntry = {
            id: crypto.randomUUID(),
            type,
            points: amount,
            description,
            createdAt: Date.now(),
            exerciseId
        };

        const newPoints = gamification.points + amount;
        const newLevel = Math.floor(newPoints / 100);

        setLastPointsGained({ amount, message: description });
        saveGamification({
            ...gamification,
            points: newPoints,
            level: newLevel,
            history: [newEntry, ...gamification.history]
        });

        // Clear notification after 3 seconds
        setTimeout(() => setLastPointsGained(null), 3000);
    };

    const addExercise = (name: string) => {
        if (!name.trim()) return;

        // Check for duplicates (case insensitive)
        if (exercises.some(ex => ex.name.toLowerCase() === name.trim().toLowerCase())) {
            return;
        }

        const newExercise: Exercise = {
            id: crypto.randomUUID(),
            name: name.trim(),
            done: false,
            createdAt: Date.now(),
        };

        const updated = [newExercise, ...exercises];
        saveExercises(updated);
    };

    const toggleExercise = (id: string) => {
        const exercise = exercises.find(ex => ex.id === id);
        if (!exercise) return;

        const isMarkingDone = !exercise.done;

        const updated = exercises.map(ex => {
            if (ex.id === id) {
                return { ...ex, done: isMarkingDone };
            }
            return ex;
        });

        if (isMarkingDone) {
            // Check 24h constraint
            const lastTimeDone = gamification.history
                .filter(h => h.exerciseId === id && h.type === 'exercise_done')
                .sort((a, b) => b.createdAt - a.createdAt)[0]?.createdAt;

            const now = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000;

            if (!lastTimeDone || (now - lastTimeDone > twentyFourHours)) {
                addPoints(10, 'exercise_done', `Completou ${exercise.name}`, id);
            }
        }

        const pending = updated.filter(ex => !ex.done);
        const completed = updated.filter(ex => ex.done);
        saveExercises([...pending, ...completed]);
    };

    const clearWeek = () => {
        const allDone = exercises.length > 0 && exercises.every(ex => ex.done);
        
        if (allDone) {
            const now = Date.now();
            const sixDays = 6 * 24 * 60 * 60 * 1000;
            const lastWeeklyBonus = gamification.lastWeeklyBonus || 0;

            if (now - lastWeeklyBonus > sixDays) {
                const bonusPoints = exercises.length * 10;
                const newEntry: PointsHistoryEntry = {
                    id: crypto.randomUUID(),
                    type: 'weekly_complete',
                    points: bonusPoints,
                    description: 'Semana completa!',
                    createdAt: now
                };

                const newPoints = gamification.points + bonusPoints;
                const newLevel = Math.floor(newPoints / 100);

                saveGamification({
                    ...gamification,
                    points: newPoints,
                    level: newLevel,
                    history: [newEntry, ...gamification.history],
                    lastWeeklyBonus: now
                });
            }
        }

        const updated = exercises.map(ex => ({ ...ex, done: false }));
        saveExercises(updated);
    };

    const generateCoachWorkout = () => {
        const storedCoachExercises = localStorage.getItem('coach_exercises');
        const coachExercises: string[] = storedCoachExercises
            ? JSON.parse(storedCoachExercises)
            : [
                "Supino reto (Peito)",
                "Supino inclinado (Peito)",
                "Tríceps pulley (Tríceps)",
                "Puxada frontal (Costas)",
                "Remada curvada (Costas)",
                "Rosca direta (Bíceps)",
                "Agachamento livre (Pernas)",
                "Leg press (Pernas)",
                "Elevação de panturrilha (Pernas)",
                "Desenvolvimento com halteres (Ombros)",
                "Elevação lateral (Ombros)",
                "Abdominal tradicional (Abdômen)",
                "Stiff (Pernas/Glúteos)",
                "Mesa flexora (Pernas)",
                "Prancha isométrica (Abdômen)"
            ];

        const newExercises: Exercise[] = coachExercises.map((name, index) => ({
            id: crypto.randomUUID(),
            name,
            done: false,
            createdAt: Date.now() + index,
        }));

        saveExercises(newExercises);
    };

    const updateSettings = (newSettings: Settings) => {
        setSettings(newSettings);
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    };

    return {
        exercises,
        settings,
        gamification,
        lastPointsGained,
        isLoaded,
        addExercise,
        toggleExercise,
        clearWeek,
        generateCoachWorkout,
        updateSettings,
        clearNotification: () => setLastPointsGained(null)
    };
}
