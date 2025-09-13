// src/store/taskStore.ts
import { create } from 'zustand';
import { Task, TaskStatus } from '../types';
import { supabase } from '../lib/supabase';

interface TaskState {
    tasks: Task[]; // Tasks của project hiện tại
    loadingTasks: boolean;
    errorTasks: string | null;
    fetchTasksByProjectId: (projectId: string) => Promise<void>;
    addTask: (newTaskData: Omit<Task, 'id' | 'created_at'>) => Promise<Task>;
    updateTask: (taskId: string, updatedData: Partial<Task>) => Promise<Task>;
    deleteTask: (taskId: string) => Promise<void>;
    // Hàm để cập nhật status của task cục bộ ngay lập tức (cho kéo thả)
    updateTaskStatusLocally: (taskId: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    loadingTasks: false,
    errorTasks: null,

    fetchTasksByProjectId: async (projectId) => {
        set({ loadingTasks: true, errorTasks: null });
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            set({ tasks: data as Task[], loadingTasks: false });
        } catch (error: any) {
            console.error("Error fetching tasks:", error);
            set({ errorTasks: error.message, loadingTasks: false });
            throw error;
        }
    },

    addTask: async (newTaskData) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert(newTaskData)
                .select();

            if (error) throw error;
            const addedTask = data[0] as Task;
            set((state) => ({ tasks: [addedTask, ...state.tasks] }));
            return addedTask;
        } catch (error: any) {
            console.error("Error adding task:", error);
            set({ errorTasks: error.message });
            throw error;
        }
    },

    updateTask: async (taskId, updatedData) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .update(updatedData)
                .eq('id', taskId)
                .select();

            if (error) throw error;
            const updatedTask = data[0] as Task;
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? updatedTask : task
                ),
            }));
            return updatedTask;
        } catch (error: any) {
            console.error("Error updating task:", error);
            set({ errorTasks: error.message });
            throw error;
        }
    },

    deleteTask: async (taskId) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', taskId);

            if (error) throw error;
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== taskId),
            }));
        } catch (error: any) {
            console.error("Error deleting task:", error);
            set({ errorTasks: error.message });
            throw error;
        }
    },

    updateTaskStatusLocally: (taskId, newStatus) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            ),
        }));
    },
}));