// src/store/projectStore.ts
import { create } from 'zustand';
import type { Project } from '@/types';
import { supabase } from '@/lib/supabase';

interface ProjectState {
    projects: Project[];
    loadingProjects: boolean;
    errorProjects: string | null;
    fetchProjects: () => Promise<void>;
    fetchOneProjects: (userId: string) => Promise<void>;
    addProject: (newProjectData: Omit<Project, 'id' | 'created_at' | 'created_local' | 'progress' | 'num_pending' | 'num_done' | 'num_to_do' | 'progress'>) => Promise<Project>;
    updateProject: (projectId: string, updatedData: Partial<Project>) => Promise<Project>;
    deleteProject: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    loadingProjects: false,
    errorProjects: null,

    fetchProjects: async () => {
        set ({loadingProjects: true, errorProjects: null});
        try {
            const {data, error} = await supabase
                .from('projects')
                .select('*');
            if (error) throw error;
            set({ projects: data as Project[], loadingProjects: false});
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            set({ errorProjects: error.message, loadingProjects: false });
            throw error;
        }
    },

    fetchOneProjects: async (userId) => {
        set({ loadingProjects: true, errorProjects: null });
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', userId) // Lọc theo user_id
                .order('created_at', { ascending: false });

            if (error) throw error;
            set({ projects: data as Project[], loadingProjects: false });
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            set({ errorProjects: error.message, loadingProjects: false });
            throw error;
        }
    },

    addProject: async (newProjectData) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .insert(newProjectData)
                .select();

            if (error) throw error;
            const addedProject = data[0] as Project;
            set((state) => ({ projects: [addedProject, ...state.projects] }));
            return addedProject;
        } catch (error: any) {
            console.error("Error adding project:", error);
            set({ errorProjects: error.message });
            throw error;
        }
    },

    updateProject: async (projectId, updatedData) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .update(updatedData)
                .eq('id', projectId)
                .select();

            if (error) throw error;
            const updatedProject = data[0] as Project;
            set((state) => ({
                projects: state.projects.map((project) =>
                    project.id === projectId ? updatedProject : project
                ),
            }));
            return updatedProject;
        } catch (error: any) {
            console.error("Error updating project:", error);
            set({ errorProjects: error.message });
            throw error;
        }
    },

    deleteProject: async (projectId) => {
        try {
            // Lưu ý: Nếu bạn cấu hình Supabase RLS và Foreign Key ON DELETE CASCADE,
            // việc xóa project sẽ tự động xóa các task liên quan.
            // Nếu không, bạn có thể cần thêm logic xóa task ở đây (ít được khuyến khích)
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', projectId);

            if (error) throw error;
            set((state) => ({
                projects: state.projects.filter((project) => project.id !== projectId),
            }));
        } catch (error: any) {
            console.error("Error deleting project:", error);
            set({ errorProjects: error.message });
            throw error;
        }
    },
}));