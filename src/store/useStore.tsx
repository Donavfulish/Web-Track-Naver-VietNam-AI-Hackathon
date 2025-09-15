// src/store/userStore.ts
import { create } from 'zustand';
import type { UserProfile } from '@/types';

interface UserState {
    user: UserProfile | null;
    loadingUser: boolean;
    errorUser: string | null;
    loginTime: number | null;
    setUser: (userData: UserProfile | null) => void;
    setLoadingUser: (loading: boolean) => void;
    setErrorUser: (error: string | null) => void;
    setLoginTime: (time: number | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loadingUser: true, // Mặc định là true khi khởi động để check session
    errorUser: null,
    loginTime: null,
    setUser: (userData) => set({ user: userData, loadingUser: false, errorUser: null }),
    setLoadingUser: (loading) => set({ loadingUser: loading }),
    setErrorUser: (error) => set({ errorUser: error, loadingUser: false }),
    setLoginTime: (time) => set({ loginTime: time }),
}));