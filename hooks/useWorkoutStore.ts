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

        // Add to the beginning (or where appropriate)
        // New items usually at the top unless they are done
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

        // Re-order: Move done items to the end
        const pending = updated.filter(ex => !ex.done);
        const completed = updated.filter(ex => ex.done);

        // Optional: Sort completed by done status or keeps their relative order
        saveExercises([...pending, ...completed]);
    };

    const clearWeek = () => {
        const updated = exercises.map(ex => ({ ...ex, done: false }));
        saveExercises(updated);
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
        updateSettings,
    };
}
