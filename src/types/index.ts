// src/types/index.ts

export type ProjectStatus = 'Active' | 'Completed' | 'Miss'; 
export type TaskStatus = 'Todo' | 'Pending' | 'Done' | 'Miss';

export interface UserProfile {
    id: string; // auth.users.id
    email: string;
    name?: string;
    avatar_url?: string;
}

export interface Project {
    id: string;
    user_id: string; // references profiles.id
    name: string;
    description: string;
    final_deadline: string; // ISO date string 'YYYY-MM-DD'
    created_at: string; // ISO timestamp
    created_local:string;
    status?: ProjectStatus;
    img_src: string;
    num_pending: number;
    num_done: number;
    num_to_do: number;
    num_miss: number;
    progress: number;
}

export interface Task {
    id: string;
    project_id: string; // references projects.id
    user_id: string;
    title: string;
    description: string;
    deadline: string; // ISO date string 'YYYY-MM-DD'
    status: TaskStatus;
    created_at: string; // ISO timestamp
    priority: string;
    completed_date:string | null;
}