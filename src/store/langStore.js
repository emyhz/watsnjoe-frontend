import { create } from 'zustand';

const useLangStore = create((set) => ({
    lang: 'nl',
    setLang: (lang) => set({ lang }),
}));

export default useLangStore;