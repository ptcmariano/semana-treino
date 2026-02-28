'use client';

import { useState, useEffect } from 'react';
import { Exercise, Settings } from '@/types';

const EXERCISES_KEY = 'weekly_exercises';
const SETTINGS_KEY = 'weekly_settings';

export function useWorkoutStore() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [settings, setSettings] = useState<Settings>({ headerText: 'Minha Semana' });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedExercises = localStorage.getItem(EXERCISES_KEY);
        const storedSettings = localStorage.getItem(SETTINGS_KEY);

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

        setIsLoaded(true);
    }, []);

    const saveExercises = (newExercises: Exercise[]) => {
        setExercises(newExercises);
        localStorage.setItem(EXERCISES_KEY, JSON.stringify(newExercises));
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
        const updated = exercises.map(ex => {
            if (ex.id === id) {
                return { ...ex, done: !ex.done };
            }
            return ex;
        });

        const pending = updated.filter(ex => !ex.done);
        const completed = updated.filter(ex => ex.done);
        saveExercises([...pending, ...completed]);
    };

    const clearWeek = () => {
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
        isLoaded,
        addExercise,
        toggleExercise,
        clearWeek,
        generateCoachWorkout,
        updateSettings,
    };
}
