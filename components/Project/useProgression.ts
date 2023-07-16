import create from 'zustand';

interface ProgressionState {
	progression: number;
	setProgression: (newProgression: number) => void;
}

export const useProgression = create<ProgressionState>()((set) => ({
	progression: 0,
	setProgression: (newProgression) =>
		set(() => ({ progression: newProgression })),
}));
