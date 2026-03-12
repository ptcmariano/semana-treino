export type PointsType = 'exercise_done' | 'weekly_complete';

export interface PointsHistoryEntry {
  id: string;
  type: PointsType;
  points: number;
  description: string;
  createdAt: number;
  exerciseId?: string;
}

export interface Gamification {
  points: number;
  level: number;
  history: PointsHistoryEntry[];
  lastWeeklyBonus?: number; // timestamp
}
